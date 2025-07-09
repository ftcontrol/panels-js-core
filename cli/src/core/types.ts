export type PluginConfig = {
  id: string
  name: string
  description: string
  version: string
  panelsVersion: string
  author: string
  widgets: PanelsWidget[]
}

export type PanelsWidget = {
  name: string
  filepath: string
}

export type PluginInfo = {
  details: PluginConfig
  config: {
    idDev: boolean
    isEnabled: boolean
    [key: string]: unknown
  }
}
