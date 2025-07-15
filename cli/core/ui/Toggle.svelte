<script lang="ts">
  import { tick, onMount } from "svelte"

  type Snippet<Props = any> = (props: Props) => any

  let {
    trigger,
    content,
  }: {
    trigger: Snippet<{ isOpen: boolean }>
    content: Snippet<{ close: () => void }>
  } = $props()

  let isOpen = $state(false)
  let shouldRender = $state(false)
  let container: HTMLDivElement | null = null

  function toggle(event?: MouseEvent | KeyboardEvent) {
    event?.preventDefault()
    if (isOpen) {
      close()
    } else {
      open()
    }
  }

  function close() {
    if (container) {
      container.style.height = container.scrollHeight + "px"
      container.offsetHeight
      container.style.height = "0"
    }
    isOpen = false
  }

  function open() {
    shouldRender = true
    tick().then(() => {
      if (container) {
        container.style.height = container.scrollHeight + "px"
      }
    })
    isOpen = true
  }

  function onTransitionEnd() {
    if (!isOpen) {
      shouldRender = false
    } else if (container) {
      container.style.height = "auto"
    }
  }
</script>

<div
  class="trigger"
  onclick={toggle}
  role="button"
  tabindex="0"
  onmousedown={(event: MouseEvent) => {
    if (event.detail > 1) event.preventDefault()
  }}
  onkeydown={(e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle()
    }
  }}
>
  {@render trigger({ isOpen })}
</div>

{#if shouldRender}
  <div
    bind:this={container}
    class="content-container"
    data-open={isOpen}
    ontransitionend={onTransitionEnd}
    style="height: 0; overflow: hidden"
  >
    {@render content({ close })}
  </div>
{/if}

<style>
  .trigger {
    display: block;
    cursor: pointer;
    user-select: none;
  }

  .content-container {
    transition:
      height 250ms ease,
      opacity 250ms ease;
    opacity: 0;
  }

  .content-container[data-open="true"] {
    opacity: 1;
  }
</style>
