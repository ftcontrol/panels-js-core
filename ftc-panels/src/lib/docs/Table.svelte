<script lang="ts">
  let {
    data,
    caption = "",
    hasHeader = false,
  }: {
    data: any
    caption?: string
    hasHeader?: boolean
  } = $props()
</script>

<table>
  <tbody>
    {#each data as row, i}
      <tr class:header={i === 0 && hasHeader}>
        {#each row as item, j}
          <td>
            {item}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
  {#if caption}
    <caption>{caption}</caption>
  {/if}
</table>

<style>
  table {
    width: 100%;
    max-width: 500px;
    height: fit-content;
    overflow-x: auto;
  }

  td {
    text-align: left;
    border: 1px solid currentColor;
    padding: 0.5rem;
  }
  tr.header {
    font-weight: bold;
  }
</style>
