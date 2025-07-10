<script lang="ts">
  import { onMount, onDestroy, tick, type Snippet } from "svelte"

  let {
    trigger,
    overlay,
  }: {
    trigger: Snippet
    overlay: Snippet
  } = $props()

  let isOpen = $state(false)

  let mouseX = $state(0)
  let mouseY = $state(0)

  let container: HTMLElement
  let triggerButton: HTMLButtonElement

  function toggle(event?: MouseEvent) {
    if (event) {
      mouseX = event.clientX
      mouseY = event.clientY
    }
    isOpen = !isOpen

    tick().then(() => {
      if (container) {
        positionOverlay()
      }
    })
  }

  function positionOverlay() {
    const overlayRect = container.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let left = mouseX
    let top = mouseY

    if (left + overlayRect.width > viewportWidth) {
      left = viewportWidth - overlayRect.width - 10
    }

    if (top + overlayRect.height > viewportHeight) {
      top = viewportHeight - overlayRect.height - 10
    }

    left = Math.max(10, left)
    top = Math.max(10, top)

    container.style.left = `${left}px`
    container.style.top = `${top}px`
  }

  function close() {
    isOpen = false
  }

  function onClickOutside(event: MouseEvent) {
    if (!isOpen || !container) return

    const path = event.composedPath()
    if (path.includes(container) || path.includes(triggerButton)) return

    close()
  }

  onMount(() => {
    window.addEventListener("click", onClickOutside, true)
    return () => {
      window.removeEventListener("click", onClickOutside, true)
    }
  })
</script>

<button bind:this={triggerButton} onclick={toggle}>
  {@render trigger()}
</button>

{#if isOpen}
  <div bind:this={container} class="overlay">
    {@render overlay()}
  </div>
{/if}

<style>
  .overlay {
    border: 1px solid red;
    width: fit-content;
    position: absolute;
    background-color: var(--bgDark);
    z-index: 999;
    padding: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>
