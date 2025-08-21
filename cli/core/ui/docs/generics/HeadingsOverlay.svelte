<script lang="ts">
  import { onMount, tick } from "svelte"

  type Heading = {
    level: number
    text: string
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
    const elements = document.querySelectorAll<HTMLElement>(".docs-heading")
    titles = Array.from(elements).map((el) => ({
      level: getLevel(el),
      text: el.textContent?.trim() || "",
      element: el,
    }))
  }

  let observer: MutationObserver | null = null

  async function reinitSoon() {
    await tick()
    init()
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

  function scrollToHeading(heading: Heading) {
    heading.element.scrollIntoView({ behavior: "smooth", block: "start" })
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
