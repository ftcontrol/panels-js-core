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

await build({
  plugins: [
    svelte({
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: "Main.svelte",
      name: "Component",
      fileName: `out2.js`,
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

await build({
  plugins: [
    svelte({
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: "wrapper2.ts",
      name: "Component",
      fileName: `out3.js`,
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

await build({
  plugins: [
    svelte({
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: "Main.svelte",
      name: "Component",
      fileName: `out3.js`,
    },
    rollupOptions: {
      external: ["svelte"],
      output: {
        globals: {},
      },
    },
    minify: false,
    emptyOutDir: false,
  },
})
