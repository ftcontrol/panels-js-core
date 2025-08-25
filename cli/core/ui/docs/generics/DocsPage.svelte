<script lang="ts">
  import { type Snippet } from "svelte"
  import Toggle from "../../Toggle.svelte"
  import Arrow from "../../Arrow.svelte"
  import { type PluginConfig } from "../../../types"
  import HeadingsOverlay from "./HeadingsOverlay.svelte"
  import Button from "../../Button.svelte"

  let {
    plugins,
    skippedPlugins = [],
    children,
  }: {
    plugins: PluginConfig[]
    skippedPlugins?: PluginConfig[]
    children?: Snippet
  } = $props()

  let orderedPlugins = $derived.by(() => {
    const docsPlugin = plugins.find((it) => it.id === "com.bylazar.docs")
    const panelsPlugin = plugins.find((it) => it.id === "com.bylazar.panels")
    const jsCorePlugin = plugins.find(
      (it) => it.id === "com.bylazar.pluginsjscore"
    )
    const otherPlugins = plugins.filter(
      (it) =>
        ![
          "com.bylazar.docs",
          "com.bylazar.panels",
          "com.bylazar.pluginsjscore",
        ].includes(it.id)
    )

    const data = [...otherPlugins.sort((a, b) => a.name.localeCompare(b.name))]

    if (jsCorePlugin) data.push(jsCorePlugin)
    if (panelsPlugin) data.push(panelsPlugin)
    if (docsPlugin)
      data.push({
        ...docsPlugin,
        name: "Core",
      })

    return data
  })

  let isOpened = $state(false)
</script>

<button
  class="bg"
  class:isOpened
  aria-label="Close Navbar"
  onclick={() => {
    isOpened = false
  }}
></button>

<section>
  <div class="button nav" class:isOpened>
    <Button
      onclick={() => {
        isOpened = !isOpened
      }}>Content</Button
    >
  </div>
  <nav class:isOpened>
    {#each orderedPlugins as plugin}
      <Toggle defaultOpen={plugin.id === "com.bylazar.docs"}>
        {#snippet trigger({ isOpen })}
          <p>
            {plugin.name}
            <Arrow {isOpen} />
          </p>
        {/snippet}
        {#snippet content({ close })}
          <div class="item">
            {#if (plugin.components || []).filter((it) => it.type === "docs").length == 0}
              <a
                onclick={() => {
                  isOpened = false
                }}
                href={`/docs/${plugin.id}`}>Overview</a
              >
            {:else}
              {#each (plugin.components || []).filter((it) => it.type === "docs") as c, index}
                <a
                  onclick={() => {
                    isOpened = false
                  }}
                  href={index == 0
                    ? `/docs/${plugin.id}`
                    : `/docs/${plugin.id}/${c.id}`}>{c.id}</a
                >
              {/each}
            {/if}
          </div>
        {/snippet}
      </Toggle>
      <div class="divider"></div>
    {/each}
    {#each skippedPlugins as plugin}
      <p class="disabled">{plugin.name}</p>
    {/each}
  </nav>
  <div class="content">
    <HeadingsOverlay />
    {@render children?.()}
  </div>
</section>

<style>
  section {
    display: flex;
    gap: calc(var(--padding) / 2);
    margin: 0.5rem;
    overflow-y: auto;
    height: 100%;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--padding);
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    margin-bottom: 0.25rem;
  }

  nav {
    padding: var(--padding);
    overflow-y: auto;
    background-color: var(--bgMedium);
    border-radius: 1rem;
    min-width: 200px;
  }

  .content {
    background-color: var(--bgMedium);
    border-radius: 1rem;
    padding: var(--padding);
    width: 100%;
    overflow-y: auto;
  }

  p.disabled {
    opacity: 0.5;
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: currentColor;
    margin-block: 1rem;
    opacity: 0.5;
  }

  .button.nav {
    display: none;
    position: fixed;
    z-index: 100;
    right: calc(var(--padding) / 1);
    bottom: calc(var(--padding) / 1);
  }

  button.bg {
    all: unset;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bgDark);
    opacity: 0;
    cursor: pointer;
    z-index: 99;
    transition: opacity 0.5s;
    pointer-events: none;
  }

  @media only screen and (max-width: 900px) {
    nav {
      position: fixed;
      top: calc(var(--padding) / 2);
      left: calc(var(--padding) / 2);
      bottom: calc(var(--padding) / 2);
      transform: translateX(-120%);
      transition: transform 0.5s;
      height: calc(100% - var(--padding));
      z-index: 100;
    }

    nav.isOpened {
      transform: translateX(0);
    }

    .button.nav {
      display: block;
      transform: translateX(0);
      transition: transform 0.5s;
    }
    .button.nav.isOpened {
      transform: translateX(150%);
    }

    button.bg {
      display: block;
    }
    button.bg.isOpened {
      opacity: 0.5;
      pointer-events: all;
    }
  }
</style>
