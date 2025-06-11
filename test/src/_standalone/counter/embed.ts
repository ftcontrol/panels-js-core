import { embedMultiple } from 'svelte-standalone'

import Counter from './index.svelte'

embedMultiple(Counter, 'counter')