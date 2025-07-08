<script lang="ts">
  import { increment } from ".."
  let { global } = $props()
  let count = $state(0)
</script>

{JSON.stringify(global)}
<p>{count}</p>
<button
  onclick={() => {
    count = increment(count)
  }}>Increment</button
>

<style>
  p {
    color: red;
  }
</style>
