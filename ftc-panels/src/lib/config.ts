import type { PluginConfig, PluginSettings } from "./core/types.js"

const pluginsCoreConfig: PluginConfig = {
  id: "com.bylazar.pluginsjscore",
  name: "Plugins JS Core",
  letterName: "PJC",
  description: "Plugins Javascript Core",
  websiteURL: "https://panels.bylazar.com",
  mavenURL: "",
  packageString: "",
  version: "1.1.43",
  pluginsCoreVersion: "1.1.43",
  author: "Lazar",
  manager: "",
  components: [],
  templates: [],
  includedPluginsIDs: [],
  changelog: [
    {
      version: "1.1.43",
      release_date: "28.08.2025",
      changes: [
        {
          type: "fixed",
          description: "Installed chokidar.",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.42",
      release_date: "28.08.2025",
      changes: [
        {
          type: "fixed",
          description: "Fixed some imports.",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.41",
      release_date: "27.08.2025",
      changes: [
        {
          type: "fixed",
          description: "Fixed Overlay component.",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.40",
      release_date: "27.08.2025",
      changes: [
        {
          type: "fixed",
          description: "Fixed import for Link in docs.",
          upgrading: "",
        },
      ],
    },
    {
      version: "1.1.39",
      release_date: "27.08.2025",
      changes: [
        {
          type: "deprecated",
          description:
            "Moved common docs components for Panels and Docs Website to ftc-panels-docs",
          upgrading: "Use the new library",
        },
        {
          type: "fixed",
          description: "Properly exported typed svelte components.",
          upgrading: "",
        },
      ],
    },
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
