'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { tools } from '@/lib/catalog';
import { ToolIcon } from '@/components/ToolIcon';

export function Shell({ children }: { children: React.ReactNode }) {
  const [open,setOpen]=useState(false),[query,setQuery]=useState('');
  const input=useRef<HTMLInputElement>(null); const router=useRouter(); const pathname=usePathname();
  const results=useMemo(()=>tools.filter(t=>`${t.name} ${t.description} ${t.group}`.toLowerCase().includes(query.toLowerCase())).slice(0,10),[query]);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(v=>!v)} if(e.key==='Escape')setOpen(false)};const onSearch=()=>setOpen(true);window.addEventListener('keydown',onKey);window.addEventListener('localdoc:search',onSearch);return()=>{window.removeEventListener('keydown',onKey);window.removeEventListener('localdoc:search',onSearch)}},[]);
  useEffect(()=>{setOpen(false)},[pathname]);
  useEffect(()=>{if(open){setQuery('');setTimeout(()=>input.current?.focus(),20)}},[open]);
  return <><header className="topbar"><div className="nav-inner"><Link className="brand" href="/"><span className="brand-mark"><img src="/localdoc-logo.png" alt=""/></span><span>LocalDoc</span></Link><nav><a href="/#tools">Tools</a><a href="/#workflows">Workflows</a><a href="/#faq">FAQ</a></nav><button className="search-trigger" onClick={()=>setOpen(true)}><span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/></svg>Search tools</span><kbd>Ctrl K</kbd></button></div></header>{children}<footer className="footer"><Link className="brand" href="/"><span className="brand-mark"><img src="/localdoc-logo.png" alt=""/></span>LocalDoc</Link><span>Private file tools that stay on your device.</span><a href="/#faq">How it works</a><a href="/localdoc-source.zip" download>Source code &amp; licenses</a></footer>{open&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><div className="command" role="dialog" aria-modal="true" aria-label="Search tools"><div className="command-input"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/></svg><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search images, PDFs, Office tools…"/><button onClick={()=>setOpen(false)}>Esc</button></div><div className="command-results">{results.length?results.map((t,i)=><button className="command-item" key={t.slug} onClick={()=>router.push(`/${t.slug}/`)}><span className="tool-glyph"><ToolIcon slug={t.slug}/></span><span><b>{t.name}</b><small>{t.description}</small></span><em>{i===0?'↵':t.group}</em></button>):<p className="no-results">No matching tools. Try “PDF” or “resize”.</p>}</div><div className="command-foot">Navigate tools quickly <span><kbd>ESC</kbd> close</span></div></div></div>}</>
}

export function OpenSearchButton({children,className}:{children:React.ReactNode;className:string}){return <button className={className} type="button" onClick={()=>window.dispatchEvent(new Event('localdoc:search'))}>{children}</button>}
