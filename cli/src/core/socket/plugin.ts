import type { GlobalSocket } from "./global"
import type { Handler } from "./types"

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

  public removeMessageHandler(messageID: string, handler: Handler) {
    this.socket.removeMessageHandler(this.id, messageID)
  }
}
