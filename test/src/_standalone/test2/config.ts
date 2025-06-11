import Test2 from './index.svelte';

import type { TargetEmbeddedWindow } from 'svelte-standalone';

declare global {
	interface Window extends TargetEmbeddedWindow<typeof Test2, "test2"> {}
}