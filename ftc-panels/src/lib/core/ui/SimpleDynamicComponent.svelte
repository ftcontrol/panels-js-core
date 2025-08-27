<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import type { PluginConfig, PluginInfo } from "../types.js"

  let {
    info,
    loadFunction = (host, props) => {},
  }: {
    info: PluginConfig
    loadFunction: (host: HTMLElement, props: any) => any
  } = $props()

  let host: HTMLDivElement
  let instance: any

  onMount(() => {
    instance = loadFunction(host, {
      info: info,
    })

    return () => {
      unmount(instance)
    }
  })
</script>

<div bind:this={host}></div>

<style>
  div {
    background-color: transparent;
    min-width: 100%;
    display: block;
    max-height: 100%;
  }
</style>
