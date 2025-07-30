<script lang="ts">
  import { onMount, tick } from "svelte"
  import Portal from "svelte-portal"
  import { generateId, addEntry, closeAllAfter, closeLast } from "./overlay"
  type Snippet<Props = any> = (props: Props) => any
  let {
    trigger,
    overlay,
    overlayStyle = "",
    triggerStyle = "",
  }: {
    trigger: Snippet<{ isOpen: boolean }>
    overlay: Snippet<{ close: () => void }>
    overlayStyle?: string
    triggerStyle?: string
  } = $props()

  let isOpen = $state(false)

  let mouseX = $state(0)
  let mouseY = $state(0)

  let container: HTMLElement
  let triggerButton: HTMLElement

  let pollInterval: ReturnType<typeof setInterval> | null = null

  $effect(() => {
    if (isOpen) {
      startPolling()
    } else {
      stopPolling()
    }
  })

  function startPolling() {
    stopPolling()

    pollInterval = setInterval(() => {
      if (!isOpen || !triggerButton || !container) return

      positionOverlay()
    }, 1000 / 10)
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval)
      pollInterval = null
    }
  }

  let id = generateId()

  function toggle(event?: MouseEvent) {
    if (event) {
      mouseX = event.clientX
      mouseY = event.clientY
      event.preventDefault()
    }

    if (isOpen) {
      close()
      isOpen = false
    } else {
      addEntry(id, () => {
        isOpen = false
      })
      isOpen = true
    }

    tick().then(() => {
      if (container) {
        positionOverlay()
      }
    })
  }

  function positionOverlay() {
    if (!isOpen) return
    if (!triggerButton || !container) return

    const prevVisibility = container.style.visibility
    const prevPosition = container.style.position
    container.style.visibility = "hidden"
    container.style.position = "fixed"

    container.style.left = "0"
    container.style.top = "0"

    const triggerRect = triggerButton.getBoundingClientRect()
    const overlayRect = container.getBoundingClientRect()

    const containerStyle = getComputedStyle(container)
    const positionType = containerStyle.position

    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight

    let left = triggerRect.left + scrollX
    let top = triggerRect.bottom + scrollY + 8

    if (left + overlayRect.width > scrollX + viewportWidth) {
      left = scrollX + viewportWidth - overlayRect.width - 10
    }

    if (top + overlayRect.height > scrollY + viewportHeight) {
      top = triggerRect.top + scrollY - overlayRect.height - 8
    }

    left = Math.max(scrollX + 10, left)
    top = Math.max(scrollY + 10, top)

    if (
      positionType === "absolute" &&
      container.offsetParent instanceof HTMLElement
    ) {
      const parentRect = container.offsetParent.getBoundingClientRect()
      left -= parentRect.left + scrollX
      top -= parentRect.top + scrollY
    }

    container.style.visibility = prevVisibility
    container.style.position = prevPosition

    container.style.left = `${left}px`
    container.style.top = `${top}px`
  }

  function close() {
    closeAllAfter(id)
  }

  function onClickOutside(event: MouseEvent) {
    if (!isOpen || !container) return

    event.preventDefault()

    const path = event.composedPath()
    if (path.includes(container) || path.includes(triggerButton)) return

    closeLast(id)
  }

  onMount(() => {
    window.addEventListener("click", onClickOutside, true)

    window.addEventListener("resize", positionOverlay)

    return () => {
      window.removeEventListener("click", onClickOutside, true)
      window.removeEventListener("resize", positionOverlay)

      stopPolling()
    }
  })
</script>

<div
  bind:this={triggerButton}
  class="trigger"
  onclick={toggle}
  onmousedown={(event: MouseEvent) => {
    if (event.detail > 1) {
      event.preventDefault()
    }
  }}
  role="button"
  tabindex="0"
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle()
    }
  }}
  style={triggerStyle}
>
  {@render trigger({ isOpen })}
</div>

<Portal>
  {#if isOpen}
    <div class="backdrop" aria-hidden="true"></div>
    <div bind:this={container} class="overlay" style={overlayStyle}>
      {@render overlay({ close })}
    </div>
  {/if}
</Portal>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 0, 0, 0.1);
    opacity: 0;
    z-index: 998;
  }
  .overlay {
    border: 1px solid var(--bgLight);
    width: fit-content;
    position: absolute;
    background-color: var(--bgMedium);
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    max-height: 80vh;
    max-width: 80vw;
    overflow: auto;
  }
  .trigger {
    display: block;
    cursor: pointer;
  }
</style>
