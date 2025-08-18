<script lang="ts">
    let {
        code = '',
        language = '',
    }: {
        code?: string;
        language?: string;
    } = $props();
</script>

<div class="panels-code" data-code={code} data-language={language}></div>

<style>
    div{
        background: #0d1117;
        padding: calc(var(--padding) / 2);
        border: 1px solid currentColor;
        margin: 4px;
        overflow-x: auto;
    }
</style>
