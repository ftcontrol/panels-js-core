import { PluginManager } from "./core/socket/manager"
import { GlobalSocket } from "./core/socket/global"
import Button from "./core/ui/Button.svelte"
import TextInput from "./core/ui/TextInput.svelte"
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
} from "./core/types"
import type { PluginValue } from "./core/socket/state"
import { PluginStateManager } from "./core/socket/state"
import { setCookie, getCookie } from "./core/cookies"

export type {
  PluginConfig,
  PluginInfo,
  PluginValue,
  PanelsWidget,
  Template,
  TemplateWidget,
  TemplateNavlet,
  TemplateWidgetGroup,
}
export {
  PluginManager,
  Button,
  TextInput,
  DynamicComponent,
  SimpleDynamicComponent,
  Overlay,
  GlobalSocket,
  Toggle,
  PluginStateManager,
  setCookie,
  getCookie,
}
