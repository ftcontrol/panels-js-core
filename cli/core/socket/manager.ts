import type { PluginConfig } from "../types"
import type { PluginSocket } from "./plugin"
import { PluginStateManager } from "./state"

export abstract class PluginManager {
  socket: PluginSocket
  state: PluginStateManager
  config: PluginConfig

  constructor(pluginSocket: PluginSocket, config: PluginConfig) {
    this.socket = pluginSocket
    this.state = new PluginStateManager(pluginSocket.id)
    this.config = config
  }

  abstract onInit(): void

  abstract hasNewVersion(currentVersion: string): boolean | Promise<boolean>
}
