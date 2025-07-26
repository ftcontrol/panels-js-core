<script lang="ts">
  import { Snippet } from "svelte"

  let { children }: { children?: Snippet } = $props()
</script>

<p>{@render children?.()}</p>
