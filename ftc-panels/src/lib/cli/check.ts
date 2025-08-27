import type { PluginConfig } from "$lib/core/types.js"
import { existsSync, statSync, readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import { pathToFileURL } from "url"

function isNonEmptyString(val: unknown): val is string {
  return typeof val === "string" && val.trim().length > 0
}

function isValidFile(baseDir: string, relativePath: string): boolean {
  const fullPath = resolve(baseDir, relativePath)
  return existsSync(fullPath) && statSync(fullPath).isFile()
}

function isValidDirectory(path: string): boolean {
  return existsSync(path) && statSync(path).isDirectory()
}

function extractPluginNamespace(gradlePath: string): string | null {
  if (!existsSync(gradlePath)) return null

  const content = readFileSync(gradlePath, "utf-8")
  const match = content.match(/val\s+pluginNamespace\s*=\s*"([^"]+)"/)
  return match && match[1] ? match[1] : null
}

function extractPluginVersion(gradlePath: string): string | null {
  if (!existsSync(gradlePath)) return null

  const content = readFileSync(gradlePath, "utf-8")
  const match = content.match(/val\s+pluginVersion\s*=\s*"([^"]+)"/)
  return match && match[1] ? match[1] : null
}

function readPackageJson(pkgDir: string): any | null {
  const pkgPath = resolve(pkgDir, "package.json")
  if (!existsSync(pkgPath)) return null
  try {
    const raw = readFileSync(pkgPath, "utf-8")
    return JSON.parse(raw)
  } catch (e) {
    console.warn("Could not parse package.json:", e)
    return null
  }
}

function sanitizeVersion(version: string): string {
  if (version.startsWith("link:") || version.startsWith("file:")) {
    return version
  }
  const m = version.match(/\d+(?:\.\d+){0,2}/)
  if (m) return m[0]
  return version.replace(/^[^\d]*/, "")
}

function getFtcPanelsPluginVersion(pkg: any): string | null {
  if (!pkg) return null
  const sections = [
    pkg.dependencies || {},
    pkg.devDependencies || {},
    pkg.optionalDependencies || {},
  ]

  for (const deps of sections) {
    for (const [name, ver] of Object.entries(deps as Record<string, string>)) {
      if (name.toLowerCase().includes("ftc-panels")) {
        return sanitizeVersion(ver as string)
      }
    }
  }
  return null
}

export async function checkPlugin(dir: string): Promise<boolean> {
  console.log("Checking plugin")
  const configPath = resolve(dir, "config.ts")
  if (!existsSync(configPath)) {
    console.error("Missing config.ts in", dir)
    return false
  }

  const pkg = readPackageJson(dir)
  const panelsVersion = getFtcPanelsPluginVersion(pkg)

  const isLocal =
    panelsVersion?.startsWith("link:") || panelsVersion?.startsWith("file:")

  if (!panelsVersion) {
    console.error("ftc-panels version not found")
    return false
  }

  if (isLocal) {
    console.log("ftc-panels is a local link, skipping config.ts version update")
  } else {
    let src = readFileSync(configPath, "utf-8")
    const original = src

    src = src.replace(
      /(pluginsCoreVersion\s*:\s*['"])([^'"]+)(['"])/,
      `$1${panelsVersion}$3`
    )

    if (src !== original) {
      writeFileSync(configPath, src, "utf-8")
      console.log(
        `Updated config.ts pluginsCoreVersion version to ${panelsVersion}`
      )
    } else {
      console.warn(
        "No matching pluginsCoreVersion version found to update in config.ts"
      )
    }
  }

  const gradleDir = resolve(dir, "..")
  const gradlePath = resolve(gradleDir, "build.gradle.kts")
  if (!isValidFile(gradleDir, "build.gradle.kts")) {
    console.error("Missing build.gradle.kts in parent directory")
    return false
  }

  let config: unknown
  try {
    const module = await import(pathToFileURL(configPath).href)
    config = module.config
  } catch (err) {
    console.error("Failed to import config.ts:", err)
    return false
  }

  if (!config || typeof config !== "object") {
    console.error("Exported config is invalid or missing")
    return false
  }

  const cfg = config as PluginConfig

  cfg.pluginsCoreVersion = panelsVersion

  const requiredStrings: (keyof PluginConfig)[] = [
    "id",
    "name",
    "letterName",
    "description",
    "version",
    "pluginsCoreVersion",
    "author",
  ]

  for (const key of requiredStrings) {
    if (!isNonEmptyString(cfg[key])) {
      console.error(`Missing or invalid string for '${key}'`)
      return false
    }
  }

  const arrayFields: [string, unknown][] = [
    ["components", cfg.components],
    ["templates", cfg.templates],
    ["includedPluginsIDs", cfg.includedPluginsIDs],
  ]

  for (const [name, value] of arrayFields) {
    if (!Array.isArray(value)) {
      console.error(`Field '${name}' must be an array`)
      return false
    }
  }

  if (!isValidFile(dir, cfg.manager)) {
    console.error(`Invalid or missing manager filepath: ${cfg.manager}`)
    return false
  }

  for (const c of cfg.components || []) {
    if (!isValidFile(dir, c.filepath)) {
      console.error(`Invalid or missing component filepath: ${c.filepath}`)
      return false
    }
  }

  if (cfg.components) {
    const componentsNames = cfg.components.map((c) => c.id)
    const uniqueWidgetNames = new Set(componentsNames)
    if (uniqueWidgetNames.has("Manager")) {
      console.error("Component cannot have id of Manager")
      return false
    }
    if (uniqueWidgetNames.size !== componentsNames.length) {
      console.error("Duplicate component names found")
      return false
    }
  }

  if (cfg.templates) {
    const templateNames = cfg.templates.map((t) => t.name)
    const uniqueTemplateNames = new Set(templateNames)
    if (uniqueTemplateNames.size !== templateNames.length) {
      console.error("Duplicate template names found")
      return false
    }

    for (const template of cfg.templates) {
      const grid = Array.from({ length: 12 }, () => Array(16).fill(false))

      if (!Array.isArray(template.widgets)) {
        console.error(
          `Template '${template.name}' is missing a valid widgets array`
        )
        return false
      }

      for (const widget of template.widgets) {
        const { x, y, w, h } = widget

        if (
          typeof x !== "number" ||
          typeof y !== "number" ||
          typeof w !== "number" ||
          typeof h !== "number"
        ) {
          console.error(
            `Invalid widget layout dimensions in template '${template.name}'`
          )
          return false
        }

        if (x < 0 || y < 0 || w <= 0 || h <= 0 || x + w > 16 || y + h > 12) {
          console.error(
            `Widget in template '${template.name}' is out of bounds: x=${x}, y=${y}, w=${w}, h=${h}`
          )
          return false
        }

        for (let dx = 0; dx < w; dx++) {
          for (let dy = 0; dy < h; dy++) {
            const gx = x + dx
            const gy = y + dy
            if (grid[gy]![gx]) {
              console.error(
                `Overlap detected in template '${template.name}' at cell (${gx}, ${gy})`
              )
              return false
            }
            grid[gy]![gx] = true
          }
        }
      }
    }
  }

  const pluginNamespace = extractPluginNamespace(gradlePath)
  if (!pluginNamespace) {
    console.error("Could not find 'pluginNamespace' in build.gradle.kts")
    return false
  }

  if (cfg.id !== pluginNamespace) {
    console.warn(
      `⚠️ Mismatch between config.id and pluginNamespace:\n` +
        `    config.id         = "${cfg.id}"\n` +
        `    pluginNamespace   = "${pluginNamespace}"\n` +
        `✅ Updating build.gradle.kts to use "${cfg.id}" as pluginNamespace`
    )

    const content = readFileSync(gradlePath, "utf-8")
    const updated = content.replace(
      /val\s+pluginNamespace\s*=\s*"([^"]+)"/,
      `val pluginNamespace = "${cfg.id}"`
    )
    writeFileSync(gradlePath, updated, "utf-8")

    console.error("Please resync gradle.")
  }

  const pluginVersion = extractPluginVersion(gradlePath)
  if (!pluginVersion) {
    console.error("Could not find 'pluginVersion' in build.gradle.kts")
    return false
  }

  if (cfg.version !== pluginVersion) {
    console.warn(
      `⚠️  Mismatch between config.version ("${cfg.version}") and pluginVersion ("${pluginVersion}") in build.gradle.kts.\n` +
        `    Overwriting build.gradle.kts with config version.`
    )

    const gradleContent = readFileSync(gradlePath, "utf-8")
    const updatedContent = gradleContent.replace(
      /val\s+pluginVersion\s*=\s*"([^"]+)"/,
      `val pluginVersion = "${cfg.version}"`
    )

    writeFileSync(gradlePath, updatedContent, "utf-8")
    console.error("Please resync gradle.")
  }

  const namespacePath = pluginNamespace.replace(/\./g, "/")
  const javaDir = resolve(gradleDir, "src", "main", "java", namespacePath)
  if (!isValidDirectory(javaDir)) {
    console.error(`Missing source folder: src/main/java/${namespacePath}`)
    return false
  }

  console.log("Plugin passed all checks.")

  return true
}
