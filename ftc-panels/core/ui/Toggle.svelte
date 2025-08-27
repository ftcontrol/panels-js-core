<script lang="ts">
  import { onMount, tick } from "svelte"

  type Snippet<Props = any> = (props: Props) => any

  let {
    trigger,
    content,
    defaultOpen = false,
  }: {
    trigger: Snippet<{ isOpen: boolean }>
    content: Snippet<{ close: () => void }>
    defaultOpen?: boolean
  } = $props()

  let isOpen = $state(defaultOpen)
  let shouldRender = $state(defaultOpen)
  let container: HTMLDivElement | null = null

  async function open() {
    shouldRender = true
    await tick()

    if (container) {
      container.style.height = container.scrollHeight + "px"
    }

    isOpen = true
  }

  function close() {
    if (container) {
      container.style.height = container.scrollHeight + "px"
      container.offsetHeight
      container.style.height = "0"
    }

    isOpen = false
  }

  function toggle(event?: MouseEvent | KeyboardEvent) {
    event?.preventDefault()
    isOpen ? close() : open()
  }

  function onTransitionEnd() {
    if (container) {
      if (isOpen) {
        container.style.height = "auto"
      } else {
        shouldRender = false
      }
    }
  }

  onMount(async () => {
    if (defaultOpen) {
      await tick()
      if (container) {
        container.style.height = "auto"
      }
    }
  })
</script>

<div
  class="trigger"
  role="button"
  tabindex="0"
  onclick={toggle}
  onmousedown={(e) => e.detail > 1 && e.preventDefault()}
  onkeydown={(e) => {
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
    class="accordion"
    ontransitionend={onTransitionEnd}
    style="height: 0; overflow: hidden;"
  >
    {@render content({ close })}
  </div>
{/if}

<style>
  .trigger {
    cursor: pointer;
    user-select: none;
  }

  .accordion {
    transition: height 100ms ease;
    overflow: hidden;
  }
</style>
