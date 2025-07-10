export type PluginConfig = {
  id: string
  name: string
  letterName: string
  description: string
  version: string
  panelsVersion: string
  pluginsCoreVersion: string
  author: string
  widgets: PanelsWidget[]
  manager: PanelsWidget
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
