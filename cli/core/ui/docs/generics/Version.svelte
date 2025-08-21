<script lang="ts">
  import type { PluginConfig, PluginManager } from "ftc-panels"
  let {
    plugin,
    fetchFunction = async () => "",
  }: { plugin: PluginConfig; fetchFunction: () => Promise<string> } = $props()
</script>

{#if plugin.mavenURL != "" && plugin.packageString != ""}
  <section>
    <h3>Version</h3>

    <p>{`maven { url = "${plugin.mavenURL}" }`}</p>
    <p>
      {`implementation "${plugin.packageString.replace("<VERSION>", plugin.version)}"`}
      {#await fetchFunction()}
        Loading
      {:then data}
        {#if data != "" && data != plugin.version}
          {"->"}
          {`implementation "${plugin.packageString.replace("<VERSION>", data)}"`}
        {/if}
      {/await}
    </p>
  </section>
{/if}

<style>
  section {
    border-radius: 1rem;
  }

  section {
    background-color: var(--bgLight);
    padding: var(--padding);
    margin-bottom: calc(var(--padding) / 2);
  }
</style>
