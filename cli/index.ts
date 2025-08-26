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
  mavenURL: "",
  packageString: "",
  version: "1.1.38",
  pluginsCoreVersion: "1.1.38",
  author: "Lazar",
  manager: "",
  components: [],
  templates: [],
  includedPluginsIDs: [],
  changelog: [
    {
      version: "1.1.38",
      release_date: "26.08.2025",
      changes: [
        {
          type: "added",
          description:
            "Added generic functions to fetch latest versions from GitHub hosted mavens",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.37",
      release_date: "25.08.2025",
      changes: [
        {
          type: "fixed",
          description:
            "Fixed docs handling of URL special characters for selected link",
          upgrading: "",
        },
        {
          type: "fixed",
          description: "Fixed JS Core plugin config versions",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.36",
      release_date: "25.08.2025",
      changes: [
        {
          type: "fixed",
          description: "Fixed minor docs shared UI logic",
          upgrading: "",
        },
      ],
    },
  ],
}

export const defaultSettings: PluginSettings = {
  isEnabled: true,
  isDev: false,
}

export async function getLazarPackageLatestVersion(pck: string) {
  return await genericGitHubMavenVersionFetcher(
    "lazarcloud",
    "ftcontrol-maven",
    "releases",
    pck
  )
}

export async function genericGitHubMavenVersionFetcher(
  org: string,
  repo: string,
  folder: string,
  pck: string
): Promise<string> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${org}/${repo}/refs/heads/main/${folder}/${pck.replaceAll(".", "/")}/maven-metadata.xml`
    )
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "application/xml")

    const latestVersion = xmlDoc.querySelector("latest")?.textContent

    return latestVersion || ""
  } catch (error) {
    return ""
  }
}
