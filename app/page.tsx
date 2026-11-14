import Link from 'next/link';
import { tools, workflows } from '@/lib/catalog';
import { OpenSearchButton } from '@/components/Shell';
import { ToolIcon } from '@/components/ToolIcon';

const faqs = [
  ['Are my files uploaded anywhere?', 'No. LocalDoc processes your selected files in your browser. The files are not sent to our servers.'],
  ['Is LocalDoc free to use?', 'Yes. Every listed tool is free to use, with no account, imposed watermark, or paid conversion API.'],
  ['Does Word to PDF keep tables, logos, and images?', 'It renders the document pages in your browser before exporting them. Tables, pictures, and page composition stay together visually. PDF pages in the reverse PDF to Word tool are embedded as page images so their layout is preserved; that output is not editable text.'],
  ['Will Office files look exactly the same as Microsoft Office?', 'Word pages are rendered from their DOCX layout and Excel sheets are rebuilt as tables. Some Office-specific fonts, formulas, macros, animation, or effects can still differ.'],
  ['Can I use the tools offline?', 'After the site and its required libraries have loaded, most file processing happens offline in this browser. Background removal downloads its model the first time it is used.'],
  ['Are there file or page limits?', 'There are no imposed upload limits. Very large documents can still be limited by available memory on your device.'],
];

const guides = [
  ['Compress an image', 'Open Compress image, choose a photo, set the output quality, and download the smaller copy.', 'compress'],
  ['Resize photos', 'Choose Resize image, set the dimensions in pixels, then save the resized file.', 'resize'],
  ['Merge PDF files', 'Open Merge PDF, select two or more PDFs in the order you want, then combine them locally.', 'merge-pdf'],
  ['Convert Word to PDF', 'Choose a DOCX file and run Word to PDF. Page layouts, tables, and embedded images are rendered together.', 'docx-to-pdf'],
  ['Convert PDF to Word', 'Export a visual Word copy with one preserved PDF page per page. The page images keep the original composition.', 'pdf-to-word'],
  ['Remove an image background', 'Choose Remove background and run the on-device AI model to download a transparent PNG.', 'remove-background'],
  ['Blur a private area', 'Open Blur image, drag across a face or detail, choose blur or pixelation, then export the edited image.', 'blur-face'],
  ['Convert images to PDF', 'Add images in the desired order, set image quality, then create one PDF.', 'image-to-pdf'],
];

export default function Home() {
  return <main id="main">
    <section className="hero"><div className="eyebrow"><span className="live-dot"/> {tools.length} free tools · 100% private</div><h1>All your file tools.<br/><span>Nothing leaves your device.</span></h1><p>Every image, PDF, and Office task, handled right in your browser. No upload, account, or watermark.</p><div className="hero-actions"><a className="button primary" href="#tools">Explore all tools <span>›</span></a><OpenSearchButton className="button secondary"><span className="search-symbol" aria-hidden="true"/> Search tools <kbd>Ctrl K</kbd></OpenSearchButton></div></section>

    <section className="sponsors" aria-label="Sponsors"><span className="section-kicker">SPONSORS</span><div className="sponsor-row">{[1,2,3,4].map(n=><a className="sponsor-slot" key={n} href={`#sponsor-${n}`}><span>＋</span>{n===1?'Be the first sponsor':'Your logo here'}</a>)}</div></section>

    <section className="section tools-section" id="tools"><div className="section-heading"><div><span className="section-kicker">THE TOOLBOX</span><h2>Every tool you need.<br/><span>Free, right here.</span></h2></div><p>Pick a tool for a quick image edit, a PDF task, or an Office file conversion. Your files stay in this browser.</p></div>{(['Image','PDF','Office'] as const).map(group=><div className="tool-group" key={group}><div className="group-title"><h3>{group==='Office'?'Office conversion':`${group} tools`}</h3><span>{tools.filter(t=>t.group===group).length} tools</span></div><div className="tool-grid">{tools.filter(t=>t.group===group).map(t=><Link className="tool-card" href={`/${t.slug}/`} key={t.slug}><span className="card-icon"><ToolIcon slug={t.slug}/></span><div><h4>{t.name}</h4><p>{t.description}</p></div><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</div></div>)}</section>

    <section className="section workflow-section" id="workflows"><div className="center-heading"><span className="section-kicker">WORKFLOWS BUILT FOR SPEED</span><h2>Two steps to <span>done.</span></h2><p>Common file jobs, mapped into a simple sequence.</p></div><div className="workflow-grid">{workflows.map((w,i)=><article className="workflow-card" key={w.title}><div className="workflow-number">0{i+1}</div><h3>{w.title}</h3><p>{w.text}</p><div className="workflow-steps">{w.steps.map((s,j)=>{const target=tools.find(t=>t.name===s);return <span key={`${s}-${j}`}>{target?<Link href={`/${target.slug}/`}>{s}</Link>:<span>{s}</span>}{j<w.steps.length-1&&<b aria-hidden="true">→</b>}</span>})}</div></article>)}</div></section>

    <section className="section feature-steps" id="features"><div><span className="feature-number">01</span><h3>Drop it.</h3><p>Your images, PDFs, and documents stay on your device.</p></div><div><span className="feature-number">02</span><h3>Pick it.</h3><p>Compress, convert, organize, or edit with a few clear controls.</p></div><div><span className="feature-number">03</span><h3>Done.</h3><p>Download your result. No account, upload, or watermark.</p></div></section>

    <section className="section about-section"><div className="center-heading"><span className="section-kicker">WHAT IS LOCALDOC?</span><h2>Private file tools that<br/><span>never upload your files.</span></h2><p>LocalDoc is a free collection of image, PDF, and Office utilities. Browser-based conversion uses local processing, Canvas, and document libraries so your files remain on your device.</p></div><div className="stats-grid"><div><b>{tools.length}</b><span>free file tools</span></div><div><b>0</b><span>files uploaded</span></div><div><b>$0</b><span>forever, no sign-up</span></div><div><b>3</b><span>file tool categories</span></div></div></section>

    <section className="section comparison" id="comparison"><div className="center-heading"><span className="section-kicker">COMPARE</span><h2>LocalDoc vs. <span>upload-based tools</span></h2></div><div className="table-wrap"><table><thead><tr><th>FEATURE</th><th>LOCALDOC</th><th>TYPICAL ONLINE TOOL</th></tr></thead><tbody>{[['Where files are processed','On your device, in this browser','Uploaded to a remote server'],['Price','Free, every tool','Free tier, then paid plans or credits'],['Account required','No','Often'],['Watermarks on results','Never','Sometimes on the free tier'],['File and batch limits','No imposed limits','Daily or per-file caps'],['Works offline','Yes, after the first visit','Usually no']].map(row=><tr key={row[0]}><th>{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table></div></section>

    <section className="section pricing-section"><div className="center-heading"><span className="section-kicker">PRICING</span><h2>One plan. <span>It’s free.</span></h2><p>Your device does the work, so there is nothing to charge for.</p></div><article className="price-card"><span className="section-kicker">EVERYTHING INCLUDED</span><div className="price-amount">$0 <small>/ forever</small></div><p>All {tools.length} tools. No account. No imposed watermarks.</p><a className="button primary" href="#tools">Start for free <span>›</span></a><ul><li>Unlimited local processing</li><li>Image, PDF, and Office tools</li><li>Files stay on your device</li><li>No watermarks or sign-up</li></ul></article></section>

    <section className="section faq-section" id="guides"><div className="center-heading"><span className="section-kicker">QUICK ANSWERS</span><h2>How do I…</h2></div><div className="guide-grid">{guides.map(([title,body,slug])=><Link className="guide-card" href={`/${slug}/`} key={title}><span><ToolIcon slug={slug}/></span><div><h3>How to {title.toLowerCase()}</h3><p>{body}</p></div><b aria-hidden="true">↗</b></Link>)}</div><div className="faq-block"><div className="center-heading"><span className="section-kicker">FAQ</span><h2>Frequently asked questions</h2></div><div className="faq-grid">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></div></section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))})}}/>
  </main>;
}
