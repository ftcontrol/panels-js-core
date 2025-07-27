import { PluginManager } from "./core/socket/manager"
import { GlobalSocket } from "./core/socket/global"
import Button from "./core/ui/Button.svelte"
import DynamicComponent from "./core/ui/DynamicComponent.svelte"
import Overlay from "./core/ui/Overlay.svelte"
import Toggle from "./core/ui/Toggle.svelte"
import type {
  PluginConfig,
  PluginInfo,
  DevPluginEntry,
  PanelsWidget,
} from "./core/types"
import type { PluginValue } from "./core/socket/state"
import { PluginStateManager } from "./core/socket/state"

export type {
  PluginConfig,
  PluginInfo,
  DevPluginEntry,
  PluginValue,
  PanelsWidget,
}
export {
  PluginManager,
  Button,
  DynamicComponent,
  Overlay,
  GlobalSocket,
  Toggle,
  PluginStateManager,
}
