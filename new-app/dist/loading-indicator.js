import * as $ from 'svelte/internal/client';

// generated during release, do not modify

const PUBLIC_VERSION = '5';

if (typeof window !== 'undefined') {
	// @ts-expect-error
	((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
}

var root_1 = $.from_html(`<div class="circle svelte-tom4i2"></div>`);
var root = $.from_html(`<div class="loading-indicator svelte-tom4i2"></div>`);

function LoadingIndicator($$anchor, $$props) {
	$.push($$props, true);

	let size = $.prop($$props, 'size', 3, "64px"),
		strokeWidth = $.prop($$props, 'strokeWidth', 3, "6px"),
		ariaLabel = $.prop($$props, 'ariaLabel', 3, "Loading"),
		color = $.prop($$props, 'color', 3, "black");

	var div = root();

	$.each(div, 20, () => [...new Array(4)], $.index, ($$anchor, index) => {
		var div_1 = root_1();

		$.template_effect(() => {
			$.set_attribute(div_1, 'key', index);
			$.set_style(div_1, `border-width: ${strokeWidth()}; height: ${size()}; width: ${size()}`);
		});

		$.append($$anchor, div_1);
	});

	$.reset(div);

	$.template_effect(() => {
		$.set_attribute(div, 'aria-label', ariaLabel());
		$.set_style(div, `height: ${size()}; width: ${size()}; --loader-color: ${color()};`);
	});

	$.append($$anchor, div);
	$.pop();
}

export { LoadingIndicator as default };
//# sourceMappingURL=loading-indicator.js.map
