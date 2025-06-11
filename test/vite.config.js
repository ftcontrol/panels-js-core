import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import path from "path"
import fs from "fs"
import { sveltePreprocess } from "svelte-preprocess"

// Find all .svelte files in widgets directory
const widgetFiles = fs
  .readdirSync("widgets")
  .filter((file) => file.endsWith(".svelte"))
  .map((file) => path.join("widgets", file))

// Create individual build entries
const buildEntries = widgetFiles.reduce((entries, file) => {
  const name = path.basename(file, ".svelte")
  entries[name] = file
  return entries
}, {})

export default defineConfig({
  build: {
    outDir: "public/build",
    emptyOutDir: false,
    rollupOptions: {
      input: buildEntries,
      output: {
        entryFileNames: "[name].js",
        format: "es",
        name: "[name]",
        globals: {
          "svelte/internal": "SvelteInternal", // Prevent externalizing Svelte
        },
      },
    },
  },
  plugins: [
    svelte({
      preprocess: [
        sveltePreprocess({
          typescript: true,
        }),
      ],
      compilerOptions: {
        css: "injected",
        customElement: false,
        dev: false,
      },
    }),
  ],
  resolve: {
    dedupe: ["svelte"],
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})
