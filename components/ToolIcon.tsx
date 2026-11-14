import type { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
  compress: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/><path d="m9 9 6 6m0-6-6 6"/></>,
  resize: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/><path d="M8 8 3 3m13 0-5 5m5 8 5 5m-13 0 5-5"/></>,
  crop: <><path d="M6 3v12a3 3 0 0 0 3 3h12M3 6h12a3 3 0 0 1 3 3v12"/></>,
  convert: <><path d="M7 7h12l-3-3m3 3-3 3M17 17H5l3 3m-3-3 3-3"/><path d="M5 7v10m14-10v10"/></>,
  editor: <><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3"/><path d="M2 14h4m4-6h4m4 6h4"/></>,
  upscale: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M10.5 7v7m-3.5-3.5h7"/></>,
  background: <><path d="M4 18 18 4a2.1 2.1 0 0 1 3 3L7 21H4z"/><path d="m14 8 3 3M3 3l2 2M3 9h3m3-6v3"/></>,
  watermark: <><path d="M4 6h16M4 12h10M4 18h8"/><path d="m18 13 1.5 3.5L23 18l-3.5 1.5L18 23l-1.5-3.5L13 18l3.5-1.5z"/></>,
  meme: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M6 8h12M6 16h12"/><path d="m9 5 1 6m5-6-1 6"/></>,
  rotate: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9a7 7 0 0 1 11.8-2L20 12M4 12l2.6 5a7 7 0 0 0 11.8-2"/></>,
  code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-12-4 14"/></>,
  blur: <><path d="M12 3s7 7.1 7 12a7 7 0 0 1-14 0c0-4.9 7-12 7-12Z"/><path d="M9 16a3 3 0 0 0 3 2"/></>,
  film: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18m10-18v18M3 8h4m-4 8h4m10-8h4m-4 8h4"/></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.7-3.1 2 2 0 0 1 1.7-3.1H18a3 3 0 0 0 3-3c0-4.9-4-8.8-9-8.8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="15" cy="8" r="1"/></>,
  favicon: <><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/><circle cx="12" cy="12" r="4"/></>,
  metadata: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M4 17c1.5-3 7.5-3 9 0m2-6h4m-4 4h4"/></>,
  data: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h.01M7 15h.01M11 9h6m-6 6h6"/></>,
  merge: <><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/><path d="M8 12h8m-3-3 3 3-3 3"/></>,
  split: <><path d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6M18 3v6a3 3 0 0 1-3 3M3 3h6M15 3h6M3 21h6m6 0h6"/></>,
  page: <><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v6h5M9 14h6m-6 3h6"/></>,
  sign: <><path d="m4 16 9.5-9.5a2.1 2.1 0 0 1 3 3L7 19l-4 1z"/><path d="m14 6 4 4M3 21h18"/></>,
  redact: <><path d="M3 12s3.2-6 9-6 9 6 9 6-3.2 6-9 6-9-6-9-6Z"/><path d="m4 4 16 16M10 10a3 3 0 0 0 4 4"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/></>,
  text: <><path d="M4 5h16M12 5v14M8 19h8M8 9h8"/></>,
  word: <><path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M7 12l1.5 5 1.5-4 1.5 4 1.5-5"/></>,
  spreadsheet: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 9v11m6-11v11"/></>,
  presentation: <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v5m-4 0h8M8 12l3-3 2 2 3-4"/></>,
};

const iconForSlug: Record<string, string> = {
  'compress-image': 'compress', 'compress': 'compress', resize: 'resize', crop: 'crop',
  'convert-to-jpg': 'convert', 'convert-from-jpg': 'convert', 'photo-editor': 'editor', upscale: 'upscale',
  'remove-background': 'background', watermark: 'watermark', 'meme-generator': 'meme', rotate: 'rotate',
  'html-to-image': 'code', 'blur-face': 'blur', 'make-gif': 'film', 'image-to-pdf': 'image',
  'color-palette': 'palette', 'favicon-generator': 'favicon', 'exif-viewer': 'metadata', 'image-to-base64': 'data',
  'merge-pdf': 'merge', 'split-pdf': 'split', 'compress-pdf': 'compress', 'rotate-pdf': 'rotate',
  'page-numbers': 'page', 'watermark-pdf': 'watermark', 'sign-pdf': 'sign', 'redact-pdf': 'redact',
  'protect-pdf': 'lock', 'pdf-to-images': 'image', 'pdf-to-text': 'text', 'docx-to-pdf': 'word',
  'xlsx-to-pdf': 'spreadsheet', 'pptx-to-pdf': 'presentation', 'pdf-to-word': 'word',
};

export function ToolIcon({ slug, className = '' }: { slug: string; className?: string }) {
  const name = iconForSlug[slug] || 'page';
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

export function DocumentMark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h6"/></svg>;
}
