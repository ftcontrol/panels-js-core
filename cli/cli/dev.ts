import chokidar from "chokidar"
import * as http from "http"
import sirv from "sirv"
import { buildPanelsPlugin } from "./build"

export async function devServer(
  dir: string,
  port = 3000,
  outDir = "./dist/",
  watchDir = "./src/"
) {
  let server: http.Server | null = null
  let debounceTimer: NodeJS.Timeout | null = null
  let isBuilding = false
  let pendingBuild = false
  let currentBuildToken = 0

  const runBuild = async () => {
    if (isBuilding) {
      pendingBuild = true
      return
    }

    isBuilding = true
    const thisBuildToken = ++currentBuildToken
    console.log(`[devServer] 🛠️ Building... (token: ${thisBuildToken})`)

    try {
      const config = await buildPanelsPlugin(dir)

      if (thisBuildToken === currentBuildToken) {
        console.log(`[devServer] ✅ Build succeeded (token: ${thisBuildToken})`)
        const c = {
          reset: "\x1b[0m",
          keyword: "\x1b[35m", // magenta for class, override, var, etc.
          type: "\x1b[36m", // cyan for types like List, PanelsConfig
          string: "\x1b[32m", // green for strings
          property: "\x1b[33m", // yellow for property names
          value: "\x1b[93m", // bright yellow for values
          operator: "\x1b[37m", // white for operators
          comment: "\x1b[90m", // gray for comments
          import: "\x1b[94m", // bright blue for import/package names
          punctuation: "\x1b[37m", // white for punctuation
        }

        console.log(`
${c.keyword}import${c.reset} ${c.import}com.bylazar.panels.DevPluginEntry${c.reset}
${c.keyword}import${c.reset} ${c.import}com.bylazar.panels.PanelsConfig${c.reset}
${c.keyword}class${c.reset} ${c.type}Config${c.reset} ${c.punctuation}:${c.reset} ${c.type}PanelsConfig${c.punctuation}()${c.reset} ${c.punctuation}{${c.reset}
  ${c.keyword}override${c.reset} ${c.keyword}var${c.reset} ${c.property}devPlugins${c.reset}${c.punctuation}:${c.reset} ${c.type}List${c.punctuation}<${c.type}DevPluginEntry${c.punctuation}>${c.reset} ${c.operator}=${c.reset} ${c.type}listOf${c.punctuation}(${c.reset}
    ${c.type}DevPluginEntry${c.punctuation}(${c.reset}
        ${c.property}pluginID${c.reset} ${c.operator}=${c.reset} ${c.string}"${config.id}"${c.reset}${c.punctuation},${c.reset}
        ${c.property}devURL${c.reset} ${c.operator}=${c.reset} ${c.string}"http://localhost:${port}"${c.reset}
    ${c.punctuation})${c.reset}
  ${c.punctuation})${c.reset}
${c.punctuation}}${c.reset}
`)
        console.log("[devServer] ✅ Add this to your config")
      } else {
        console.log(
          `[devServer] ⚠️ Build finished but was outdated (token: ${thisBuildToken}, current: ${currentBuildToken}) — skipped`
        )
      }
    } catch (err) {
      if (thisBuildToken === currentBuildToken) {
        console.error(
          `[devServer] ❌ Build failed (token: ${thisBuildToken}):`,
          err
        )
      } else {
        console.log(
          `[devServer] ⚠️ Failed outdated build ignored (token: ${thisBuildToken}, current: ${currentBuildToken})`
        )
      }
    } finally {
      isBuilding = false
      if (pendingBuild) {
        pendingBuild = false
        setImmediate(() => runBuild())
      }
    }
  }

  const triggerBuild = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      await runBuild()
    }, 150)
  }

  chokidar
    .watch([watchDir, "./config.ts"], { ignoreInitial: true })
    .on("all", triggerBuild)

  if (!server) {
    const serve = sirv(outDir, { dev: true })
    server = http.createServer((req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      )
      res.setHeader("Access-Control-Allow-Headers", "*")

      if (req.method === "OPTIONS") {
        res.writeHead(204)
        res.end()
        return
      }

      serve(req, res)
    })

    server.listen(port, () => {
      console.log(`[devServer] 🚀 Server running at http://localhost:${port}`)
    })
  }

  console.log(`[devServer] 👀 Watching "${watchDir}" and "config.ts"...`)
  await runBuild()
}
