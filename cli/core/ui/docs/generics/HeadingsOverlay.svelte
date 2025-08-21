<script lang="ts">
  import { onMount, tick } from "svelte"

  type Heading = {
    level: number
    text: string
    id: string
    element: HTMLElement
  }

  let titles: Heading[] = $state([])

  let smallestTitleLevel = $derived.by(() => {
    if (titles.length === 0) return 1
    return titles.reduce((min, t) => Math.min(min, t.level), Infinity)
  })

  function getLevel(el: HTMLElement): number {
    const raw = el.dataset.level ?? el.tagName
    const m = String(raw).match(/h?(\d)/i)
    const n = m ? parseInt(m[1], 10) : NaN
    return Number.isFinite(n) ? n : 1
  }

  function init() {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".docs-heading")
    )
    applyIdsUnique(elements)

    titles = elements
      .map((el) => ({
        level: getLevel(el),
        text: el.textContent?.trim() || "",
        id: el.id,
        element: el,
      }))
      .filter((it) => it.text != "")
  }

  let observer: MutationObserver | null = null

  async function reinitSoon() {
    await tick()
    init()

    applyHeadingFromUrl()
  }

  function startObserving() {
    if (typeof MutationObserver === "undefined") return
    observer = new MutationObserver(() => reinitSoon())
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    })
  }

  function stopObserving() {
    observer?.disconnect()
    observer = null
  }

  onMount(async () => {
    await tick()
    init()
    startObserving()

    return () => {
      stopObserving()
    }
  })

  function slugify(text: string): string {
    return (
      text
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "section"
    )
  }

  function applyIdsUnique(headings: HTMLElement[]) {
    const used = new Set<string>()

    for (const el of headings) {
      let id = el.getAttribute("id")

      if (!id) {
        const base = slugify(el.textContent?.trim() || "")
        id = base
        let i = 2
        while (used.has(id) || document.getElementById(id)) {
          id = `${base}-${i++}`
        }
        el.id = id
      }

      used.add(id)
    }
  }

  function updateUrlHeading(id: string, replace = false) {
    const url = new URL(window.location.href)
    url.searchParams.set("heading", id)
    if (replace) {
      history.replaceState({}, "", url.toString())
    } else {
      history.pushState({}, "", url.toString())
    }
  }

  function getUrlHeading(): string | null {
    const url = new URL(window.location.href)
    return url.searchParams.get("heading")
  }

  function scrollToHeading(heading: Heading, { updateUrl = true } = {}) {
    if (!heading?.element) return
    if (updateUrl) updateUrlHeading(heading.id)
    heading.element.scrollIntoView({ behavior: "smooth", block: "start" })
    heading.element.setAttribute("tabindex", "-1")
    heading.element.focus({ preventScroll: true })
  }

  function applyHeadingFromUrl(replace = true) {
    const target = getUrlHeading()
    if (!target || titles.length === 0) return
    const h = titles.find((t) => t.id === target)
    if (h) {
      updateUrlHeading(h.id, replace)
      h.element.scrollIntoView({
        behavior: "instant" as ScrollBehavior,
        block: "start",
      })
    }
  }
</script>

{#if titles.length >= 1}
  <section>
    {#each titles as t}
      <button
        style="padding-left: {(t.level - smallestTitleLevel) * 0.75}rem"
        onclick={() => scrollToHeading(t)}
      >
        {t.text}
      </button>
    {/each}
  </section>
{/if}

<style>
  section {
    overflow-y: auto;
    background: var(--bgMedium);
    border: 1px solid var(--bgLight);
    padding: 0.5rem;
    font-size: 0.9rem;
    position: absolute;
    right: 1rem;
    top: 30%;
    z-index: 1;
  }

  button {
    display: block;
    color: inherit;
    width: 100%;
    text-align: left;
    padding: 0.25rem 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
  }

  button:hover {
    background: var(--bgLight);
  }
</style>
