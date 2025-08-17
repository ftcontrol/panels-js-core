export type PluginConfig = {
    id: string
    name: string
    letterName: string
    description: string
    websiteURL: string
    version: string
    pluginsCoreVersion: string
    author: string
    widgets: PanelsWidget[]
    navlets: PanelsWidget[]
    manager: PanelsWidget
    docs: PluginDocs
    templates: Template[]
    includedPluginsIDs: string[]
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
