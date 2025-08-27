import type { PluginConfig } from "ftc-panels"

export function getFirstPlugin(plugins: PluginConfig[]) {
  const docsPlugin = plugins.find((it) => it.id === "com.bylazar.docs")
  if (docsPlugin) {
    return docsPlugin.id
  }
  const panelsPlugin = plugins.find((it) => it.id === "com.bylazar.panels")
  if (panelsPlugin) {
    return panelsPlugin.id
  }
  const jsCorePlugin = plugins.find(
    (it) => it.id === "com.bylazar.pluginsjscore"
  )
  if (jsCorePlugin) {
    return jsCorePlugin.id
  }
  if (plugins.length == 0) return undefined
  return plugins.sort((a, b) => a.name.localeCompare(b.name))[0].id
}
