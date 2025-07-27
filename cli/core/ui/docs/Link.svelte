<script lang="ts">
  import { Snippet } from "svelte"

  let { children, href }: { children?: Snippet; href: string } = $props()
</script>

<a {href}>{@render children?.()}</a>
