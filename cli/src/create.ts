#!/usr/bin/env node
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"
import inquirer from "inquirer"
import { execa } from "execa" // Default import
import { replaceInFile } from "replace-in-file" // Use named importimport fetch from "node-fetch"
import { Command } from "commander"
import { DOMParser } from "xmldom"

// ======================
// Type Definitions
// ======================
type CreateOptions = {
  dir?: string
  autoremove?: boolean
  autoinstall?: boolean
  dev?: boolean
  package?: string
  sdkPath?: string
}

type Replacement = {
  files: string[]
  from: string | RegExp
  to: string
}

type MavenVersion = {
  version: string
  isSnapshot: boolean
}

type PromptType = "input" | "confirm"

// ======================
// Config Constants
// ======================
const DEFAULT_VERSION: string = "0.6.8"
const MAX_PACKAGE_LENGTH: number = 50
const MAVEN_API_URL: string =
  "https://raw.githubusercontent.com/lazarcloud/ftcontrol-maven/refs/heads/main/releases/com/bylazar/ftcontrol/maven-metadata-local.xml"
const RESERVED_DOMAIN: string = "com.bylazar"

// ======================
// Helper Functions
// ======================
const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

const prompt = async <T = string>(
  message: string,
  type: PromptType = "input"
): Promise<T> => {
  const { value } = await inquirer.prompt<{ value: T }>([
    {
      name: "value",
      message,
      type,
    },
  ])
  return value
}

const validatePackageName = (pkg: string): boolean | string => {
  const parts: string[] = pkg.split(".")

  if (parts.length !== 3) {
    return "Package name must have exactly two dots (e.g., com.example.myplugin)"
  }

  if (pkg.length > MAX_PACKAGE_LENGTH) {
    return `Package name must be shorter than ${MAX_PACKAGE_LENGTH} characters`
  }

  if (pkg.startsWith(RESERVED_DOMAIN)) {
    return `Please choose a different package prefix (${RESERVED_DOMAIN} is reserved)`
  }

  return true
}

// ======================
// Core Functionality
// ======================
const getLatestVersion = async (): Promise<string> => {
  try {
    const response = await fetch(MAVEN_API_URL)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "application/xml")

    const latestVersion = xmlDoc.querySelector("latest")?.textContent
    console.log(latestVersion)
    return latestVersion || DEFAULT_VERSION
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.warn(
      chalk.yellow(
        `⚠️  Using fallback version: ${DEFAULT_VERSION} (${message})`
      )
    )
    return DEFAULT_VERSION
  }
}

const copyTemplate = async (
  sourceDir: string,
  targetDir: string
): Promise<void> => {
  await fs.copy(sourceDir, targetDir)
  console.log(chalk.green(`✓ Copied template to ${targetDir}`))
}

const applyReplacements = async (
  targetDir: string,
  replacements: Replacement[]
): Promise<void> => {
  for (const rep of replacements) {
    const files: string[] = rep.files.map((file) => path.join(targetDir, file))

    try {
      const options = {
        files,
        from: rep.from,
        to: rep.to,
      }

      const results = await replaceInFile(options)
      console.log(
        chalk.green(`✓ Applied replacements in ${rep.files.join(", ")}`)
      )
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error"
      console.error(
        chalk.red(
          `✖ Replacement failed for ${rep.files.join(", ")}: ${message}`
        )
      )
    }
  }
}

const renamePackageDirs = async (
  projectDir: string,
  packageName: string
): Promise<void> => {
  console.log("Renaming", projectDir, packageName)
  const parts: string[] = packageName.split(".")
  const baseJavaPath: string = path.join(
    projectDir,
    "Plugin",
    "src",
    "main",
    "java"
  )

  // Create nested directory structure
  let currentPath: string = baseJavaPath
  for (const part of parts) {
    currentPath = path.join(currentPath, part)
    await fs.ensureDir(currentPath)
  }

  // Move source files
  const sourceDir: string = path.join(
    baseJavaPath,
    "com",
    "bylazar",
    "mylibrary"
  )
  await fs.move(sourceDir, currentPath, { overwrite: true })

  // Clean up empty directories
  await fs.remove(path.join(baseJavaPath, "com"))
  console.log(chalk.green(`✓ Package structure created for ${packageName}`))
}

const installDependencies = async (
  projectDir: string,
  isDevMode: boolean
): Promise<void> => {
  const webPath: string = path.join(projectDir, "Plugin", "web")

  try {
    console.log(chalk.blue("Installing dependencies..."))
    await execa("bun", ["install"], {
      cwd: webPath,
      stdio: "inherit",
    })

    var p = "ftc-panels"

    if (isDevMode) p = "link:ftc-panels"

    await execa("bun", ["add", p], {
      cwd: webPath,
      stdio: "inherit",
    })

    console.log(chalk.green("✓ Dependencies installed"))
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error(chalk.red(`✖ Dependency installation failed: ${message}`))
  }
}

// ======================
// Main Command
// ======================
const createProject = async (options: CreateOptions): Promise<void> => {
  try {
    // Validate and get target directory
    let targetDir: string =
      options.dir ||
      (await prompt<string>("Enter directory name for the new project"))
    targetDir = path.resolve(targetDir)

    // Handle existing directory
    if (await exists(targetDir)) {
      if (options.autoremove) {
        await fs.remove(targetDir)
        console.log(
          chalk.yellow("⚠️  Existing directory removed (autoremove=true)")
        )
      } else {
        const confirm: boolean = await prompt<boolean>(
          `Directory "${targetDir}" already exists. Overwrite?`,
          "confirm"
        )

        if (!confirm) {
          console.log(chalk.red("✖ Project creation aborted"))
          return
        }

        await fs.remove(targetDir)
        console.log(chalk.yellow("⚠️  Existing directory removed"))
      }
    }

    // Create project structure
    await fs.ensureDir(targetDir)
    const templateDir: string = path.join(__dirname, "../template")
    await copyTemplate(templateDir, targetDir)

    // Determine package name
    let packageName: string
    const isDevMode: boolean = !!options.dev

    if (isDevMode) {
      packageName = "com.bylazar.mylibrary"
    } else {
      packageName =
        options.package ||
        (await prompt<string>(
          "Enter package name (e.g., com.example.myplugin)"
        ))

      // Validate package name
      const validation = validatePackageName(packageName)
      if (validation !== true) {
        console.error(chalk.red(`✖ ${validation}`))
        return
      }
    }

    // Get library version
    const version: string = isDevMode ? "DEV" : await getLatestVersion()
    console.log(chalk.blue(`Using library version: ${version}`))

    // Configure replacements
    const replacements: Replacement[] = [
      {
        files: ["settings.gradle"],
        from: "<REPLACE>FTCONTROL_LINE1</REPLACE>",
        to: isDevMode
          ? `include ':Panels'\nproject(':Panels').projectDir = new File('${
              options.sdkPath ||
              "C:/Users/lazar/Documents/GitHub/ftcontrol-panels/library/Panels"
            }')`
          : "",
      },
      {
        files: ["build.dependencies.gradle"],
        from: "<REPLACE>FTCONTROL_LINE</REPLACE>",
        to: isDevMode
          ? "implementation project(':Panels')"
          : `implementation "com.bylazar:panels:${version}"`,
      },
      {
        files: [
          "Plugin/src/main/java/com/bylazar/mylibrary/MyClass.kt",
          "Plugin/src/main/java/com/bylazar/mylibrary/Something.kt",
          "Plugin/build.gradle",
          "TeamCode/src/main/java/org/firstinspires/ftc/teamcode/configs/Configs.kt",
          "Plugin/web/config.ts",
        ],
        from: "/<REPLACE>VERSION</REPLACE>/g",
        to: packageName,
      },
      {
        files: ["Plugin/web/config.ts"],
        from: "<REPLACE>PANELS</REPLACE>",
        to: version,
      },
    ]

    // Apply replacements
    await applyReplacements(targetDir, replacements)

    // Update package structure
    if (!isDevMode) await renamePackageDirs(targetDir, packageName)

    // Handle dependencies installation

    await installDependencies(targetDir, isDevMode)

    // Success message
    console.log(chalk.green.bold("\n✔ Project created successfully!"))
    console.log(chalk.blue("Next steps:"))
    console.log(`  cd ${path.relative(process.cwd(), targetDir)}`)
    console.log("  # Open in Android Studio to build")
    console.log("  # Configure your panels plugin\n")
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error(chalk.red("✖ Fatal error:"), message)
    process.exit(1)
  }
}

// ======================
// CLI Setup
// ======================
const program = new Command()

program
  .name("create-panels-plugin")
  .description("Scaffold a new FTC Panels plugin project")
  .argument("[directory]", "Project directory")
  .option("-a, --autoinstall", "Automatically install dependencies")
  .option("-r, --autoremove", "Automatically remove existing directory")
  .option("-d, --dev", "Setup for development mode")
  .option("-p, --package <name>", "Package name (com.example.myplugin)")
  .option(
    "-s, --sdk-path <path>",
    "Path to the Panels SDK lazarkit directory (used in dev mode)"
  )
  .action((directory: string, options: CreateOptions) => {
    options.dir = directory
    createProject(options)
  })

program.parse(process.argv)
