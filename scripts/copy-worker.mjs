import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const worker = require.resolve('pdfjs-dist/legacy/build/pdf.worker.min.mjs');
const target = resolve('public/pdf.worker.min.mjs');
await mkdir(dirname(target), { recursive: true });
await copyFile(worker, target);
console.log('Configured the local PDF.js worker at /pdf.worker.min.mjs');
