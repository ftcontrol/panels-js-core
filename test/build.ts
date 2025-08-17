import { build } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

await build({
  plugins: [
    svelte({
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: "wrapper.ts",
      name: "Component",
      fileName: `out.js`,
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
    emptyOutDir: true,
  },
})
