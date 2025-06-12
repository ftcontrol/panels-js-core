const { readdir } = require("fs/promises")
const { join, basename } = require("path")

const SRC_DIR = "widgets"
const DIST_DIR = "dist"

async function buildWidgets() {
  const files = await readdir(SRC_DIR)

  const entries = {}
  for (const file of files) {
    if (file.endsWith(".svelte")) {
      const name = basename(file, ".svelte")
      entries[name] = join(SRC_DIR, file)
    }
  }

  const plugins = [
    {
      name: "svelte",
      setup(build) {
        build.onLoad({ filter: /\.svelte$/ }, async (args) => {
          const svelte = require("svelte/compiler")
          const fs = require("fs")
          const code = fs.readFileSync(args.path, "utf8")

          // ✅ Removed `format: "iife"` as it's not supported in Svelte 4
          const { js } = svelte.compile(code, {})

          return {
            contents: js.code,
            loader: "js",
          }
        })
      },
    },
  ]

  const result = await Bun.build({
    entrypoints: Object.values(entries),
    outdir: DIST_DIR,
    target: "browser",
    format: "esm", // Bun only supports ESM output now
    minify: true,
    plugins,
  })

  if (result.success) {
    console.log("✅ Build succeeded!")
    result.outputs.forEach((output) => {
      console.log(`→ ${output.path}`)
    })
  } else {
    console.error("❌ Build failed:")
    for (const message of result.logs) {
      console.error(message)
    }
  }
}

buildWidgets()
