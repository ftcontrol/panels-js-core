import { PluginManager } from "./core/socket/manager"
import { GlobalSocket } from "./core/socket/global"
import Button from "./core/ui/Button.svelte"
import TextInput from "./core/ui/TextInput.svelte"
import NumberInput from "./core/ui/NumberInput.svelte"
import ColorInput from "./core/ui/ColorInput.svelte"
import DynamicComponent from "./core/ui/DynamicComponent.svelte"
import SimpleDynamicComponent from "./core/ui/SimpleDynamicComponent.svelte"
import Overlay from "./core/ui/Overlay.svelte"
import Toggle from "./core/ui/Toggle.svelte"
import type {
  PluginConfig,
  PluginInfo,
  PanelsWidget,
  Template,
  TemplateWidget,
  TemplateNavlet,
  TemplateWidgetGroup,
  PluginSettings,
  ChangeLogEntry,
  Change,
} from "./core/types"
import type { PluginValue } from "./core/socket/state"
import { PluginStateManager } from "./core/socket/state"
import { setCookie, getCookie } from "./core/cookies"

import { importFromSource } from "./core/socket/source"

import { PluginSocket } from "./core/socket/plugin"

import type {
  Notification,
  NotificationAction,
  NotificationCallback,
} from "./core/socket/notifications"

import { NotificationsManager } from "./core/socket/notifications"

export type { Notification, NotificationAction, NotificationCallback }

export { NotificationsManager }

export type {
  PluginConfig,
  PluginInfo,
  PluginValue,
  PanelsWidget,
  Template,
  TemplateWidget,
  TemplateNavlet,
  TemplateWidgetGroup,
  PluginSettings,
  ChangeLogEntry,
  Change,
}
export {
  PluginManager,
  Button,
  TextInput,
  NumberInput,
  ColorInput,
  DynamicComponent,
  SimpleDynamicComponent,
  Overlay,
  GlobalSocket,
  Toggle,
  PluginStateManager,
  setCookie,
  getCookie,
  importFromSource,
  PluginSocket,
}

export const pluginsCoreConfig: PluginConfig = {
  id: "com.bylazar.pluginsjscore",
  name: "Plugins JS Core",
  letterName: "PJC",
  description: "Plugins Javascript Core",
  websiteURL: "https://panels.bylazar.com",
  version: "1.1.33",
  pluginsCoreVersion: "1.1.33",
  author: "Lazar",
  manager: "",
  components: [],
  templates: [],
  includedPluginsIDs: [],
  changelog: [],
}

export const defaultSettings: PluginSettings = {
  isEnabled: true,
  isDev: false,
}
