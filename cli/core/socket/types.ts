export type Handler = (data: GenericData) => void

export type GenericData = {
  pluginID: string
  messageID: string
  [key: string]: any
}
