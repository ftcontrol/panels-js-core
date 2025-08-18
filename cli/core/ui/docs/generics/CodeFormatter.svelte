<script lang="ts">
    import hljs from 'highlight.js';
    import juice from 'juice';
    import themeCss from 'highlight.js/styles/github-dark.css?raw';
    import {onMount} from "svelte";

    type Status = 'added' | 'removed' | '';
    const MARKER_AT_EOL = /\s*\/\/\s*\[svp!\s*(\+\+|--)\s*\]\s*$/;

    function renderOne(el: HTMLElement) {
        if (el.dataset.processed === 'true') return;

        const rawCode = el.dataset.code ?? '';
        let lang = (el.dataset.language ?? '').trim();

        const statuses: Status[] = [];
        const cleanedLines = rawCode.split(/\r?\n/).map((raw) => {
            const m = raw.match(MARKER_AT_EOL);
            statuses.push(m ? (m[1] === '++' ? 'added' : 'removed') : '');
            return m ? raw.replace(MARKER_AT_EOL, '') : raw;
        });

        const cleaned = cleanedLines.join('\n');

        if (!lang || !hljs.getLanguage(lang)) {
            const auto = hljs.highlightAuto(cleaned);
            lang =
                (auto.language && hljs.getLanguage(auto.language) && auto.language) ||
                'plaintext';
        }

        const rendered = cleanedLines
            .map((line, i) => {
                const status = statuses[i];
                const klass =
                    status ? (status === 'added' ? 'line-added' : 'line-removed') : '';
                const htmlLine = line.length
                    ? hljs.highlight(line, {language: lang, ignoreIllegals: true}).value
                    : '&nbsp;';
                return `<span class="hljs-line ${klass}">${htmlLine}</span>`;
            })
            .join('');

        const wrapped = `<pre class="hljs"><code>${rendered}</code></pre>`;

        const customCss = `
pre.hljs { margin: 0; }
pre.hljs code { display:block; line-height: 1.35; font-size: 0.95rem; white-space: pre; }

.hljs-line { display:block; position:relative; padding-left: 10px; }

.hljs-line.line-added   { background: rgba(46,160,67,0.18); }
.hljs-line.line-removed { background: rgba(248,81,73,0.18); }
.hljs-line.line-added::before,
.hljs-line.line-removed::before {
  content: ""; position:absolute; left:0; top:0; bottom:0; width:4px;
}
.hljs-line.line-added::before   { background: #2ea043; }
.hljs-line.line-removed::before { background: #da3633; }
`;

        const html = juice.inlineContent(wrapped, themeCss + customCss);

        el.innerHTML = html;

        // el.style.background = '#0d1117';
        // el.style.padding = 'calc(var(--padding, 16px) / 2)';
        // el.style.border = '1px solid currentColor';
        // el.style.margin = '4px';
        // el.style.overflowX = 'auto';

        el.dataset.processed = 'true';
    }

    function processAll(root: ParentNode = document) {
        const nodes = root.querySelectorAll<HTMLElement>('div.panels-code[data-code]');
        nodes.forEach(renderOne);
    }

    type CodePanelsController = {
        disconnect: () => void;
        refresh: () => void;
    };

    export function mountCodePanels(): CodePanelsController {
        processAll(document);

        const mo = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.type === 'childList') {
                    m.addedNodes.forEach((node) => {
                        if (!(node instanceof HTMLElement)) return;
                        if (node.matches?.('div.panels-code[data-code]')) {
                            renderOne(node);
                        }
                        const nested = node.querySelectorAll?.(
                            'div.panels-code[data-code]'
                        ) as NodeListOf<HTMLElement>;
                        nested?.forEach(renderOne);
                    });
                }
                if (m.type === 'attributes') {
                    const t = m.target as HTMLElement;
                    if (
                        t instanceof HTMLElement &&
                        t.matches('div.panels-code[data-code]') &&
                        (m.attributeName === 'data-code' ||
                            m.attributeName === 'data-language')
                    ) {
                        t.dataset.processed = 'false';
                        renderOne(t);
                    }
                }
            }
        });

        mo.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-code', 'data-language', 'class'],
        });

        return {
            disconnect: () => mo.disconnect(),
            refresh: () => processAll(document),
        };
    }

    onMount(() => {
        const controller = mountCodePanels()
        return () => {
            controller.disconnect()
        }
    })
</script>