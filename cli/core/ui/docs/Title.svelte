<script lang="ts">
    import type {Snippet} from "svelte"

    let {level = 1, children}: { level: number; children?: Snippet } = $props()
    const tag = (`h${Math.min(5, Math.max(1, level))}`) as const;
</script>

<svelte:element this={tag} data-level={tag}>
    {@render children()}
</svelte:element>

<style>
    [data-level] {
        font-weight: 700;
        line-height: 1.2;
        margin-block: 0 0.5em;
        letter-spacing: -0.015em;
        color: inherit;
        text-wrap: balance;
    }

    [data-level="h1"] { font-size: var(--h1-size, clamp(2.25rem, 1.5rem + 2.8vw, 3.25rem)); }
    [data-level="h2"] { font-size: var(--h2-size, clamp(1.9rem,  1.35rem + 2.0vw, 2.6rem)); }
    [data-level="h3"] { font-size: var(--h3-size, clamp(1.6rem,  1.2rem  + 1.4vw, 2.0rem)); }
    [data-level="h4"] { font-size: var(--h4-size, clamp(1.35rem, 1.1rem  + 0.9vw, 1.6rem)); }
    [data-level="h5"] { font-size: var(--h5-size, clamp(1.15rem, 1.05rem + 0.5vw, 1.3rem)); }
</style>