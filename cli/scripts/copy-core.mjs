import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../core');
const DST = path.resolve(__dirname, '../dist/core');

await fs.ensureDir(DST);

const entries = await fs.glob('**/*', { cwd: SRC, dot: true });
for (const rel of entries) {
    const abs = path.join(SRC, rel);
    const stat = await fs.lstat(abs);
    if (stat.isDirectory()) continue;
    if (rel.toLowerCase().endsWith('.svelte')) {
        const out = path.join(DST, rel);
        await fs.ensureDir(path.dirname(out));
        await fs.copy(abs, out);
    }
}
console.log('Copied .svelte files from core -> dist/core');
