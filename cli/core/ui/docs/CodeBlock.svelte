<script lang="ts">
    import hljs from 'highlight.js';
    import {onMount} from "svelte";
    import juice from 'juice';
    import themeCss from 'highlight.js/styles/github-dark.css?raw';

    let {code = ''}: {
        code?: string
    } = $props()

    let html = $state("")

    onMount(() => {
        const value = hljs.highlightAuto(code).value
        const wrapped = `<pre><code class="hljs">${value}</code></pre>`;
        html = juice.inlineContent(wrapped, themeCss);
    })
</script>

<div>{@html html}</div>

<style>
    div{
        background: #0d1117;
        padding: calc(var(--padding) / 2);
        border: 1px solid currentColor;
        margin: 4px;
    }
</style>