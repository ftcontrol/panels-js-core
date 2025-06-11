import { autoEmbedWithTarget } from 'svelte-standalone'

import Testwidget from './index.svelte'

autoEmbedWithTarget(Testwidget, 'testwidget')