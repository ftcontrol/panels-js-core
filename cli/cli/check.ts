import { existsSync, statSync, readFileSync } from "fs"
import { resolve } from "path"
import { pathToFileURL } from "url"
import type { PluginConfig } from "../core/types"

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

export async function checkPlugin(dir: string): Promise<boolean> {
  console.log("Checking plugin")
  const configPath = resolve(dir, "config.ts")
  if (!existsSync(configPath)) {
    console.error("Missing config.ts in", dir)
    return false
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
    ["widgets", cfg.widgets],
    ["navlets", cfg.navlets],
    ["templates", cfg.templates],
    ["docs.chapters", cfg.docs?.chapters],
  ]

  for (const [name, value] of arrayFields) {
    if (!Array.isArray(value)) {
      console.error(`Field '${name}' must be an array`)
      return false
    }
  }

  if (!isValidFile(dir, cfg.manager.filepath)) {
    console.error(
      `Invalid or missing manager.filepath: ${cfg.manager.filepath}`
    )
    return false
  }

  if (!isValidFile(dir, cfg.docs.homepage.filepath)) {
    console.error(
      `Invalid or missing docs.homepage.filepath: ${cfg.docs.homepage.filepath}`
    )
    return false
  }

  for (const chapter of cfg.docs.chapters || []) {
    if (!isValidFile(dir, chapter.filepath)) {
      console.error(`Invalid or missing chapter filepath: ${chapter.filepath}`)
      return false
    }
  }

  for (const widget of cfg.widgets || []) {
    if (!isValidFile(dir, widget.filepath)) {
      console.error(`Invalid or missing widget filepath: ${widget.filepath}`)
      return false
    }
  }

  if (cfg.widgets) {
    const widgetNames = cfg.widgets.map((w) => w.name)
    const uniqueWidgetNames = new Set(widgetNames)
    if (uniqueWidgetNames.size !== widgetNames.length) {
      console.error("Duplicate widget names found")
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
  }

  if (cfg.navlets) {
    const navletNames = cfg.navlets.map((n) => n.name)
    const uniqueNavletNames = new Set(navletNames)
    if (uniqueNavletNames.size !== navletNames.length) {
      console.error("Duplicate navlet names found")
      return false
    }
  }

  const docNames = [
    cfg.docs.homepage.name,
    ...(cfg.docs.chapters?.map((c) => c.name) || []),
  ]
  const uniqueDocNames = new Set(docNames)
  if (uniqueDocNames.size !== docNames.length) {
    console.error("Duplicate docs chapter/homepage names found")
    return false
  }

  const pluginNamespace = extractPluginNamespace(gradlePath)
  if (!pluginNamespace) {
    console.error("Could not find 'pluginNamespace' in build.gradle.kts")
    return false
  }

  if (cfg.id !== pluginNamespace) {
    console.error(
      `Mismatch between config.id ("${cfg.id}") from config.ts and pluginNamespace ("${pluginNamespace}") from build.gradle.kts`
    )
    return false
  }

  const pluginVersion = extractPluginVersion(gradlePath)
  if (!pluginVersion) {
    console.error("Could not find 'pluginVersion' in build.gradle.kts")
    return false
  }

  if (cfg.version !== pluginVersion) {
    console.error(
      `Mismatch between config.id ("${cfg.version}") from config.ts and pluginNamespace ("${pluginVersion}") from build.gradle.kts`
    )
    return false
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
