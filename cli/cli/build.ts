import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import path from "path"
import type { PanelsWidget, PluginConfig } from "../core/types"
import { checkPlugin } from "./check"
import zlib from "zlib"
import { execSync } from "child_process"

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
  fs.writeFileSync(srcPath + ".gz", gz)
}

//check all slvete components to have different name

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
    itemNames.push("Manager")
    itemFixedNames.push("Manager")

    output.push(`const mappings = {`)
    for (let i = 0; i < itemNames.length; i++) {
      output.push(`"${itemNames[i]}": ${itemFixedNames[i]},`)
    }
    output.push(`}`)

    output.push(
      `export default function load(id: string, target: HTMLElement, props: any){`
    )
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

  // implement checks here

  console.log(config)

  await createTsWrapper(config)

  const jsonPath = path.resolve(distDir, "config.json")
  fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2), "utf-8")

  const svelteBundle = path.resolve(distDir, "svelte.js")
  gzipFile(svelteBundle)

  return config

  //   const isValid = await checkPlugin(dir)
  //   if (!isValid) {
  //     console.log("Plugin is not valid.")
  //     return config
  //   }

  //   function clearUmdDist() {
  //     const clearUmdFilesInDir = (dirPath: string) => {
  //       if (fs.existsSync(dirPath)) {
  //         fs.readdirSync(dirPath).forEach((file) => {
  //           const filePath = path.join(dirPath, file)
  //           if (
  //             !fs.lstatSync(filePath).isDirectory() &&
  //             file.endsWith(".umd.cjs")
  //           ) {
  //             fs.unlinkSync(filePath)
  //           }
  //         })
  //       }
  //     }
  //     clearUmdFilesInDir(distWidgetsDir)
  //     clearUmdFilesInDir(distDocsDir)
  //     clearUmdFilesInDir(distNavletsDir)
  //     clearUmdFilesInDir(distDir)
  //   }

  //   function injectFileContents(config: PluginConfig, baseDir: string) {
  //     const readContent = (filepath: string): string => {
  //       const fullPath = path.resolve(baseDir, filepath)
  //       return fs.readFileSync(fullPath, "utf-8")
  //     }

  //     config.widgets = config.widgets.map((w) => ({
  //       ...w,
  //       textContent: readContent(`dist/widgets/${w.name}.js`),
  //     }))

  //     config.navlets =
  //       config.navlets?.map((n) => ({
  //         ...n,
  //         textContent: readContent(`dist/navlets/${n.name}.js`),
  //       })) ?? []

  //     config.manager = {
  //       ...config.manager,
  //       textContent: readContent(`dist/${config.manager.name}.js`),
  //     }

  //     config.docs = {
  //       homepage: {
  //         ...config.docs.homepage,
  //         textContent: readContent(`dist/docs/${config.docs.homepage.name}.js`),
  //       },
  //       chapters: config.docs.chapters.map((chapter) => ({
  //         ...chapter,
  //         textContent: readContent(`dist/docs/${chapter.name}.js`),
  //       })),
  //     }
  //   }

  //   function createTsWrapper(name: string, filepath: string) {
  //     const tsFilename = `${name}.ts`
  //     const tsFilePath = path.resolve(generatedDir, tsFilename)
  //     const sanitizedName = name.replace(/ /g, "_")

  //     const tsContent = `import { mount } from "svelte"
  // import ${sanitizedName} from "${path
  //       .relative(generatedDir, path.resolve(dir, filepath))
  //       .replace(/\\/g, "/")}"

  // export default function load(target: HTMLElement, props: any) {
  //   return mount(${sanitizedName}, {
  //     target: target,
  //     props: props,
  //   })
  // }
  // `
  //     fs.writeFileSync(tsFilePath, tsContent, "utf-8")
  //   }

  //   async function buildAllComponents(names: string[], outputSubfolder: string) {
  //     for (const name of names) {
  //       const entryPath = path.resolve(generatedDir, `${name}.ts`)

  //       console.log(`Building component: ${name} into ${outputSubfolder}`)

  //       await build({
  //         plugins: [
  //           svelte({
  //             emitCss: false,
  //           }),
  //         ],
  //         build: {
  //           lib: {
  //             entry: entryPath,
  //             name: "Component",
  //             fileName: `${outputSubfolder}/${name}`,
  //           },
  //           rollupOptions: {
  //             external: [],
  //             output: {
  //               globals: {},
  //             },
  //           },
  //           minify: minify,
  //           emptyOutDir: false,
  //         },
  //       })
  //     }
  //   }

  //   config.widgets.forEach(({ name, filepath }) => {
  //     createTsWrapper(name, filepath)
  //   })

  //   config.navlets.forEach(({ name, filepath }) => {
  //     createTsWrapper(name, filepath)
  //   })

  //   createTsWrapper(config.docs.homepage.name, config.docs.homepage.filepath)

  //   config.docs.chapters.forEach(({ name, filepath }) => {
  //     createTsWrapper(name, filepath)
  //   })

  //   try {
  //     clearDist()

  //     await buildAllComponents(
  //       config.widgets.map((w) => w.name),
  //       "widgets"
  //     )

  //     if (config.navlets.length > 0) {
  //       await buildAllComponents(
  //         config.navlets.map((n) => n.name),
  //         "navlets"
  //       )
  //     }

  //     if (config.docs.homepage) {
  //       await buildAllComponents([config.docs.homepage.name], "docs")
  //     }

  //     if (config.docs.chapters.length > 0) {
  //       await buildAllComponents(
  //         config.docs.chapters.map((c) => c.name),
  //         "docs"
  //       )
  //     }

  //     const managerEntry = config.manager
  //     await build({
  //       plugins: [
  //         svelte({
  //           emitCss: false,
  //         }),
  //       ],
  //       build: {
  //         lib: {
  //           entry: managerEntry.filepath,
  //           name: "Manager",
  //           fileName: `${managerEntry.name}`,
  //         },
  //         rollupOptions: {
  //           external: [],
  //           output: {
  //             globals: {},
  //           },
  //         },
  //         minify: minify,
  //         emptyOutDir: false,
  //       },
  //     })

  //     clearGeneratedPanelsDir()

  //     clearUmdDist()

  //     injectFileContents(config, dir)

  //     clearDist()
  //     writeConfigJsonToDist(config)

  //     console.log("All components built!")
  //   } catch (err) {
  //     console.error(err)
  //     throw err
  //   }

  //   return config
}
