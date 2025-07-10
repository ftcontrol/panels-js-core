import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import path from "path"
import type { PluginConfig } from "./core/types"

export async function buildPanelsPlugin(dir: string) {
  const widgetsDir = path.resolve(dir, "src/widgets")
  const generatedDir = path.resolve(dir, ".panels")
  const distDir = path.resolve(dir, "dist")
  const distWidgetsDir = path.resolve(dir, "dist/widgets")

  const configPath = path.resolve(dir, "config.ts")

  const module = await import(configPath)

  const config = module.config as PluginConfig

  console.log(config)

  const widgetNames = config.widgets.map((w) => w.name)
  const duplicates = widgetNames.filter(
    (name, i, arr) => arr.indexOf(name) !== i
  )

  if (duplicates.length > 0) {
    throw new Error(
      `Duplicate widget names found in config: ${[...new Set(duplicates)].join(", ")}`
    )
  }

  function writeConfigJsonToDist(config: PluginConfig) {
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true })
    }

    const jsonPath = path.resolve(distDir, "config.json")
    fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2), "utf-8")
  }

  function clearDist() {
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

  function clearUdmDist() {
    if (fs.existsSync(distWidgetsDir)) {
      fs.readdirSync(distWidgetsDir).forEach((file) => {
        const filePath = path.join(distWidgetsDir, file)
        if (
          !fs.lstatSync(filePath).isDirectory() &&
          file.endsWith(".umd.cjs")
        ) {
          fs.unlinkSync(filePath)
        }
      })
    }

    if (fs.existsSync(distDir)) {
      fs.readdirSync(distDir).forEach((file) => {
        const filePath = path.join(distDir, file)
        if (
          !fs.lstatSync(filePath).isDirectory() &&
          file.endsWith(".umd.cjs")
        ) {
          fs.unlinkSync(filePath)
        }
      })
    }
  }

  async function buildAllWidgets(svelteFiles: string[]) {
    clearDist()
    writeConfigJsonToDist(config)

    for (const file of svelteFiles) {
      const name = file.replace(/\.svelte$/, "")
      const entryPath = path.resolve(generatedDir, `${name}.ts`)

      console.log(`Building widget: ${name}`)

      console.log(entryPath)

      await build({
        plugins: [
          svelte({
            emitCss: false,
          }),
        ],
        build: {
          lib: {
            entry: entryPath,
            name: "Component",
            fileName: `widgets/${name}`,
          },
          rollupOptions: {
            external: [],
            output: {
              globals: {},
            },
          },
          emptyOutDir: false,
        },
      })
    }

    const managerEntry = config.manager
    await build({
      plugins: [
        svelte({
          emitCss: false,
        }),
      ],
      build: {
        lib: {
          entry: managerEntry.filepath,
          name: "Manager",
          fileName: `${managerEntry.name}`,
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {},
          },
        },
        emptyOutDir: false,
      },
    })

    fs.readdirSync(generatedDir).forEach((file) => {
      fs.unlinkSync(path.resolve(generatedDir, file))
    })
    fs.rmdirSync(generatedDir)

    clearUdmDist()
  }

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir)
  }

  const widgets = config.widgets

  widgets.forEach(({ name, filepath }) => {
    const tsFilename = `${name}.ts`
    const tsFilePath = path.resolve(generatedDir, tsFilename)

    const tsContent = `import { mount } from "svelte"
import ${name.replace(" ", "_")} from "${path.relative(generatedDir, path.resolve(dir, filepath)).replace(/\\/g, "/")}"

export default function load(target: HTMLElement, props: any) {
  return mount(${name.replace(" ", "_")}, {
    target: target,
    props: props,
  })
}
`
    fs.writeFileSync(tsFilePath, tsContent, "utf-8")
  })

  buildAllWidgets(widgets.map((w) => w.name))
    .then(() => console.log("All widgets built!"))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
