<script lang="ts">
  import { type Snippet } from "svelte"
  import { type PluginConfig } from "../../../types"

  let {
    plugin,
    children,
    transparent = false,
    showIncludedPlugins = true,
  }: {
    plugin: PluginConfig
    children?: Snippet
    transparent: boolean
    showIncludedPlugins: boolean
  } = $props()

  function processWebsiteURL(url: string) {
    try {
      const parsed = new URL(url)
      return parsed.hostname
    } catch (e) {
      try {
        const parsed = new URL("http://" + url)
        return parsed.hostname
      } catch {
        return url
      }
    }
  }
</script>

<section class:filled={!transparent}>
  <p>{plugin.id}</p>
  <h2 class="docs-heading" data-level="h1">
    {plugin.name} v{plugin.version}
  </h2>
  <p>by {plugin.author}</p>
  {#if plugin.websiteURL}
    <a href={plugin.websiteURL}
      >Website: {processWebsiteURL(plugin.websiteURL)}</a
    >
  {:else}
    <a>No website</a>
  {/if}
  <br />
  {#if showIncludedPlugins && plugin.includedPluginsIDs && plugin.includedPluginsIDs.length > 0}
    <p>Included Plugins</p>
    {#each plugin.includedPluginsIDs as id}
      <p>{id}</p>
    {/each}
  {/if}
  <p>{plugin.description}</p>
  {@render children?.()}
</section>

<style>
  section {
    border-radius: 1rem;
  }

  section.filled {
    background-color: var(--bgLight);
    padding: var(--padding);
    margin-bottom: calc(var(--padding) / 2);
  }

  h2,
  p {
    margin: 0;
  }

  p,
  a {
    margin: 0.25rem;
  }
</style>
