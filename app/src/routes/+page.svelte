<script lang="ts">
  import { onMount } from "svelte"
  import { mount, unmount } from "svelte"

  let counterHost: HTMLDivElement

  let counterInstance: any

  function injectCSS(shadowRoot: ShadowRoot, href: string) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    shadowRoot.appendChild(link)
  }

  async function importFromSource(url: string) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
    const source = await response.text()

    // Create a Blob with JS MIME type
    const blob = new Blob([source], { type: "text/javascript" })

    // Create a blob URL
    const blobUrl = URL.createObjectURL(blob)

    // Import the module from the blob URL
    const module = await import(blobUrl)

    // Revoke the blob URL to free memory
    URL.revokeObjectURL(blobUrl)

    return module
  }

  import { GlobalSocket } from "ftc-panels/src/core/socket/global"
  import { PluginSocket } from "ftc-panels/src/core/socket/plugin"

  var globalSocket = new GlobalSocket()

  onMount(async () => {
    globalSocket.init()
    var pluginsSocket = new PluginSocket("core", globalSocket)
    const { default: load } = await importFromSource("/build/counter2.js")

    const shadow2 = counterHost.attachShadow({ mode: "open" })
    const target2 = document.createElement("div")
    shadow2.appendChild(target2)
    injectCSS(shadow2, "/build/op-modes.css")

    counterInstance = load(target2, {
      socket: pluginsSocket,
    })

    return () => {
      unmount(counterInstance)
    }
  })
</script>

<h1>Shadow DOM with Svelte Components</h1>

<div bind:this={counterHost} class="shadow-container"></div>

<style>
  .shadow-container {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>
