<script lang="ts">
  import { increment } from ".."
  import { testVariable } from "ftc-panels/src/core"
  let { global } = $props()
  let count = $state(0)
</script>

{testVariable}
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
