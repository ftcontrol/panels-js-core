<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import type { GlobalSocket } from "../socket/global"
  import { PluginSocket } from "../socket/plugin"
  let {
    globalSocket,
    id,
    file,
  }: {
    globalSocket: GlobalSocket
    id: string
    file: string
  } = $props()

  let host: HTMLDivElement
  let instance: any

  async function importFromSource(url: string) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
    const source = await response.text()
    const blob = new Blob([source], { type: "text/javascript" })
    const blobUrl = URL.createObjectURL(blob)
    const module = await import(blobUrl)
    URL.revokeObjectURL(blobUrl)
    return module
  }

  onMount(async () => {
    var pluginsSocket = new PluginSocket(id, globalSocket)
    const { default: load } = await importFromSource(
      `/plugins/${id}/widgets/${file}.js`
    )

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
