export type PluginConfig = {
  id: string
  name: string
  letterName: string
  description: string
  websiteURL: string
  version: string
  pluginsCoreVersion: string
  author: string
  components: PanelsWidget[]
  manager: string
  templates: Template[]
  includedPluginsIDs: string[]
  changelog: ChangeLogEntry[]
}

export type ChangeLogEntry = {
  version: string
  release_date: string
  changes: Change[]
}

export type Change = {
  type:
    | "added"
    | "changed"
    | "deprecated"
    | "removed"
    | "fixed"
    | "docs"
    | "other"
  description: string
  upgrading: string
}

export type PluginDocs = {
  homepage: PanelsWidget
  chapters: PanelsWidget[]
}

export type PanelsWidget = {
  type: "widget" | "navlet" | "docs"
  id: string
  filepath: string
}

export type PluginSettings = {
  isDev: boolean
  isEnabled: boolean
  [key: string]: unknown
}

export type PluginInfo = {
  details: PluginConfig
  config: PluginSettings
}

export type Template = {
  name: string
  widgets: TemplateWidgetGroup[]
  navlets: TemplateNavlet[]
}

export type TemplateWidget = {
  pluginID: string
  widgetID: string
}

export type TemplateWidgetGroup = {
  widgets: TemplateWidget[]
  x: number
  y: number
  w: number
  h: number
}

export type TemplateNavlet = {
  pluginID: string
  navletID: string
}
