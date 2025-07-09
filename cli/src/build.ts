import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import path from "path"

export function buildPanelsPlugin(dir: string) {
  const widgetsDir = path.resolve(dir, "src/widgets")
  const generatedDir = path.resolve(widgetsDir, "__generated__")
  const distDir = path.resolve(dir, "dist")
  const distWidgetsDir = path.resolve(dir, "dist/widgets")

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
  }

  async function buildAllWidgets(svelteFiles: string[]) {
    clearDist()

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

    fs.readdirSync(generatedDir).forEach((file) => {
      fs.unlinkSync(path.resolve(generatedDir, file))
    })
    fs.rmdirSync(generatedDir)

    clearUdmDist()
  }

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir)
  }

  // Find all .svelte files
  const svelteFiles = fs
    .readdirSync(widgetsDir)
    .filter((f) => f.endsWith(".svelte"))

  // Generate wrappers
  svelteFiles.forEach((file) => {
    const name = file.replace(/\.svelte$/, "")
    const sveltePath = `../${file}`
    const tsFilename = `${name}.ts`
    const tsFilePath = path.resolve(generatedDir, tsFilename)

    const tsContent = `import { mount } from "svelte"
import ${name} from "${sveltePath}"

export default function load(target: HTMLElement, props: any) {
  return mount(${name}, {
    target: target,
    props: props,
  })
}
`
    fs.writeFileSync(tsFilePath, tsContent, "utf-8")
  })

  buildAllWidgets(svelteFiles)
    .then(() => console.log("All widgets built!"))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
