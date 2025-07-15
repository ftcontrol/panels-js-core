<script lang="ts">
  import { onMount } from "svelte"
  type Snippet<Props = any> = (props: Props) => any
  let {
    trigger,
    content,
  }: {
    trigger: Snippet<{ isOpen: boolean }>
    content: Snippet<{ close: () => void }>
  } = $props()

  let isOpen = $state(false)

  function toggle(event?: MouseEvent) {
    if (event) {
      event.preventDefault()
    }
    isOpen = !isOpen
  }

  function close() {
    isOpen = false
  }
</script>

<div
  class="trigger"
  onclick={toggle}
  role="button"
  tabindex="0"
  onmousedown={(event: MouseEvent) => {
    if (event.detail > 1) {
      event.preventDefault()
    }
  }}
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle()
    }
  }}
>
  {@render trigger({ isOpen })}
</div>

{#if isOpen}
  {@render content({ close })}
{/if}

<style>
  .trigger {
    display: block;
    cursor: pointer;
  }
</style>
