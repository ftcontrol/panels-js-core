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
  filepath: string
}
