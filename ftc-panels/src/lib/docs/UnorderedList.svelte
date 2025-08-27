<script lang="ts">
  import { type Snippet } from "svelte"

  let {
    dense = false,
    children,
  }: {
    dense?: boolean
    children?: Snippet
  } = $props()
</script>

<ul class:dense>
  {@render children?.()}
</ul>

<style>
  ul {
    list-style: disc;
    margin: 0.75rem 0 0.75rem 1.25rem;
    padding-left: 1rem;
  }

  ul.dense {
    margin: 0.25rem 0 0.25rem 1.25rem;
  }

  ul :global(li) {
    margin: 0.35rem 0;
  }
</style>
