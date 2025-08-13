<script lang="ts">
    import hljs from 'highlight.js';
    import {onMount} from 'svelte';
    import juice from 'juice';
    import themeCss from 'highlight.js/styles/github-dark.css?raw';

    let {
        code = '',
        language = '',
    }: {
        code?: string;
        language?: string;
    } = $props();

    let html = $state("");

    const markerAtEol = /\s*\/\/\s*\[svp!\s*(\+\+|--)\s*\]\s*$/;

    function render() {
        const statuses: ('added' | 'removed' | '')[] = [];
        const cleanedLines = code.split(/\r?\n/).map((raw) => {
            const m = raw.match(markerAtEol);
            statuses.push(m ? (m[1] === '++' ? 'added' : 'removed') : '');
            return m ? raw.replace(markerAtEol, '') : raw;
        });

        const cleaned = cleanedLines.join('\n');

        let lang = language && hljs.getLanguage(language) ? language : '';
        if (!lang) {
            const auto = hljs.highlightAuto(cleaned);
            lang = auto.language && hljs.getLanguage(auto.language) ? auto.language : 'plaintext';
        }

        const rendered = cleanedLines.map((line, i) => {
            const status = statuses[i];
            const klass = status ? (status === 'added' ? 'line-added' : 'line-removed') : '';
            const htmlLine = line.length
                ? hljs.highlight(line, { language: lang, ignoreIllegals: true }).value
                : '&nbsp;';
            return `<span class="hljs-line ${klass}">${htmlLine}</span>`;
        })
            .join('');

        const wrapped = `<pre class="hljs"><code>${rendered}</code></pre>`;

        const customCss = `
/* tighten vertical rhythm and normalize */
pre.hljs { margin: 0; }
pre.hljs code { display:block; line-height: 1.35; font-size: 0.95rem; white-space: pre; }

/* line wrappers */
.hljs-line { display:block; position:relative; padding-left: 10px; }

/* diff styling */
.hljs-line.line-added   { background: rgba(46,160,67,0.18); }
.hljs-line.line-removed { background: rgba(248,81,73,0.18); }
.hljs-line.line-added::before,
.hljs-line.line-removed::before {
  content: ""; position:absolute; left:0; top:0; bottom:0; width:4px;
}
.hljs-line.line-added::before   { background: #2ea043; }
.hljs-line.line-removed::before { background: #da3633; }
        `;

        html = juice.inlineContent(wrapped, themeCss + customCss);
    }

    onMount(render);
    $effect(render);
</script>

<div>{@html html}</div>

<style>
    div{
        background: #0d1117;
        padding: calc(var(--padding) / 2);
        border: 1px solid currentColor;
        margin: 4px;
        overflow-x: auto;
    }
</style>
