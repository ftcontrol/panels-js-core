<script lang="ts">
    import type {Snippet} from "svelte"

    let {level = 1, text = "", children}: { level: number; text?: string; children?: Snippet } = $props()
</script>

<h1>{@render children?.()}</h1>


{#if level === 1}
    <h1>
        {#if text}{text}{:else}
            {@render children?.()}
        {/if}
    </h1>
{:else if level === 2}
    <h2>
        {#if text}{text}{:else}
            {@render children?.()}
        {/if}
    </h2>
{:else if level === 3}
    <h3>
        {#if text}{text}{:else}
            {@render children?.()}
        {/if}
    </h3>
{:else if level === 4}
    <h4>
        {#if text}{text}{:else}
            {@render children?.()}
        {/if}
    </h4>
{:else}
    <h5>
        {#if text}{text}{:else}
            {@render children?.()}
        {/if}
    </h5>
{/if}