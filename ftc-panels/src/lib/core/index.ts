export { PluginManager } from "./socket/manager.js"
export { GlobalSocket } from "./socket/global.js"
export { PluginSocket } from "./socket/plugin.js"
export { PluginStateManager } from "./socket/state.js"

export { default as Button } from "./ui/Button.svelte"
export { default as TextInput } from "./ui/TextInput.svelte"
export { default as NumberInput } from "./ui/NumberInput.svelte"
export { default as ColorInput } from "./ui/ColorInput.svelte"
export { default as DynamicComponent } from "./ui/DynamicComponent.svelte"
export { default as SimpleDynamicComponent } from "./ui/SimpleDynamicComponent.svelte"
export { default as Overlay } from "./ui/Overlay.svelte"
export { default as Toggle } from "./ui/Toggle.svelte"

export { setCookie, getCookie } from "./cookies.js"
export { importFromSource } from "./socket/source.js"

export { NotificationsManager } from "./socket/notifications.js"
export type {
  Notification,
  NotificationAction,
  NotificationCallback,
} from "./socket/notifications.js"

export type {
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
} from "./types.js"

export type { PluginValue } from "./socket/state.js"

export { pluginsCoreConfig, defaultSettings } from "$lib/config.js"

export {
  getLazarPackageLatestVersion,
  genericGitHubMavenVersionFetcher,
} from "./versionCheckers.js"
