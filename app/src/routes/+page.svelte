<script>
  import { onMount, onDestroy, tick } from "svelte"

  export let name = "Counter"
  export let config = {}

  let component
  let target

  $: if (name) {
    loadComponent()
      .then((f) => {})
      .catch((x) => console.warn(x.message))
  }

  onMount(async function () {
    console.log("svelte widget mounted")
  })

  onDestroy(cleanup)

  async function cleanup() {
    if (component) {
      console.log("cleaning up svelte widget")
      component.$destroy()
      component = null
      await tick()
    }
  }

  async function loadComponent() {
    await cleanup()
    let url = `/build/${name}.js?${parseInt(Math.random() * 1000000)}`
    let comp = await import(url)
    component = new comp.default({
      target: target,
      props: config.props || {},
    })
    console.log("loading svelte widget component:", url)
  }
</script>

<div bind:this={target} class="svelte-widget-wrapper"></div>
