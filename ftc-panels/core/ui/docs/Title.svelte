<script lang="ts">
    import type {Snippet} from "svelte"

    let {level = 1, children}: { level: number; children?: Snippet } = $props()
    const tag = (`h${Math.min(5, Math.max(1, level))}`) as const;
    const stylesMap = {
        1: "clamp(1.125rem, 0.75rem + 1.4vw, 1.625rem)",
        2: "clamp(0.95rem,  0.675rem + 1vw,  1.3rem)",
        3: "clamp(0.8rem,   0.6rem  + 0.7vw, 1rem)",
        4: "clamp(0.675rem, 0.55rem + 0.45vw, 0.8rem)",
        5: "clamp(0.575rem, 0.525rem + 0.25vw, 0.65rem)"
    }
    const extraStyles="font-weight: 700;margin-block: 0.75em;text-wrap: balance;"
</script>

<svelte:element class="docs-heading" this={tag} data-level={tag} style={`${extraStyles}font-size: ${stylesMap[level]};`} >
    {@render children()}
</svelte:element>