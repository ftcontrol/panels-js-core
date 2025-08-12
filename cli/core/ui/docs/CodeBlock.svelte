<script lang="ts">
    import {onMount} from 'svelte'
    import {
        codeToHtml
    } from 'shiki'

    let {code = '', lang}: {
        code: string
        lang: string
    } = $props()

    let highlightedCode = $state('')

    async function loadShikiAndHighlight() {
        highlightedCode = await codeToHtml(code, {
            lang,
            theme: 'night-owl'
        })
    }

    onMount(() => {
        loadShikiAndHighlight()
    })
</script>

<div>
    {@html highlightedCode}
</div>

<style>
    div > :global(pre) {
        padding: var(--padding);
        border: 1px solid currentColor;
        width: 100%;
        max-width: 500px;
    }
</style>