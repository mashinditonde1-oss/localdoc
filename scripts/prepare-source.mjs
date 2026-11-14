import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const JSZip = require('jszip');
const root = resolve('.');
const zip = new JSZip();
const topFiles = ['README.md', 'THIRD_PARTY_NOTICES.md', 'package.json', 'pnpm-lock.yaml', 'tsconfig.json', 'next.config.ts', 'next-env.d.ts', '.npmrc'];
for (const file of topFiles) {
  try { zip.file(file, await readFile(join(root, file))); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
async function addTree(dir) {
  for (const entry of await readdir(join(root, dir), { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await addTree(path);
    else if (path !== 'public/localdoc-source.zip') zip.file(relative(root, path).replaceAll('\\', '/'), await readFile(join(root, path)));
  }
}
for (const dir of ['app', 'components', 'lib', 'scripts', 'types', 'public']) {
  try { await addTree(dir); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
zip.file('licenses/AGPL-3.0.md', await readFile(join(root, 'node_modules/@imgly/background-removal/LICENSE.md')));
const output = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
await mkdir(join(root, 'public'), { recursive: true });
await writeFile(join(root, 'public/localdoc-source.zip'), output);
console.log('Prepared the downloadable LocalDoc source and license archive.');
