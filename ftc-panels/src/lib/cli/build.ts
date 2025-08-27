import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import path from "path"
import { checkPlugin } from "./check.js"
import zlib from "zlib"
import type { PanelsWidget, PluginConfig } from "$lib/core/types.js"

function clearDist(distDir: string) {
  if (fs.existsSync(distDir)) {
    fs.readdirSync(distDir).forEach((file) => {
      const filePath = path.join(distDir, file)
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true })
      } else {
        fs.unlinkSync(filePath)
      }
    })
  }
}

function gzipFile(srcPath: string) {
  if (!fs.existsSync(srcPath)) return
  const buf = fs.readFileSync(srcPath)
  const gz = zlib.gzipSync(buf, {
    level: zlib.constants.Z_BEST_COMPRESSION,
    // @ts-ignore Node accepts mtime
    mtime: 0,
  })

  fs.unlinkSync(srcPath)
  fs.writeFileSync(srcPath, gz)
}

export async function buildPanelsPlugin(
  dir: string,
  minify = true
): Promise<PluginConfig> {
  const distDir = path.resolve(dir, "dist")
  const generatedDir = path.resolve(dir, ".panels")

  async function createTsWrapper(config: PluginConfig) {
    let output: string[] = [`import { mount } from "svelte"`]
    let itemNames: string[] = []
    let itemFixedNames: string[] = []

    function addItem(item: PanelsWidget) {
      const n = item.id.replace(/ /g, "_")
      const filepath = path
        .relative(generatedDir, path.resolve(dir, item.filepath))
        .replace(/\\/g, "/")
      output.push(`import ${n} from "${filepath}"`)
      itemNames.push(item.id)
      itemFixedNames.push(n)
    }

    for (const item of config.components) addItem(item)
    const filepath = path
      .relative(generatedDir, path.resolve(dir, config.manager))
      .replace(/\\/g, "/")
    output.push(`import Manager from "${filepath}"`)

    output.push(`const mappings = {`)
    for (let i = 0; i < itemNames.length; i++) {
      output.push(`"${itemNames[i]}": ${itemFixedNames[i]},`)
    }
    output.push(`}`)

    output.push(
      `export default function load(id: string, target: HTMLElement, props: any){`
    )
    output.push(`if(id == "Manager"){`)
    output.push("return Manager")
    output.push(`}`)
    output.push(`return mount(mappings[id], {target: target, props: props})`)
    output.push(`}`)

    const tsFilePath = path.resolve(generatedDir, "wrapper.ts")

    fs.writeFileSync(tsFilePath, output.join("\n"), "utf-8")

    await build({
      plugins: [
        svelte({
          emitCss: false,
        }),
      ],
      build: {
        lib: {
          entry: tsFilePath,
          name: "Component",
          fileName: `svelte`,
          formats: ["es"],
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {},
          },
        },
        minify: "esbuild",
        target: "es2019",
        sourcemap: false,
        emptyOutDir: false,
      },
    })
  }

  console.log("Building Panels Plugin")

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir)
  }

  clearDist(distDir)
  clearDist(generatedDir)

  const configPath = path.resolve(dir, "config.ts")
  const module = await import(/* @vite-ignore */ configPath)
  const config = module.config as PluginConfig

  const isValid = await checkPlugin(dir)
  if (!isValid) {
    console.log("Plugin is not valid.")
    return config
  }

  console.log(config)

  await createTsWrapper(config)

  const jsonPath = path.resolve(distDir, "config.json")
  fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2), "utf-8")

  const svelteBundle = path.resolve(distDir, "svelte.js")
  gzipFile(svelteBundle)

  return config
}
