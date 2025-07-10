<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import type { GlobalSocket } from "../socket/global"
  import { PluginSocket } from "../socket/plugin"
  import { PluginManager } from "../socket/manager"
  import { importFromSource } from ".."
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

    const shadow = host.attachShadow({ mode: "open" })
    const target = document.createElement("div")
    shadow.appendChild(target)
    instance = load(target, {
      manager: globalSocket.pluginManagers[id],
    })

    return () => {
      unmount(instance)
    }
  })
</script>

<div bind:this={host} class="shadow-container"></div>

<style>
  .shadow-container {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>
