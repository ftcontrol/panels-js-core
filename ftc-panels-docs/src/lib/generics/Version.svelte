<script lang="ts">
  import type { PluginConfig } from "ftc-panels"
  import { CodeBlock } from "ftc-panels/docs"
  let {
    plugin,
    fetchFunction = async () => "",
  }: { plugin: PluginConfig; fetchFunction: () => string | Promise<string> } =
    $props()
</script>

{#if plugin.mavenURL && plugin.mavenURL !== "" && plugin.packageString && plugin.packageString !== ""}
  <section>
    <h3 class="docs-heading" data-level="h2">Version</h3>

    <p>Repository</p>
    <CodeBlock
      language={"gradle"}
      code={`maven { url = "${plugin.mavenURL}" }`}
    />

    <p>Current Dependency</p>

    <CodeBlock
      language={"gradle"}
      code={`implementation "${plugin.packageString.replace("<VERSION>", plugin.version)}"`}
    />

    {#await fetchFunction()}
      Loading
    {:then data}
      {#if data !== "" && data !== plugin.version}
        <p>Latest Dependency</p>

        <CodeBlock
          language={"gradle"}
          code={`implementation "${plugin.packageString.replace("<VERSION>", data)}"`}
        />
      {/if}
    {/await}
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
