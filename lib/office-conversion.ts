export type ConversionProgress = (message: string, fraction: number) => void;

/** Render real DOCX pages, including their layout, tables, headers, and pictures, before PDF export. */
export async function wordToPdf(file: File, report: ConversionProgress) {
  const [{ renderAsync }, html2canvas, { jsPDF }] = await Promise.all([
    import('docx-preview'),
    import('html2canvas'),
    import('jspdf'),
  ]);
  const stage = document.createElement('div');
  const styles = document.createElement('div');
  stage.className = 'localdoc-word-render';
  Object.assign(stage.style, { position: 'fixed', top: '0', left: '-20000px', zIndex: '-1', width: 'max-content', background: '#dedede' });
  styles.className = 'localdoc-word-styles';
  document.body.append(stage, styles);
  try {
    report('Reading Word page layout…', 0.08);
    await renderAsync(new Uint8Array(await file.arrayBuffer()), stage, styles, {
      breakPages: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreFonts: false,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
      renderAltChunks: true,
      useBase64URL: true,
    });
    const pages = Array.from(stage.querySelectorAll<HTMLElement>('.docx-wrapper > section.docx, section.docx'));
    if (!pages.length) throw new Error('No Word pages could be rendered. Check that this is a valid DOCX file.');
    report(`Rendering ${pages.length} page${pages.length === 1 ? '' : 's'} with tables and images…`, 0.2);
    let pdf: InstanceType<typeof jsPDF> | undefined;
    for (let index = 0; index < pages.length; index++) {
      const page = pages[index];
      const bounds = page.getBoundingClientRect();
      const width = Math.max(1, bounds.width || page.offsetWidth);
      const height = Math.max(1, bounds.height || page.offsetHeight);
      if (!width || !height) continue;
      const canvas = await html2canvas.default(page, { scale: 2, backgroundColor: '#ffffff', logging: false, useCORS: false, imageTimeout: 30000, width, height });
      const pageWidth = width * 0.75;
      const pageHeight = height * 0.75;
      if (!pdf) pdf = new jsPDF({ orientation: pageWidth > pageHeight ? 'landscape' : 'portrait', unit: 'pt', format: [pageWidth, pageHeight], compress: true });
      else pdf.addPage([pageWidth, pageHeight], pageWidth > pageHeight ? 'landscape' : 'portrait');
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      report(`Rendering page ${index + 1} of ${pages.length}…`, 0.2 + 0.75 * ((index + 1) / pages.length));
    }
    if (!pdf) throw new Error('The Word file did not contain any printable pages.');
    return pdf.output('blob');
  } finally {
    stage.remove();
    styles.remove();
  }
}

/** Preserve each PDF page visually in a separate Word page, including logos, tables and graphics. */
export async function pdfToVisualWord(file: File, report: ConversionProgress) {
  const [{ Document, ImageRun, Packer, Paragraph, SectionType }, pdfjs] = await Promise.all([
    import('docx'),
    import('pdfjs-dist/legacy/build/pdf.mjs'),
  ]);
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  const source = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const sections = [];
  for (let index = 1; index <= source.numPages; index++) {
    report(`Preserving PDF page ${index} of ${source.numPages}…`, index / source.numPages);
    const page = await source.getPage(index);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare the page image.');
    await page.render({ canvasContext: context, viewport }).promise;
    const jpeg = await new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error(`Could not render PDF page ${index}.`)), 'image/jpeg', 0.96));
    const bytes = new Uint8Array(await jpeg.arrayBuffer());
    const pageAtPdfPoints = page.getViewport({ scale: 1 });
    const pageWidthPt = pageAtPdfPoints.width;
    const pageHeightPt = pageAtPdfPoints.height;
    sections.push({
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: { width: Math.round(pageWidthPt * 20), height: Math.round(pageHeightPt * 20) },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      },
      children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [new ImageRun({ type: 'jpg', data: bytes, transformation: { width: pageWidthPt * 4 / 3, height: pageHeightPt * 4 / 3 } })] })],
    });
    canvas.width = 0;
    canvas.height = 0;
  }
  const wordDocument = new Document({ sections });
  return Packer.toBlob(wordDocument);
}
