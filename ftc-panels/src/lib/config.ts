import type { PluginConfig, PluginSettings } from "./core/types.js"

const pluginsCoreConfig: PluginConfig = {
  id: "com.bylazar.pluginsjscore",
  name: "Plugins JS Core",
  letterName: "PJC",
  description: "Plugins Javascript Core",
  websiteURL: "https://panels.bylazar.com",
  mavenURL: "",
  packageString: "",
  version: "1.1.38",
  pluginsCoreVersion: "1.1.38",
  author: "Lazar",
  manager: "",
  components: [],
  templates: [],
  includedPluginsIDs: [],
  changelog: [
    {
      version: "1.1.38",
      release_date: "26.08.2025",
      changes: [
        {
          type: "added",
          description:
            "Added generic functions to fetch latest versions from GitHub hosted mavens",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.37",
      release_date: "25.08.2025",
      changes: [
        {
          type: "fixed",
          description:
            "Fixed docs handling of URL special characters for selected link",
          upgrading: "",
        },
        {
          type: "fixed",
          description: "Fixed JS Core plugin config versions",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.36",
      release_date: "25.08.2025",
      changes: [
        {
          type: "fixed",
          description: "Fixed minor docs shared UI logic",
          upgrading: "",
        },
      ],
    },
  ],
}

const defaultSettings: PluginSettings = {
  isEnabled: true,
  isDev: false,
}

export { pluginsCoreConfig, defaultSettings }
