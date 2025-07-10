import { PluginSocket } from "./plugin"
import { PluginManager } from "./manager"
import type { GenericData, Handler } from "./types"
import type { PluginInfo } from "../types"
import { importFromSource } from ".."

export class GlobalSocket {
  socket: WebSocket | null = null
  private readonly messageHandlers: Record<string, Handler> = {}
  pluginManagers: Record<string, PluginManager> = {}

  log: string[] = []

  private maxLogSize: number = 100

  init(plugins: PluginInfo[]) {
    this.log = []
    const host = window.location.hostname
    const wsUrl = `ws://${host}:8002`
    this.socket = new WebSocket(wsUrl)

    plugins.forEach(async (it) => {
      const { default: Manager } = await importFromSource(
        it.details.manager.textContent || ""
      )

      this.pluginManagers[it.details.id] = new Manager(
        new PluginSocket(it.details.id, this)
      )
    })

    this.socket.onopen = () => {
      console.log("WebSocket connection opened:", wsUrl)
    }

    this.socket.onmessage = (event) => {
      this.log = [...this.log, event.data].slice(-this.maxLogSize)
      console.log(event.data)

      const data = JSON.parse(event.data)
      this.handleMessage(data.pluginID, data.messageID, data.data)
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    this.socket.onclose = () => {
      console.log("WebSocket connection closed")
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

  public removeMessageHandler(pluginID: string, messageID: string) {
    delete this.messageHandlers[`${pluginID}-${messageID}`]
  }
}
