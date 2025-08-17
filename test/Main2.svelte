<script lang="ts">
  let count = $state(0)
</script>

<div>
  <button onclick={() => count--}>–</button>
  <strong>{count}</strong>
  <button onclick={() => count++}>+</button>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }
  button {
    cursor: pointer;
    border: 0;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
  }
</style>
