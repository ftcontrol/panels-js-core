<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import type { GlobalSocket } from "../socket/global"
  import { importFromSource } from "../socket/source"
  let {
    globalSocket,
    textContent,
    id,
  }: {
    globalSocket: GlobalSocket
    textContent: string
    id: string
  } = $props()

  let host: HTMLDivElement
  let instance: any

  onMount(async () => {
    const { default: load } = await importFromSource(textContent)

    instance = load(host, {
      manager: globalSocket.pluginManagers[id],
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
