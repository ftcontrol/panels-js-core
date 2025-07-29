<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import { importFromSource } from "../socket/source"
  import type { PluginConfig, PluginInfo } from "../types"
  let {
    info,
    textContent,
  }: {
    info: PluginConfig
    textContent: string
  } = $props()

  let host: HTMLDivElement
  let instance: any

  onMount(async () => {
    const { default: load } = await importFromSource(textContent)

    instance = load(host, {
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
    display: inline-block;
    max-height: 100%;
  }
</style>
