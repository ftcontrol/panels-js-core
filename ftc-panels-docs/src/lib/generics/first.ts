import type { PluginConfig } from "ftc-panels"

export function getFirstPlugin(plugins: PluginConfig[]) {
  if (plugins.length === 0) return undefined

  const docsPlugin = plugins.find((it) => it.id === "com.bylazar.docs")
  if (docsPlugin) return docsPlugin.id

  const corePlugins = plugins.filter((p) => {
    if (!p.id.startsWith("com.bylazar")) return false
    const docs = (p.components || []).filter((c) => c.type === "docs")
    return docs.length === 1
  })

  if (corePlugins.length > 0) {
    corePlugins.sort((a, b) => a.name.localeCompare(b.name))
    return corePlugins[0].id
  }

  const extras = plugins.filter((p) => !p.id.startsWith("com.bylazar"))
  if (extras.length > 0) {
    extras.sort((a, b) => a.name.localeCompare(b.name))
    return extras[0].id
  }

  return undefined
}
