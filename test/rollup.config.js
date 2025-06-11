import svelte from "rollup-plugin-svelte"
import css from "rollup-plugin-css-only"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { sveltePreprocess } from "svelte-preprocess"
import fs from "fs"
import { resolve } from "path"

const widgetFiles = fs
  .readdirSync("./widgets")
  .filter((f) => f.endsWith(".svelte"))

export default widgetFiles.map((file) => {
  const name = file.replace(".svelte", "")

  return {
    input: resolve("widgets", file),
    output: {
      file: `build/${name}.js`,
      format: "iife",
      name,
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ typescript: true }),
        emitCss: true,
      }),
      css({ output: `${name}.css` }),
      nodeResolve({ browser: true, dedupe: ["svelte"] }),
      commonjs(),
    ],
  }
})
