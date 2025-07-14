<script lang="ts">
  import { onMount, tick } from "svelte"
  import Portal from "svelte-portal"
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
  let triggerButton: HTMLElement

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

    const updatePosition = () => {
      if (isOpen) positionOverlay()
    }

    let observer = new MutationObserver(updatePosition)
    if (triggerButton)
      observer.observe(triggerButton, {
        attributes: true,
        childList: true,
        subtree: true,
      })

    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("click", onClickOutside, true)
      window.removeEventListener("resize", updatePosition)
      observer.disconnect()
    }
  })
</script>

<div
  bind:this={triggerButton}
  class="trigger"
  onclick={toggle}
  role="button"
  tabindex="0"
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle()
    }
  }}
>
  {@render trigger({ isOpen })}
</div>

<Portal>
  {#if isOpen}
    <div bind:this={container} class="overlay">
      {@render overlay({ close })}
    </div>
  {/if}
</Portal>

<style>
  .overlay {
    border: 1px solid var(--bgLight);
    width: fit-content;
    position: absolute;
    background-color: var(--bgMedium);
    z-index: 999;
    padding: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .trigger {
    display: inline-block;
    cursor: pointer;
  }
</style>
