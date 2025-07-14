import chokidar from "chokidar"
import * as http from "http"
import sirv from "sirv"
import { buildPanelsPlugin } from "./build"

export function devServer(
  dir: string,
  port = 3000,
  outDir = "./dist/",
  watchDir = "./src/"
) {
  let isBuilding = false
  let server: http.Server | null = null

  const runBuild = async () => {
    if (isBuilding) return
    isBuilding = true
    console.log("[devServer] Building...")
    await buildPanelsPlugin(dir)

    console.log("[devServer] Build succeeded")

    isBuilding = false
    if (!server) {
      const serve = sirv(outDir, { dev: true })
      server = http.createServer((req, res) => {
        serve(req, res)
      })

      server.listen(port, () => {
        console.log(`[devServer] Server running at http://localhost:${port}`)
      })
    }
  }

  console.log(`[devServer] Watching "${watchDir}" for changes...`)
  chokidar.watch(watchDir, { ignoreInitial: true }).on("all", () => {
    runBuild()
  })

  runBuild()
}
