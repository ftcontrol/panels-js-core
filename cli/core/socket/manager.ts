import type { PluginSocket } from "./plugin"
import { PluginStateManager } from "./state"

export abstract class PluginManager {
  socket: PluginSocket
  state: PluginStateManager

  constructor(pluginSocket: PluginSocket) {
    this.socket = pluginSocket
    this.state = new PluginStateManager(
      pluginSocket.id,
      pluginSocket.socket.state
    )
  }

  abstract onInit(): void
}
