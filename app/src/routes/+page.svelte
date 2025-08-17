<script lang="ts">
  import { onMount } from "svelte"
  import { mount, unmount } from "svelte"

  let counterHost: HTMLDivElement
  let counterHost2: HTMLDivElement

  let counterInstance: any
  let counterInstance2: any

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

  onMount(async () => {
    const { default: load } = await importFromSource("/build/out.js.mjs")

    counterInstance = load(counterHost, {})

    const { default: Component } = await importFromSource("/build/out3.js.mjs")

    counterInstance2 = mount(Component, {
      target: counterHost2,
      props: {},
    })

    return () => {
      unmount(counterInstance)
      unmount(counterInstance2)
    }
  })
</script>

<h1>Shadow DOM with Svelte Components</h1>

<div bind:this={counterHost} class="shadow-container"></div>
<div bind:this={counterHost2} class="shadow-container"></div>

<style>
  .shadow-container {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>
