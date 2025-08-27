import type { PluginConfig, PluginSettings } from "../types"
import type { PluginSocket } from "./plugin"
import { PluginStateManager } from "./state"
import { NotificationsManager } from "./notifications"

export abstract class PluginManager {
  socket: PluginSocket
  state: PluginStateManager
  notifications: NotificationsManager
  config: PluginConfig
  settings: PluginSettings

  constructor(
    pluginSocket: PluginSocket,
    config: PluginConfig,
    settings: PluginSettings,
    notifications: NotificationsManager
  ) {
    this.socket = pluginSocket
    this.state = new PluginStateManager(pluginSocket.id)
    this.config = config
    this.settings = settings
    this.notifications = notifications
  }

  abstract onInit(): void

  static getNewVersion(): string | Promise<string> {
    throw new Error("getNewVersion must be implemented as a static method.")
  }
}
