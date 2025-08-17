import fs from "fs"
import path from "path"
import { exec, execSync } from "child_process"
import { promisify } from "util"
import { type PluginConfig } from "ftc-panels"
import chokidar from "chokidar"
import http from "http"
import url from "url"

const execAsync = promisify(exec)


const modules: PluginConfig[] = []
const moduleTimestamps = new Map<string, number>()
const debounceMap = new Map<string, NodeJS.Timeout>()

async function buildModule(
  name: string,
  webDir: string
): Promise<PluginConfig | null> {
  const packageJsonPath = path.join(webDir, "package.json")
  console.log(`🛠️  Path: ${packageJsonPath}`)

  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
    if (pkg.scripts?.build) {
      console.log(`🛠️  Building "${name}"...`)
      try {
        await execAsync("bun run build", { cwd: webDir })
      } catch (e) {
        console.error(`❌ Build failed for ${name}:`, e)
        return null
      }
    }
  }

  const distConfigJson = path.join(webDir, "dist", "config.json")
  if (!fs.existsSync(distConfigJson)) return null

  try {
    const rawConfig = fs.readFileSync(distConfigJson, "utf-8")
    const config = JSON.parse(rawConfig) as PluginConfig
    moduleTimestamps.set(config.name, Date.now())
    return config
  } catch (e) {
    console.error(`❌ Failed to parse config for ${name}:`, e)
    return null
  }
}

function watchWebDir(name: string, webDir: string) {
  if (!fs.existsSync(webDir)) return

  console.log(`👀 Watching "${name}" for changes...`)
  const watcher = chokidar.watch(webDir, {
    ignored: [
      path.join(webDir, "dist"),
      path.join(webDir, "node_modules"),
      path.join(webDir, ".panels"),
      /.*\.lock$/,
      path.join(webDir, "bun.lock"),
      path.join(webDir, "bun.lockb"),
      path.join(webDir, "package-lock.json"),
    ],
    ignoreInitial: true,
    persistent: true,
  })

  watcher.on("all", () => {
    if (debounceMap.has(name)) clearTimeout(debounceMap.get(name)!)
    debounceMap.set(
      name,
      setTimeout(async () => {
        console.log(`🔄 Rebuilding "${name}" due to changes...`)
        const config = await buildModule(name, webDir)
        if (config) {
          const index = modules.findIndex((m) => m.name === config.name)
          if (index >= 0) modules[index] = config
          else modules.push(config)
          moduleTimestamps.set(config.name, Date.now())
          console.log(`✅ Rebuilt and reloaded "${name}".`)
        }
      }, 300)
    )
  })
}

export async function buildAllPlugins(
  dir: string,
  isParallel: boolean = true,
  folders: string[] | null
): Promise<
  {
    config: PluginConfig
    name: string
  }[]
> {
  const moduleDirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const results: {
    config: PluginConfig
    name: string
  }[] = []

  if (isParallel) {
    const buildTasks = moduleDirs.map(async (name) => {
      const webDir = path.join(dir, name, "web")
      const configPath = path.join(webDir, "config.ts")

      if (!fs.existsSync(configPath)) {
        console.log(`⏭️  Skipping "${name}" (missing web/config.ts)`)
        return null
      }

      if (folders != null && !folders.includes(name)) {
        console.log(`⏭️  Skipping "${name}" (not in folders list)`)
        return null
      }

      const config = await buildModule(name, webDir)

      if (config == null) return null

      return {
        config,
        name,
      }
    })

    return (await Promise.all(buildTasks)).filter((it) => it != null)
  } else {
    for (const name of moduleDirs) {
      const webDir = path.join(dir, name, "web")
      const configPath = path.join(webDir, "config.ts")

      if (!fs.existsSync(configPath)) {
        console.log(`⏭️  Skipping "${name}" (missing web/config.ts)`)
        continue
      }

      if (folders != null && !folders.includes(name)) {
        console.log(`⏭️  Skipping "${name}" (not in folders list)`)
        continue
      }

      function ensureBunAvailable() {
        try {
          execSync("bun --version", { stdio: "ignore" })
        } catch {
          throw new Error(
              "Bun is required to build this plugin, but it wasn't found in PATH. Install Bun and try again."
          )
        }
      }

      function bunInstall(pkgDir: string) {
        console.log(`🔧 Ensuring dependencies in ${pkgDir}`)
        ensureBunAvailable()
        console.log("📦 Running: bun install")
        execSync("bun install", { cwd: pkgDir, stdio: "inherit" })
      }

      bunInstall(webDir)

      const config = await buildModule(name, webDir)
      if (config == null) continue

      results.push({
        config,
        name,
      })
    }

    return results
  }
}

export function getAllPluginConfigs(): PluginConfig[] {
  return modules
}

export async function globalDev(
  currentDir: string = process.cwd(),
  folders: string[] | null
) {
  const data = await buildAllPlugins(currentDir, false, folders)
  data.forEach((entry) => {
    modules.push(entry.config)
    const webDir = path.join(currentDir, entry.name, "web")
    watchWebDir(entry.name, webDir)
  })

  console.log(`✅ Built ${data.length} module(s). Starting watchers...`)
  startServer()
}

function startServer() {
  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
      res.writeHead(204)
      res.end()
      return
    }

    const parsedUrl = url.parse(req.url || "", true)

    if (parsedUrl.pathname === "/plugins") {
      const pluginSummaries = getAllPluginConfigs().map((plugin) => ({
        id: plugin.id,
        name: plugin.name,
        lastChanged: moduleTimestamps.get(plugin.name) || null,
      }))

      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify(pluginSummaries, null, 2))
      return
    }

    const match = parsedUrl.pathname?.match(/^\/plugins\/([^/]+)$/)
    if (match) {
      const pluginId = match[1]
      const plugin = getAllPluginConfigs().find((m) => m.id === pluginId)
      if (plugin) {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(plugin, null, 2))
      } else {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ error: "Plugin not found" }))
      }
      return
    }

    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Not found" }))
  })

  const PORT = 3001
  server.listen(PORT, () => {
    console.log(`🚀 Plugin server running at http://localhost:${PORT}`)
  })
}
