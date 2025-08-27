<script lang="ts">
  import { type Snippet } from "svelte"

  let {
    start = 1,
    type = "1",
    dense = false,
    children,
  }: {
    start?: any
    type?: "1" | "a" | "A" | "i" | "I"
    dense?: boolean
    children?: Snippet
  } = $props()
</script>

<ol {start} {type} class:dense>
  {@render children?.()}
</ol>

<style>
  ol {
    margin: 0.75rem 0 0.75rem 1.25rem;
    padding-left: 1rem;
  }

  ol.dense {
    margin: 0.25rem 0 0.25rem 1.25rem;
  }

  ol :global(li) {
    margin: 0.35rem 0;
  }
</style>
