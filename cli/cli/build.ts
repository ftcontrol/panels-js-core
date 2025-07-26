import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import path from "path"
import type { PluginConfig } from "../core/types"

export async function buildPanelsPlugin(dir: string): Promise<PluginConfig> {
  const generatedDir = path.resolve(dir, ".panels")
  const distDir = path.resolve(dir, "dist")
  const distWidgetsDir = path.resolve(dir, "dist/widgets")

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir)
  }

  const configPath = path.resolve(dir, "config.ts")

  const module = await import(/* @vite-ignore */ configPath)

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

  function createTsWrapper(name: string, filepath: string) {
    const tsFilename = `${name}.ts`
    const tsFilePath = path.resolve(generatedDir, tsFilename)
    const sanitizedName = name.replace(/ /g, "_")

    const tsContent = `import { mount } from "svelte"
import ${sanitizedName} from "${path
      .relative(generatedDir, path.resolve(dir, filepath))
      .replace(/\\/g, "/")}"

export default function load(target: HTMLElement, props: any) {
  return mount(${sanitizedName}, {
    target: target,
    props: props,
  })
}
`
    fs.writeFileSync(tsFilePath, tsContent, "utf-8")
  }

  async function buildAllComponents(names: string[]) {
    for (const name of names) {
      const entryPath = path.resolve(generatedDir, `${name}.ts`)

      console.log(`Building component: ${name}`)
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
          minify: false,
          emptyOutDir: false,
        },
      })
    }
  }

  config.widgets.forEach(({ name, filepath }) => {
    createTsWrapper(name, filepath)
  })

  if (config.docs?.homepage) {
    createTsWrapper(config.docs.homepage.name, config.docs.homepage.filepath)
  }

  if (Array.isArray(config.docs?.chapters)) {
    config.docs.chapters.forEach(({ name, filepath }) => {
      createTsWrapper(name, filepath)
    })
  }

  try {
    clearDist()
    writeConfigJsonToDist(config)

    await buildAllComponents(config.widgets.map((w) => w.name))

    if (config.docs?.homepage) {
      await buildAllComponents([config.docs.homepage.name])
    }

    if (
      Array.isArray(config.docs?.chapters) &&
      config.docs.chapters.length > 0
    ) {
      await buildAllComponents(config.docs.chapters.map((c) => c.name))
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

    clearUdmDist()

    console.log("All components built!")
  } catch (err) {
    console.error(err)
    throw err
  }

  return config
}
