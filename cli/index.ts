import { PluginManager } from "./core/socket/manager"
import { GlobalSocket } from "./core/socket/global"
import Button from "./core/ui/Button.svelte"
import DynamicComponent from "./core/ui/DynamicComponent.svelte"
import Overlay from "./core/ui/Overlay.svelte"
import type { PluginConfig, PluginInfo } from "./core/types"

export type { PluginConfig, PluginInfo }
export { PluginManager, Button, DynamicComponent, Overlay, GlobalSocket }
