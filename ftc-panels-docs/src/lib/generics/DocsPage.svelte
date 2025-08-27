<script lang="ts">
  import { Arrow, Button, Toggle, type PluginConfig } from "ftc-panels"
  import { onMount, type Snippet } from "svelte"
  import NavbarIcon from "./icons/NavbarIcon.svelte"
  import HeadingsOverlay from "./HeadingsOverlay.svelte"
  import { Separator } from "ftc-panels/docs"
  import BackIcon from "./icons/BackIcon.svelte"
  import ForwardIcon from "./icons/ForwardIcon.svelte"
  import Credits from "./Credits.svelte"

  let {
    plugins,
    skippedPlugins = [],
    url = $bindable(),
    children,
  }: {
    plugins: PluginConfig[]
    skippedPlugins?: PluginConfig[]
    url: string
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

    const data = []

    if (docsPlugin)
      data.push({
        ...docsPlugin,
        name: "Core",
      })
    if (jsCorePlugin) data.push(jsCorePlugin)
    if (panelsPlugin) data.push(panelsPlugin)

    otherPlugins
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((it) => {
        data.push(it)
      })

    return data
  })

  let isOpened = $state(false)

  function parseFromUrl(u: string) {
    const m = u?.match(/\/docs\/([^/]+)(?:\/([^/]+))?/)
    return {
      activePluginId: m?.[1] ? decodeURIComponent(m[1]) : null,
      activeChildId: m?.[2] ? decodeURIComponent(m[2]) : null,
    }
  }

  let active = $derived(parseFromUrl(url))

  function pagesFor(plugin: PluginConfig) {
    const docs = (plugin.components || []).filter((c) => c.type === "docs")
    if (docs.length == 0) {
      return [
        {
          pageId: null as string | null,
          label: "Overview",
          href: `/docs/${plugin.id}`,
        },
      ]
    }
    return docs.map((c) => ({
      pageId: c.id as string,
      label: c.id,
      href: `/docs/${plugin.id}/${c.id}`,
    }))
  }

  let pager = $derived.by(() => {
    const pi = orderedPlugins.findIndex((p) => p.id === active.activePluginId)
    if (pi === -1) return { prev: null, next: null }

    const plugin = orderedPlugins[pi]
    const pages = pagesFor(plugin)

    const pageIndex = Math.max(
      0,
      pages.findIndex((pg) => pg.pageId === (active.activeChildId ?? null))
    )

    let prev = null
    if (pageIndex > 0) {
      const tgt = pages[pageIndex - 1]
      prev = {
        pluginId: plugin.id,
        pluginName: plugin.name,
        pageId: tgt.pageId,
        pageLabel: tgt.label,
        href: tgt.href,
      }
    } else if (pi > 0) {
      const prevPlugin = orderedPlugins[pi - 1]
      const prevPages = pagesFor(prevPlugin)
      const tgt = prevPages[prevPages.length - 1]
      prev = {
        pluginId: prevPlugin.id,
        pluginName: prevPlugin.name,
        pageId: tgt.pageId,
        pageLabel: tgt.label,
        href: tgt.href,
      }
    }

    let next = null
    if (pageIndex < pages.length - 1) {
      const tgt = pages[pageIndex + 1]
      next = {
        pluginId: plugin.id,
        pluginName: plugin.name,
        pageId: tgt.pageId,
        pageLabel: tgt.label,
        href: tgt.href,
      }
    } else if (pi < orderedPlugins.length - 1) {
      const nextPlugin = orderedPlugins[pi + 1]
      const nextPages = pagesFor(nextPlugin)
      const tgt = nextPages[0]
      next = {
        pluginId: nextPlugin.id,
        pluginName: nextPlugin.name,
        pageId: tgt.pageId,
        pageLabel: tgt.label,
        href: tgt.href,
      }
    }

    return { prev, next }
  })

  function isActive(plugin: string | null, section: string | null) {
    return active.activePluginId == plugin && active.activeChildId == section
  }
  function isActiveFirst(plugin: string | null, section: string | null) {
    return isActive(plugin, section) || isActive(plugin, null)
  }
  onMount(() => {
    if (!isActive(null, null)) return

    const first = orderedPlugins[0]
    if (first == undefined) return

    window.location.href = `/docs/${first.id}`
  })
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
      style="padding: 1rem;"
      onclick={() => {
        isOpened = !isOpened
      }}
    >
      <NavbarIcon />
    </Button>
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
                class:active={isActiveFirst(plugin.id, "Overview")}
                href={`/docs/${plugin.id}`}>Overview</a
              >
            {:else}
              {#each (plugin.components || []).filter((it) => it.type === "docs") as c, index}
                <a
                  onclick={() => {
                    isOpened = false
                  }}
                  class:active={index == 0
                    ? isActiveFirst(plugin.id, c.id)
                    : isActive(plugin.id, c.id)}
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
    <div class="main">
      {@render children?.()}
    </div>

    <footer>
      <Separator />

      <div class="pager">
        {#if pager.prev}
          <a href={pager.prev.href}>
            <BackIcon />{pager.prev.pluginName}
            <span>{pager.prev.pageLabel}</span>
          </a>
        {/if}
        {#if pager.next}
          <a href={pager.next.href}>
            {pager.next.pluginName}
            <span>{pager.next.pageLabel}</span><ForwardIcon />
          </a>
        {/if}
      </div>

      <Credits />
    </footer>
  </div>
</section>

<style>
  .pager {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .pager > a {
    text-decoration: none;
    padding: 0.5em;
    border: 1px solid currentColor;
  }
  .pager > a > span {
    font-weight: 600;
  }
  section {
    display: flex;
    gap: calc(var(--padding) / 2);
    margin: 0.5rem;
    overflow-y: auto;
    height: 100%;
  }

  .main {
    flex-grow: 1;
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
    display: flex;
    gap: 0.5rem;
    align-items: center;
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
    position: relative;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
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

  .active {
    text-decoration: underline;
  }

  @media only screen and (max-width: 900px) {
    nav {
      position: fixed;
      top: calc(var(--padding) / 2);
      right: calc(var(--padding) / 2);
      bottom: calc(var(--padding) / 2);
      transform: translateX(120%);
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
