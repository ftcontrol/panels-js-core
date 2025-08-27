<script lang="ts">
  import type { Snippet } from "svelte"

  let { code = "", children }: { code?: string; children?: Snippet } = $props()
</script>

<code>
  {#if code}{code}{:else}
    {@render children?.()}
  {/if}
</code>

<style>
  code {
    border: 1px solid currentColor;
    padding: 0.08rem 0.3rem;
    border-radius: 0.25rem;
  }
</style>
