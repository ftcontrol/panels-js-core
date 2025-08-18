import { PluginSocket } from "./plugin"
import { PluginManager } from "./manager"
import type { GenericData, Handler } from "./types"
import type { PluginInfo } from "../types"
import { importFromSource } from "./source"
import type { NotificationsManager } from "./notifications"

export class GlobalSocket {
  socket: WebSocket | null = null
  private readonly messageHandlers: Record<string, Handler> = {}
  pluginManagers: Record<string, PluginManager> = {}
  pluginSelectors: Record<string, any> = {}

  log: string[] = []

  private maxLogSize: number = 100
  private maxQueueSize: number = 256

  private outgoingQueue: string[] = []
  private isDraining = false

  async initPlugins(
    plugins: PluginInfo[],
    svelteURLs: Record<string, string>,
    notifications: NotificationsManager
  ) {
    const created: Record<string, PluginManager> = {}

    await Promise.all(
      plugins.map(async (it) => {
        try {
          const response = await fetch(svelteURLs[it.details.id])
          const data = await response.text()
          const src = data.trim() ?? ""
          if (!src) {
            console.warn(`[plugin:${it.details.id}] Missing manager source`)
            return
          }
          const mod = await importFromSource(src)
          const Selector = (mod as any)?.default

          this.pluginSelectors[it.details.id] = Selector

          const Manager = Selector("Manager")

          const manager: PluginManager = new Manager(
            new PluginSocket(it.details.id, this),
            it.details,
            notifications
          )
          created[it.details.id] = manager
          if (typeof manager.onInit === "function") {
            await manager.onInit()
          }
        } catch (err) {
          console.error(`[plugin:${it.details.id}] Failed to initialize`, err)
        }
      })
    )

    this.pluginManagers = { ...this.pluginManagers, ...created }
  }

  async initSocket(onclose: () => void) {
    this.log = []

    const host = window.location.hostname
    const secure = window.location.protocol === "https:"
    const wsUrl = `${secure ? "wss" : "ws"}://${host}:8002`

    const socket = new WebSocket(wsUrl)
    this.socket = socket

    await new Promise<void>((resolve, reject) => {
      const onOpen = () => {
        console.log("WebSocket connection opened:", wsUrl)
        cleanup()
        resolve()
      }
      const onError = (error: Event) => {
        console.error("WebSocket error:", error)
        cleanup()
        onclose()
        reject(error)
      }
      const cleanup = () => {
        socket.removeEventListener("open", onOpen)
        socket.removeEventListener("error", onError)
      }
      socket.addEventListener("open", onOpen)
      socket.addEventListener("error", onError)
    })

    socket.addEventListener("open", () => {
      this.drainQueue()
    })

    this.drainQueue()

    socket.addEventListener("message", (event) => {
      this.log = [...this.log, event.data].slice(-this.maxLogSize)
      try {
        const data = JSON.parse(event.data)
        console.log(data.pluginID, data.messageID, data.data)
        this.handleMessage(data.pluginID, data.messageID, data.data)
      } catch (e) {
        console.error("Failed to parse message:", e, event.data)
      }
    })

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error)
      onclose()
    })

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed")
      onclose()
    })
  }

  close() {
    this.socket?.close()
  }

  private handleMessage(
    pluginID: string,
    messageID: string,
    data: GenericData
  ) {
    const handler = this.messageHandlers[`${pluginID}-${messageID}`]
    if (handler) {
      handler(data)
    } else {
      console.warn(`No handler for message kind: ${pluginID}-${messageID}`)
    }
  }

  public addMessageHandler(
    pluginID: string,
    messageID: string,
    handler: Handler
  ) {
    this.messageHandlers[`${pluginID}-${messageID}`] = handler
  }

  sendMessage(message: GenericData) {
    const payload = JSON.stringify(message)

    if (this.outgoingQueue.length >= this.maxQueueSize) {
      console.warn("Outgoing queue full. Dropping oldest message.")
      this.outgoingQueue.shift()
    }

    this.outgoingQueue.push(payload)
    this.drainQueue()
  }

  clearQueue() {
    this.outgoingQueue.length = 0
  }

  private drainQueue() {
    if (this.isDraining) return
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return

    this.isDraining = true
    try {
      while (
        this.socket &&
        this.socket.readyState === WebSocket.OPEN &&
        this.outgoingQueue.length > 0
      ) {
        const payload = this.outgoingQueue.shift()!
        try {
          this.socket.send(payload)
        } catch (err) {
          this.outgoingQueue.unshift(payload)
          console.error("Send failed; will retry later.", err)
          break
        }
      }
    } finally {
      this.isDraining = false
    }
  }

  public removeMessageHandler(pluginID: string, messageID: string) {
    delete this.messageHandlers[`${pluginID}-${messageID}`]
  }
}
