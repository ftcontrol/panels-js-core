<script lang="ts">
    import {type Snippet} from "svelte"
    import Toggle from "../../Toggle.svelte";
    import Arrow from "../../Arrow.svelte";
    import {type PluginConfig} from "../../../types"
    import HeadingsOverlay from "./HeadingsOverlay.svelte";

    let {plugins, skippedPlugins = [], children}: {
        plugins: PluginConfig[];
        skippedPlugins?: PluginConfig[];
        children?: Snippet
    } = $props()

    let orderedPlugins = $derived.by(() => {
        const docsPlugin = plugins.find(
            (it) => it.id === "com.bylazar.docs"
        )
        const otherPlugins = plugins.filter(
            (it) => it.id !== "com.bylazar.docs"
        )

        if (!docsPlugin) {
            return otherPlugins
        }

        const renamedDocsPlugin = {
            ...docsPlugin,
            name: "Core"
        }

        return [renamedDocsPlugin, ...otherPlugins.sort((a, b) => a.name.localeCompare(b.name))]
    })
</script>

<section>
    <nav>
        {#each orderedPlugins as plugin}
            <Toggle defaultOpen={plugin.id === "com.bylazar.docs"}>
                {#snippet trigger({isOpen})}
                    <p>
                        {plugin.name}
                        <Arrow {isOpen}/>
                    </p>
                {/snippet}
                {#snippet content({close})}
                    <div class="item">
                        {#each (plugin.components || []).filter(it => it.type === "docs") as c}
                            <a href="/docs/{plugin.id}/{c.id}">{c.id}</a>
                        {/each}
                    </div>
                {/snippet}
            </Toggle>
            <div class="divider"></div>
        {/each}
        {#each skippedPlugins as plugin}
            <p class="disabled">{plugin.name}</p>
        {/each}
    </nav>
    <div class="content">
        <HeadingsOverlay/>
        {@render children?.()}
    </div>
</section>

<style>
    section {
        display: flex;
        gap: calc(var(--padding) / 2);
        margin: 0.5rem;
        overflow-y: auto;
        height: 100%;
    }

    p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--padding);
        font-weight: 700;
    }

    a {
        color: inherit;
        text-decoration: none;
        display: block;
        margin-bottom: 0.25rem;
    }

    nav {
        padding: var(--padding);
        overflow-y: auto;
        background-color: var(--bgMedium);
        border-radius: 1rem;
        min-width: 200px;
    }

    .content {
        background-color: var(--bgMedium);
        border-radius: 1rem;
        padding: var(--padding);
        width: 100%;
        overflow-y: auto;
    }

    p.disabled {
        opacity: 0.5;
    }

    .divider {
        width: 100%;
        height: 1px;
        background-color: currentColor;
        margin-block: 1rem;
        opacity: 0.5;
    }
</style>
