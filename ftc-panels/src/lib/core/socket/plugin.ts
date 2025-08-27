import type { GlobalSocket } from "./global.js"
import type { Handler } from "./types.js"

export class PluginSocket {
  id: string
  socket: GlobalSocket

  constructor(id: string, socket: GlobalSocket) {
    this.id = id
    this.socket = socket
  }

  public addMessageHandler(messageID: string, handler: Handler) {
    this.socket.addMessageHandler(this.id, messageID, handler)
  }

  sendMessage(messageID: string, data: any) {
    this.socket.sendMessage({
      pluginID: this.id,
      messageID: messageID,
      data: data,
    })
  }

  public removeMessageHandler(messageID: string, handler: Handler) {
    this.socket.removeMessageHandler(this.id, messageID)
  }
}
