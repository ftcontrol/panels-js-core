export type PluginConfig = {
  id: string
  name: string
  letterName: string
  description: string
  websiteURL: string
  devURL: string
  version: string
  pluginsCoreVersion: string
  author: string
  widgets: PanelsWidget[]
  navlets: PanelsWidget[]
  manager: PanelsWidget
  docs: PluginDocs
}

export type PluginDocs = {
  homepage: PanelsWidget
  chapters: PanelsWidget[]
}

export type PanelsWidget = {
  name: string
  filepath: string
  textContent?: string
}

export type PluginInfo = {
  details: PluginConfig
  config: {
    idDev: boolean
    isEnabled: boolean
    [key: string]: unknown
  }
}
