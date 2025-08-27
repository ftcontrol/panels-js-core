<script lang="ts">
  import { onMount } from "svelte"
  import { unmount } from "svelte"
  import type { GlobalSocket } from "../socket/global.js"
  import type { PluginInfo } from "../types.js"
  let {
    globalSocket,
    info,
    id,
    loadFunction = (host, props) => {},
  }: {
    globalSocket: GlobalSocket
    info: PluginInfo
    id: string
    loadFunction: (host: HTMLElement, props: any) => any
  } = $props()

  let host: HTMLDivElement
  let instance: any

  onMount(() => {
    instance = loadFunction(host, {
      manager: globalSocket.pluginManagers[id],
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
    height: 100%;
  }
</style>
