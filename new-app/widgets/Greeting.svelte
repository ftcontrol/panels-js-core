<script>
  export let name = "World"
  export let theme = "default"

  let showDetails = false

  const themes = {
    default: { bg: "#f0f0f0", color: "#333", border: "#ccc" },
    dark: { bg: "#2d2d2d", color: "#fff", border: "#555" },
    colorful: {
      bg: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
      color: "#fff",
      border: "#fff",
    },
  }

  $: currentTheme = themes[theme] || themes.default
</script>

<div
  class="greeting-widget"
  style="
    background: {currentTheme.bg};
    color: {currentTheme.color};
    border-color: {currentTheme.border};
  "
>
  <h2>Hello, {name}!</h2>
  <p>Welcome to our amazing widget.</p>

  <button on:click={() => (showDetails = !showDetails)}>
    {showDetails ? "Hide" : "Show"} Details
  </button>

  {#if showDetails}
    <div class="details">
      <p>
        This widget was built with Svelte and bundled as a standalone component.
      </p>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  {/if}
</div>

<style>
  .greeting-widget {
    padding: 30px;
    border: 2px solid;
    border-radius: 12px;
    text-align: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0 0 10px 0;
    font-size: 2em;
  }

  p {
    margin: 10px 0;
    line-height: 1.5;
  }

  button {
    padding: 12px 24px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.2);
    color: inherit;
    cursor: pointer;
    transition: all 0.2s;
    margin: 15px 0;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  .details {
    margin-top: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: left;
  }

  .details p {
    margin: 8px 0;
    font-size: 14px;
  }
</style>
