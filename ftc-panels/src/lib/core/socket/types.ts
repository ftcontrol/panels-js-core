export type Handler = (data: any) => void

export type GenericData = {
  pluginID: string
  messageID: string
  [key: string]: any
}
