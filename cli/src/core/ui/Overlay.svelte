<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte"
  type Snippet<Props = any> = (props: Props) => any
  let {
    trigger,
    overlay,
  }: {
    trigger: Snippet<{ isOpen: boolean }>
    overlay: Snippet<{ close: () => void }>
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
    if (!triggerButton || !container) return

    const triggerRect = triggerButton.getBoundingClientRect()
    const overlayRect = container.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let left = triggerRect.left
    let top = triggerRect.bottom + 8

    if (left + overlayRect.width > viewportWidth) {
      left = viewportWidth - overlayRect.width - 10
    }

    if (top + overlayRect.height > viewportHeight) {
      top = triggerRect.top - overlayRect.height
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
  {@render trigger({ isOpen })}
</button>

{#if isOpen}
  <div bind:this={container} class="overlay">
    {@render overlay({ close })}
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
