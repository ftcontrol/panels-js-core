import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs"
import path from "path"
import type { PluginConfig } from "../core/types"
import { checkPlugin } from "./check"
import { execSync } from "child_process"

export async function buildPanelsPlugin(dir: string, minify = true): Promise<PluginConfig> {
  const generatedDir = path.resolve(dir, ".panels")
  const distDir = path.resolve(dir, "dist")
  const distWidgetsDir = path.resolve(dir, "dist/widgets")
  const distDocsDir = path.resolve(dir, "dist/docs")
  const distNavletsDir = path.resolve(dir, "dist/navlets")

  function findGradleRoot(startDir: string): string | null {
    let dir = path.resolve(startDir)

    while (true) {
      const gradlewPath = path.join(
        dir,
        process.platform === "win32" ? "gradlew.bat" : "gradlew"
      )

      if (fs.existsSync(gradlewPath)) {
        return dir
      }

      const parentDir = path.dirname(dir)
      if (parentDir === dir) {
        return null
      }

      dir = parentDir
    }
  }

  function findAndroidStudioJDK(): string | null {
    const paths = [
      "C:\\Program Files\\Android\\Android Studio\\jbr",
      "C:\\Program Files\\Android\\Android Studio\\jdk",
    ]
    for (const p of paths) {
      if (fs.existsSync(p)) return p
    }
    return null
  }

  function syncGradle(startDir: string) {
    const gradleRoot = findGradleRoot(startDir)
    if (!gradleRoot) throw new Error("No gradlew file found.")

    const gradleCommand =
      process.platform === "win32" ? "gradlew.bat" : "./gradlew"
    const jdkPath = findAndroidStudioJDK()

    if (!jdkPath) throw new Error("Android Studio JDK not found.")

    console.log("Found JDK in", jdkPath)
    console.log("Running Gradle sync in", gradleRoot)

    const env = {
      ...process.env,
      JAVA_HOME: jdkPath,
      PATH: `${path.join(jdkPath, "bin")};${process.env.PATH}`,
    }

    execSync(`${gradleCommand} --refresh-dependencies --no-daemon`, {
      cwd: gradleRoot,
      stdio: "inherit",
      env,
    })
  }

  clearDist()

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir)
  }

  const configPath = path.resolve(dir, "config.ts")
  const module = await import(/* @vite-ignore */ configPath)
  const config = module.config as PluginConfig

  const isValid = await checkPlugin(dir)
  if (!isValid) {
    console.log("Plugin is not valid.")
    return config
  }

  console.log(config)

  function writeConfigJsonToDist(config: PluginConfig) {
    let c = config
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true })
    }
    let jsonPath = path.resolve(distDir, "config.json")
    fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2), "utf-8")

    c.manager.textContent = ""
    for(const item of c.widgets){
      item.textContent = ""
    }
    for(const item of c.navlets){
      item.textContent = ""
    }
    c.docs.homepage.textContent = ""
    for(const item of c.docs.chapters){
      item.textContent = ""
    }

    jsonPath = path.resolve(distDir, "simple_config.json")
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

  function clearGeneratedPanelsDir() {
    if (fs.existsSync(generatedDir)) {
      fs.readdirSync(generatedDir).forEach((file) => {
        const filePath = path.join(generatedDir, file)
        if (fs.lstatSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
        }
      })
    }
  }

  function clearUmdDist() {
    const clearUmdFilesInDir = (dirPath: string) => {
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
          const filePath = path.join(dirPath, file)
          if (
            !fs.lstatSync(filePath).isDirectory() &&
            file.endsWith(".umd.cjs")
          ) {
            fs.unlinkSync(filePath)
          }
        })
      }
    }
    clearUmdFilesInDir(distWidgetsDir)
    clearUmdFilesInDir(distDocsDir)
    clearUmdFilesInDir(distNavletsDir)
    clearUmdFilesInDir(distDir)
  }

  function injectFileContents(config: PluginConfig, baseDir: string) {
    const readContent = (filepath: string): string => {
      const fullPath = path.resolve(baseDir, filepath)
      return fs.readFileSync(fullPath, "utf-8")
    }

    config.widgets = config.widgets.map((w) => ({
      ...w,
      textContent: readContent(`dist/widgets/${w.name}.js`),
    }))

    config.navlets =
      config.navlets?.map((n) => ({
        ...n,
        textContent: readContent(`dist/navlets/${n.name}.js`),
      })) ?? []

    config.manager = {
      ...config.manager,
      textContent: readContent(`dist/${config.manager.name}.js`),
    }

    config.docs = {
      homepage: {
        ...config.docs.homepage,
        textContent: readContent(`dist/docs/${config.docs.homepage.name}.js`),
      },
      chapters: config.docs.chapters.map((chapter) => ({
        ...chapter,
        textContent: readContent(`dist/docs/${chapter.name}.js`),
      })),
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

  async function buildAllComponents(names: string[], outputSubfolder: string) {
    for (const name of names) {
      const entryPath = path.resolve(generatedDir, `${name}.ts`)

      console.log(`Building component: ${name} into ${outputSubfolder}`)

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
            fileName: `${outputSubfolder}/${name}`,
          },
          rollupOptions: {
            external: [],
            output: {
              globals: {},
            },
          },
          minify: minify,
          emptyOutDir: false,
        },
      })
    }
  }

  config.widgets.forEach(({ name, filepath }) => {
    createTsWrapper(name, filepath)
  })

  config.navlets.forEach(({ name, filepath }) => {
    createTsWrapper(name, filepath)
  })

  createTsWrapper(config.docs.homepage.name, config.docs.homepage.filepath)

  config.docs.chapters.forEach(({ name, filepath }) => {
    createTsWrapper(name, filepath)
  })

  try {
    clearDist()

    await buildAllComponents(
      config.widgets.map((w) => w.name),
      "widgets"
    )

    if (config.navlets.length > 0) {
      await buildAllComponents(
        config.navlets.map((n) => n.name),
        "navlets"
      )
    }

    if (config.docs.homepage) {
      await buildAllComponents([config.docs.homepage.name], "docs")
    }

    if (config.docs.chapters.length > 0) {
      await buildAllComponents(
        config.docs.chapters.map((c) => c.name),
        "docs"
      )
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
        minify: minify,
        emptyOutDir: false,
      },
    })

    clearGeneratedPanelsDir()

    clearUmdDist()

    injectFileContents(config, dir)

    clearDist()
    writeConfigJsonToDist(config)

    console.log("All components built!")
  } catch (err) {
    console.error(err)
    throw err
  }

  return config
}
