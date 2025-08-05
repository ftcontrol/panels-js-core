<script lang="ts">
  let {
    value = $bindable(),
    placeholder = "",
    disabled = false,
    transparent = false,
    min,
    max,
    step,
    oninput = () => {},
    style = "",
  }: {
    value?: number
    placeholder?: string
    disabled?: boolean
    transparent?: boolean
    min?: number
    max?: number
    step?: number
    oninput?: (e: Event) => void
    style: string
  } = $props()
</script>

<input
  type="number"
  bind:value
  {placeholder}
  {disabled}
  class:transparent
  {min}
  {max}
  {step}
  {oninput}
  {style}
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

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
