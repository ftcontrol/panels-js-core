<script lang="ts">
  import { Snippet } from "svelte"

  let {
    children,
    type = "dot",
    index = 1,
  }: {
    children?: Snippet
    type?: "dot" | "number" | "line"
    index?: number
  } = $props()
</script>

<div class="list-item">
  <div class="marker">
    {#if type === "dot"}
      <div class="dot"></div>
    {:else if type === "number"}
      {index}.
    {:else if type === "line"}
      <div class="line"></div>
    {/if}
  </div>

  <div class="content">
    {@render children?.()}
  </div>
</div>

<style>
  .list-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 500px;
  }

  .marker {
    min-width: 1.5rem;
    text-align: center;
    font-weight: bold;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: currentColor;
    border-radius: 50%;
    margin-top: 0.4rem;
  }

  .line {
    width: 2px;
    background-color: currentColor;
    height: 100%;
    margin-top: 0.2rem;
  }
</style>
