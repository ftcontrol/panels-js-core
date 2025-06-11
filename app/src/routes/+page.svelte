<script lang="ts">
  import { embedMultiple } from "svelte-standalone"
  import { onMount } from "svelte"

  const mountWidget = async (name, target, props = {}) => {
    const url = `/build/${name}.js?cacheBust=${Date.now()}`

    try {
      const mod = await import(url)
      console.log(window)

      const instance = window.test.start(
        {
          /* props */
        },
        "counter"
      )

      return instance
    } catch (err) {
      console.error(`❌ Failed to load widget ${name}:`, err)
      return null
    }
  }

  onMount(async () => {
    mountWidget("Counter", document.getElementById("counter"))
  })
</script>

<div id="counter"></div>

<style>
  div {
    background-color: red;
  }
</style>
