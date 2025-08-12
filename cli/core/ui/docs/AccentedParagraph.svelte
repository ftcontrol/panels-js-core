<script lang="ts">
    import type {Snippet} from "svelte"

    let {tone = "info", children}: { tone: "info" | "warn" | "danger" | "success"; children?: Snippet } = $props()
    const map = {
        info: ['#eff6ff', '#1e40af', '#bfdbfe'],
        warn: ['#fffbeb', '#92400e', '#fde68a'],
        danger: ['#fef2f2', '#991b1b', '#fecaca'],
        success: ['#f0fdf4', '#065f46', '#bbf7d0']
    };
    const [bg, fg, br] = map[tone] ?? map.info;

</script>

<p style={`--bg:${bg};--fg:${fg};--br:${br}`}>{@render children?.()}</p>

<style>
    p {
        width: 100%;
        max-width: 500px;
        text-align: justify;

        background: var(--bg);
        color: var(--fg);
        border: 1px solid var(--br);
        padding: 0.8rem 0.9rem;
        border-radius: 0.25rem;
        margin: 0.75rem 0 1rem;
    }
</style>