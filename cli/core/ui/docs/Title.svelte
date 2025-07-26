<script lang="ts">
  import { Snippet } from "svelte"

  let { children }: { children?: Snippet } = $props()
</script>

<h1>{@render children?.()}</h1>
