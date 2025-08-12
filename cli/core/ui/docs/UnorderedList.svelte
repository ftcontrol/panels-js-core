<script lang="ts">
    let {
        dense = false,
    }: {
        dense: boolean
    } = $props();
</script>

<ul class:dense>
    <slot/>
</ul>

<style>
    ul {
        list-style: disc;
        margin: .75rem 0 .75rem 1.25rem;
        padding-left: 1rem;
    }

    ul.dense {
        margin: .25rem 0 .25rem 1.25rem;
    }

    ul :global(li) {
        margin: .35rem 0;
    }
</style>
