import * as $ from 'svelte/internal/client';

// generated during release, do not modify

const PUBLIC_VERSION = '5';

if (typeof window !== 'undefined') {
	// @ts-expect-error
	((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
}

var root = $.from_html(`<p></p>`);

function Counter($$anchor) {
	var p = root();

	p.textContent = '0';
	$.append($$anchor, p);
}

export { Counter as default };
//# sourceMappingURL=counter.js.map
