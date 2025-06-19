#!/usr/bin/env node
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get project name from CLI arguments
const [projectName] = process.argv.slice(2)
if (!projectName) {
  console.error(chalk.red("✖ Please specify a project name:"))
  console.log(
    `  ${chalk.cyan("bunx create panels-plugin@latest")} ${chalk.green(
      "<project-directory>"
    )}`
  )
  process.exit(1)
}

const templateDir = path.join(__dirname, "../template")
const targetDir = path.join(process.cwd(), projectName)

// Create project directory
try {
  await fs.ensureDir(targetDir)
  await fs.copy(templateDir, targetDir)

  console.log(
    chalk.green(`✔ Success! Created project at ${chalk.cyan(targetDir)}`)
  )
  console.log("\nNext steps:")
  console.log(`  ${chalk.cyan(`cd ${projectName}`)}`)
  console.log(`  ${chalk.cyan("npm install")}`)
  console.log(`  ${chalk.cyan("npm run dev")}\n`)
} catch (error) {
  console.error(chalk.red("✖ Error creating project:"), error.message)
  process.exit(1)
}
