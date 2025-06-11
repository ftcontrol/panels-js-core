import Da from './index.svelte';

import type { TargetEmbeddedWindow } from 'svelte-standalone';

declare global {
	interface Window extends TargetEmbeddedWindow<typeof Da, "da"> {}
}