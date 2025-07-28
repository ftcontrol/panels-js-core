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

        console.log(
          `[devServer] ✅ Go to /plugins, enable DEV mode and set devURL for ${config.id} to http://localhost:${port}.`
        )
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
