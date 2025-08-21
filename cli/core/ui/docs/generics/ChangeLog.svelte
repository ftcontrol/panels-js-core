<script lang="ts">
  import { type ChangeLogEntry } from "../../../types"
  import ListItem from "../ListItem.svelte"
  import OrderedList from "../OrderedList.svelte"

  let { changelog }: { changelog: ChangeLogEntry[] } = $props()
</script>

<section>
  <h3>Changelog</h3>
  {#each changelog as log}
    <p><b>{log.version}</b> {log.release_date}</p>
    <OrderedList>
      {#each log.changes as change}
        <ListItem>
          <p>{change.type}</p>
          <p><b>Description:</b> {change.description}</p>
          {#if change.upgrading}
            <p><b>Upgrading:</b> {change.upgrading}</p>
          {/if}
        </ListItem>
      {/each}
    </OrderedList>
  {/each}
</section>

<style>
  b {
    font-weight: 800;
  }
  section {
    background-color: var(--bgLight);
    padding: var(--padding);
    margin-bottom: var(--padding);
    border-radius: 1rem;
    overflow: auto;
  }

  p {
    margin: 0;
    margin: 0.25rem;
  }
</style>
