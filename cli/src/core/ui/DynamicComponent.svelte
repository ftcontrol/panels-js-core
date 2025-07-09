<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import type { GlobalSocket } from "../socket/global"
  import { PluginSocket } from "../socket/plugin"
  let {
    isDev = false,
    globalSocket,
    textContent,
    id,
  }: {
    isDev: boolean
    globalSocket: GlobalSocket
    textContent: string
    id: string
  } = $props()

  let host: HTMLDivElement
  let instance: any

  async function importFromSource(textContent: string) {
    const blob = new Blob([textContent], { type: "text/javascript" })
    const blobUrl = URL.createObjectURL(blob)
    const module = await import(blobUrl)
    URL.revokeObjectURL(blobUrl)
    return module
  }

  onMount(async () => {
    var pluginsSocket = new PluginSocket(id, globalSocket)
    const { default: load } = await importFromSource(textContent)

    const shadow = host.attachShadow({ mode: "open" })
    const target = document.createElement("div")
    shadow.appendChild(target)
    instance = load(target, {
      socket: pluginsSocket,
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
