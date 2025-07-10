import type { PluginSocket } from "./plugin"

export abstract class PluginManager {
  socket: PluginSocket

  constructor(pluginSocket: PluginSocket) {
    this.socket = pluginSocket
    this.onInit()
  }

  abstract onInit(): void
}
