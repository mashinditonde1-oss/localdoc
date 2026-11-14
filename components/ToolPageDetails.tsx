import Link from 'next/link';
import type { Tool } from '@/lib/catalog';
import { tools } from '@/lib/catalog';

type Guide = { title: string; summary: string; steps: string[]; faqs: [string, string][]; related: string[] };

const guides: Record<string, Guide> = {
  rotate: {
    title: 'How to rotate and flip images online for free',
    summary: 'Choose one or more images, rotate or flip each file independently, or apply the same rotation to the whole batch. Untouched images are left as they were.',
    steps: ['Add one or more images by browsing or dragging them into the upload area.', 'Use the controls beside each image, or choose an all-image action to rotate or flip the batch.', 'Click Rotate images and download the results, or a ZIP when you selected several images.'],
    faqs: [['Can I rotate multiple images at once?', 'Yes. Choose several images and use the batch controls, or adjust each image separately before exporting.'], ['Does rotating reduce image quality?', 'Quarter turns and flips are lossless in orientation, but the browser re-encodes the output image. Choose PNG for a lossless pixel format, or adjust JPG quality in the output settings.']],
    related: ['crop', 'compress', 'image-to-pdf'],
  },
  compress: {
    title: 'How to compress images online for free',
    summary: 'Reduce image file size in your browser by choosing a quality level and output format. Your original files stay unchanged.',
    steps: ['Add an image using the picker or drag and drop.', 'Choose an output format and compression quality.', 'Click Compress image and save the optimized copy.'],
    faqs: [['How much smaller will my image be?', 'It depends on the original format and image content. Lower quality settings usually create smaller JPG and WebP files.'], ['Does compression change my original file?', 'No. LocalDoc creates a new downloaded result and leaves the source file untouched.']],
    related: ['resize', 'convert-to-jpg', 'exif-viewer'],
  },
  'docx-to-pdf': {
    title: 'How to convert Word documents to PDF',
    summary: 'Render DOCX pages locally with tables, pictures, headers, and page composition together, then download the PDF.',
    steps: ['Choose a DOCX file from your device.', 'Wait while LocalDoc renders each document page in your browser.', 'Download the layout-preserving PDF. Its page content is flattened and not selectable.'],
    faqs: [['Are tables and logos preserved?', 'Yes. The converter renders each page as a whole, so tables, logos, and images stay positioned with the rest of the page.'], ['Can I select text in the PDF?', 'No. Pages are rasterized to preserve their appearance, so the exported PDF text is not selectable.']],
    related: ['pdf-to-word', 'sign-pdf', 'compress-pdf'],
  },
  'pdf-to-word': {
    title: 'How to convert PDF pages to Word',
    summary: 'Create a visual Word copy by placing each PDF page into its own Word page as an image. This keeps page layout and graphics intact.',
    steps: ['Choose a PDF file.', 'Let LocalDoc render each page locally at print-ready resolution.', 'Download the DOCX visual copy. Each page is preserved as an image, not editable text.'],
    faqs: [['Will tables, logos, and images stay in the same place?', 'Yes. Each PDF page is embedded as one image, preserving its full visual layout.'], ['Can I edit text in the Word document?', 'The page images are not editable text. This conversion prioritizes visual fidelity to the original PDF.']],
    related: ['docx-to-pdf', 'pdf-to-images', 'pdf-to-text'],
  },
};

function getGuide(tool: Tool): Guide {
  if (guides[tool.slug]) return guides[tool.slug];
  const title = tool.name.replace(/\s+/g, ' ').toLowerCase();
  const related = tools.filter(item => item.group === tool.group && item.slug !== tool.slug).slice(0, 3).map(item => item.slug);
  return {
    title: `How to ${title} online for free`,
    summary: `${tool.description} Open the tool, choose a file, adjust the available options, and save a new result. Processing happens in your browser.`,
    steps: ['Choose a file using the picker or drag and drop it into the upload area.', 'Review the available settings and make any changes you need.', `Run ${tool.name} and download the processed copy.`],
    faqs: [[`Are files uploaded when I use ${tool.name}?`, 'No. The file is processed in your browser and is not sent to LocalDoc servers.'], [`Does ${tool.name} change my original file?`, 'No. LocalDoc creates a new downloadable result and leaves your original file unchanged.']],
    related,
  };
}

export function ToolPageDetails({ tool }: { tool: Tool }) {
  const guide = getGuide(tool);
  const related = guide.related.map(slug => tools.find(item => item.slug === slug)).filter((item): item is Tool => Boolean(item));
  return <section className="tool-seo-content">
    <section className="tool-guide" aria-labelledby="tool-guide-heading"><span className="section-kicker">GUIDE</span><h2 id="tool-guide-heading">{guide.title}</h2><p>{guide.summary}</p><ol className="tool-guide-steps">{guide.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>
    <section className="tool-faq" aria-labelledby="tool-faq-heading"><span className="section-kicker">FAQ</span><h2 id="tool-faq-heading">Frequently asked questions</h2><div>{guide.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></section>
    {related.length > 0 && <section className="tool-related" aria-labelledby="related-heading"><span className="section-kicker">RELATED TOOLS</span><h2 id="related-heading">Continue with another tool</h2><div>{related.map(item => <Link key={item.slug} className="related-tool" href={`/${item.slug}/`}><span>{item.name}</span><small>{item.description}</small><b aria-hidden="true">↗</b></Link>)}</div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: guide.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }) }} />
  </section>;
}
