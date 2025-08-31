<script lang="ts">
  import { Button, Toggle, type PluginConfig } from "ftc-panels"
  import { onMount, type Snippet } from "svelte"
  import NavbarIcon from "./icons/NavbarIcon.svelte"
  import HeadingsOverlay from "./HeadingsOverlay.svelte"
  import { Separator } from "ftc-panels/docs"
  import BackIcon from "./icons/BackIcon.svelte"
  import ForwardIcon from "./icons/ForwardIcon.svelte"
  import Credits from "./Credits.svelte"
  import Arrow from "./icons/Arrow.svelte"

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

  const ordering = $derived.by(() => {
    let baseDocsPlugin: PluginConfig | null = null
    const corePlugins: PluginConfig[] = []
    const extraPlugins: PluginConfig[] = []

    for (const p of plugins) {
      const docs = (p.components || []).filter((c) => c.type === "docs")
      if (p.id === "com.bylazar.docs") {
        baseDocsPlugin = p
        continue
      }
      console.log(p.id, p.components, docs)
      if (p.id.startsWith("com.bylazar") && docs.length === 1) {
        corePlugins.push(p)
      } else {
        extraPlugins.push(p)
      }
    }

    corePlugins.sort((a, b) => a.name.localeCompare(b.name))
    extraPlugins.sort((a, b) => a.name.localeCompare(b.name))

    const orderedList: PluginConfig[] = [
      ...(baseDocsPlugin ? [baseDocsPlugin] : []),
      ...corePlugins,
      ...extraPlugins,
    ]

    const coreSingleDocIds = new Set(corePlugins.map((p) => p.id))

    console.log("corePlugins", corePlugins)
    console.log("coreSingleDocIds", coreSingleDocIds)

    return {
      baseDocsPlugin,
      corePlugins,
      extraPlugins,
      orderedList,
      coreSingleDocIds,
    }
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

  type Page = {
    pageId: string | null
    label: string
    href: string
    firstHref: string
  }

  function pagesFor(plugin: PluginConfig): Page[] {
    const docs = (plugin.components || []).filter((c) => c.type === "docs")

    if (ordering.coreSingleDocIds.has(plugin.id)) {
      if (docs.length === 1) {
        const only = docs[0]
        return [
          {
            pageId: only.id as string,
            label: plugin.name,
            href: `/docs/${plugin.id}/${only.id}`,
            firstHref: `/docs/${plugin.id}`,
          },
        ]
      }
      return [
        {
          pageId: null,
          label: plugin.name,
          href: `/docs/${plugin.id}`,
          firstHref: `/docs/${plugin.id}`,
        },
      ]
    }

    if (docs.length === 0) {
      return [
        {
          pageId: null,
          label: "Overview",
          href: `/docs/${plugin.id}`,
          firstHref: `/docs/${plugin.id}`,
        },
      ]
    }

    return docs.map((c, idx) => ({
      pageId: c.id as string,
      label: c.id as string,
      href: `/docs/${plugin.id}/${c.id}`,
      firstHref:
        idx === 0 ? `/docs/${plugin.id}` : `/docs/${plugin.id}/${c.id}`,
    }))
  }

  let pager = $derived.by(() => {
    const list = ordering.orderedList
    const pi = list.findIndex((p) => p.id === active.activePluginId)
    if (pi === -1) return { prev: null, next: null }

    const plugin = list[pi]
    const pages = pagesFor(plugin)

    const pageIndex = Math.max(
      0,
      pages.findIndex((pg) => pg.pageId === (active.activeChildId ?? null))
    )

    function makeTarget(
      pluginObj: PluginConfig,
      pluginPages: Page[],
      targetIndex: number
    ) {
      const tgt = pluginPages[targetIndex]
      const isFirst = targetIndex === 0
      return {
        pluginId: pluginObj.id,
        pluginName: pluginObj.name,
        pageId: tgt.pageId,
        pageLabel: tgt.label,
        href: isFirst ? tgt.firstHref : tgt.href,
        isFirstPageOfPlugin: isFirst,
      }
    }

    let prev = null
    if (pageIndex > 0) {
      prev = makeTarget(plugin, pages, pageIndex - 1)
    } else if (pi > 0) {
      const prevPlugin = list[pi - 1]
      const prevPages = pagesFor(prevPlugin)
      prev = makeTarget(prevPlugin, prevPages, prevPages.length - 1)
    }

    let next = null
    if (pageIndex < pages.length - 1) {
      next = makeTarget(plugin, pages, pageIndex + 1)
    } else if (pi < list.length - 1) {
      const nextPlugin = list[pi + 1]
      const nextPages = pagesFor(nextPlugin)
      next = makeTarget(nextPlugin, nextPages, 0)
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
    const first = ordering.orderedList[0]
    if (!first) return
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
    {#if ordering.baseDocsPlugin != null}
      <Toggle defaultOpen={true}>
        {#snippet trigger({ isOpen })}
          <p>
            Core Panels
            <Arrow {isOpen} />
          </p>
        {/snippet}
        {#snippet content()}
          <div class="item">
            {#if (ordering.baseDocsPlugin.components || []).filter((it) => it.type === "docs").length === 0}
              <a
                onclick={() => (isOpened = false)}
                class:active={isActiveFirst(ordering.baseDocsPlugin.id, null)}
                href={`/docs/${ordering.baseDocsPlugin.id}`}>Overview</a
              >
            {:else}
              {#each (ordering.baseDocsPlugin.components || []).filter((it) => it.type === "docs") as c, index}
                <a
                  onclick={() => (isOpened = false)}
                  class:active={index === 0
                    ? isActiveFirst(ordering.baseDocsPlugin.id, c.id as string)
                    : isActive(ordering.baseDocsPlugin.id, c.id as string)}
                  href={index === 0
                    ? `/docs/${ordering.baseDocsPlugin.id}`
                    : `/docs/${ordering.baseDocsPlugin.id}/${c.id}`}>{c.id}</a
                >
              {/each}
            {/if}
          </div>
        {/snippet}
      </Toggle>
      <div class="divider"></div>
    {/if}

    {#if ordering.coreSingleDocIds.size > 0}
      <Toggle>
        {#snippet trigger({ isOpen })}
          <p>
            Core Plugins
            <Arrow {isOpen} />
          </p>
        {/snippet}
        {#snippet content()}
          {#each ordering.corePlugins as plugin}
            <div class="item">
              {#each pagesFor(plugin) as pg, index}
                <a
                  onclick={() => (isOpened = false)}
                  class:active={index === 0
                    ? isActiveFirst(plugin.id, pg.pageId)
                    : isActive(plugin.id, pg.pageId)}
                  href={index === 0 ? pg.firstHref : pg.href}>{pg.label}</a
                >
              {/each}
            </div>
          {/each}
        {/snippet}
      </Toggle>
      <div class="divider"></div>
    {/if}

    {#each ordering.extraPlugins as plugin}
      <Toggle defaultOpen={plugin.id === active.activePluginId}>
        {#snippet trigger({ isOpen })}
          <p>
            {plugin.name}
            <Arrow {isOpen} />
          </p>
        {/snippet}
        {#snippet content()}
          <div class="item">
            {#if (plugin.components || []).filter((it) => it.type === "docs").length === 0}
              <a
                onclick={() => (isOpened = false)}
                class:active={isActiveFirst(plugin.id, null)}
                href={`/docs/${plugin.id}`}>Overview</a
              >
            {:else}
              {#each (plugin.components || []).filter((it) => it.type === "docs") as c, index}
                <a
                  onclick={() => (isOpened = false)}
                  class:active={index === 0
                    ? isActiveFirst(plugin.id, c.id as string)
                    : isActive(plugin.id, c.id as string)}
                  href={index === 0
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
    cursor: pointer;
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
