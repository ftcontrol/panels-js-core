import * as $ from 'svelte/internal/client';

// generated during release, do not modify

const PUBLIC_VERSION = '5';

if (typeof window !== 'undefined') {
	// @ts-expect-error
	((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
}

function increment(n) {
    return n + 1;
}

var on_click = (_, count) => {
	$.set(count, increment($.get(count)), true);
};

var root = $.from_html(`<p class="svelte-17bjde4"> </p> <button>Increment</button>`, 1);

function Counter($$anchor, $$props) {
	$.push($$props, true);

	let count = $.state(0);
	var fragment = root();
	var p = $.first_child(fragment);
	var text = $.child(p, true);

	$.reset(p);

	var button = $.sibling(p, 2);

	button.__click = [on_click, count];
	$.template_effect(() => $.set_text(text, $.get(count)));
	$.append($$anchor, fragment);
	$.pop();
}

$.delegate(['click']);

export { Counter as default };
//# sourceMappingURL=counter.js.map
