<script lang="ts">
  import type { Snippet } from "svelte"

  let { children, href }: { children?: Snippet; href: string } = $props()
</script>

<a {href}>{@render children?.()}</a>
