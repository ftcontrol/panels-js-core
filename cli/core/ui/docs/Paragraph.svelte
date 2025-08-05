<script lang="ts">
  import { Snippet } from "svelte"

  let { children }: { children?: Snippet } = $props()
</script>

<p>{@render children?.()}</p>

<style>
  p {
    width: 100%;
    max-width: 500px;
    text-align: justify;
  }
</style>
