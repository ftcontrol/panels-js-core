import type { ComponentProps } from 'svelte';
import type { MultipleEmbedWindow } from 'svelte-standalone';

import Counter from './index.svelte';

export type CounterProps = ComponentProps<Counter>;

export const defaultConfig: CounterProps = {};

declare global {
	interface Window extends MultipleEmbedWindow<typeof Counter, 'counter'> {}
}