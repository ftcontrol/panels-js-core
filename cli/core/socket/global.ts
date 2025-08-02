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

  log: string[] = []

  private maxLogSize: number = 100

  async init(
    plugins: PluginInfo[],
    notifications: NotificationsManager,
    onclose: () => void
  ) {
    this.log = []
    const host = window.location.hostname
    const wsUrl = `ws://${host}:8002`
    const socket = new WebSocket(wsUrl)
    this.socket = socket

    plugins.forEach(async (it) => {
      const { default: Manager } = await importFromSource(
        it.details.manager.textContent || ""
      )

      this.pluginManagers[it.details.id] = new Manager(
        new PluginSocket(it.details.id, this),
        it.details,
        notifications
      )

      this.pluginManagers[it.details.id]?.onInit()
    })

    await new Promise<void>((resolve, reject) => {
      if (socket == null) reject("Socket is null")
      socket.onopen = () => {
        console.log("WebSocket connection opened:", wsUrl)
        resolve()
      }
      socket.onerror = (error) => {
        console.error("WebSocket error:", error)
        onclose()
        reject(error)
      }
    })

    socket.onopen = () => {
      console.log("WebSocket connection opened:", wsUrl)
    }

    socket.onmessage = (event) => {
      this.log = [...this.log, event.data].slice(-this.maxLogSize)

      const data = JSON.parse(event.data)
      console.log(data.pluginID, data.messageID, data.data)

      this.handleMessage(data.pluginID, data.messageID, data.data)
    }

    socket.onerror = (error) => {
      console.error("WebSocket error:", error)
      onclose()
    }

    socket.onclose = () => {
      console.log("WebSocket connection closed")
      onclose()
    }
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
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message))
    } else {
      console.warn("WebSocket not open.")
    }
  }

  public removeMessageHandler(pluginID: string, messageID: string) {
    delete this.messageHandlers[`${pluginID}-${messageID}`]
  }
}
