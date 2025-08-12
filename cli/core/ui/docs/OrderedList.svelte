<script lang="ts">
    let {
        start = 1,
        type = '1',
        dense = false,
    }: {
        start: any
        type: '1' | 'a' | 'A' | 'i' | 'I'
        dense: boolean
    } = $props();
</script>

<ol start={start} type={type} class:dense>
    <slot/>
</ol>

<style>
    ol {
        margin: .75rem 0 .75rem 1.25rem;
        padding-left: 1rem;
    }

    ol.dense {
        margin: .25rem 0 .25rem 1.25rem;
    }

    ol :global(li) {
        margin: .35rem 0;
    }
</style>
