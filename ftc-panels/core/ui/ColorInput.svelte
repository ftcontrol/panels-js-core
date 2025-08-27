<script lang="ts">
  let {
    value = $bindable(),
    disabled = false,
    transparent = false,
    oninput = () => {},
    style = "",
  }: {
    value?: string
    disabled?: boolean
    transparent?: boolean
    oninput?: (e: Event) => void
    style: string
  } = $props()
</script>

<input type="color" bind:value {disabled} class:transparent {oninput} {style} />

<style>
  input {
    border: none;
    margin: 0;
    background-color: var(--bgLight);
    padding: 0.4em;
    border-radius: 10px;
    outline: none;

    width: 60px;
    height: 60px;
    cursor: pointer;

    width: 100%;
  }

  input.transparent {
    background-color: transparent;
    padding: 0;
  }

  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
