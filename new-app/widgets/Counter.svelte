<script>
  export let initial = 0
  export let step = 1
  export let label = "Count"

  let count = initial

  function increment() {
    count += step
  }

  function decrement() {
    count -= step
  }

  function reset() {
    count = initial
  }
</script>

<div class="counter-widget">
  <h3>{label}: {count}</h3>
  <div class="buttons">
    <button on:click={decrement}>-</button>
    <button on:click={reset}>Reset</button>
    <button on:click={increment}>+</button>
  </div>
</div>

<style>
  .counter-widget {
    padding: 20px;
    border: 2px solid #333;
    border-radius: 8px;
    text-align: center;
    font-family: Arial, sans-serif;
    max-width: 300px;
    margin: 0 auto;
  }

  h3 {
    margin: 0 0 15px 0;
    color: #333;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #0056b3;
  }

  button:active {
    transform: translateY(1px);
  }
</style>
