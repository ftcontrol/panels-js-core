<script lang="ts">
  import type { Snippet } from "svelte"

  let { children }: { children?: Snippet } = $props()
</script>

<li>
  {@render children?.()}
</li>

<style>
  li {
    line-height: 1.6;
  }

  li :global(p) {
    margin: 0.25rem 0 0.35rem var(--padding);
  }
</style>
