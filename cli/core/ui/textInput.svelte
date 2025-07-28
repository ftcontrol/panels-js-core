<script lang="ts">
  let {
    value = $bindable(),
    placeholder = "",
    disabled = false,
    transparent = false,
    oninput = () => {},
  }: {
    value?: string
    placeholder?: string
    disabled?: boolean
    transparent?: boolean
    oninput?: (e: Event) => void
  } = $props()
</script>

<input
  type="text"
  bind:value
  {placeholder}
  {disabled}
  class:transparent
  on:input={oninput}
/>

<style>
  input {
    border: none;
    margin: 0;
    background-color: var(--bgLight);
    color: currentColor;
    padding: 1em;
    border-radius: 10px;
    outline: none;
    flex-grow: 1;

    justify-content: center;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }

  input.transparent {
    background-color: transparent;
    padding: 0;
  }

  input:disabled {
    opacity: 0.5;
  }

  input::placeholder {
    color: currentColor;
    opacity: 0.5;
  }
</style>
