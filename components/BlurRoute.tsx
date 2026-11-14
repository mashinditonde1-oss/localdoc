'use client';
import { useRef, useState } from 'react';
import { BlurWorkspace } from '@/components/BlurWorkspace';

export function BlurRoute(){const [file,setFile]=useState<File|null>(null),input=useRef<HTMLInputElement>(null);return <><input ref={input} hidden type="file" accept="image/*" onChange={e=>{setFile(e.target.files?.[0]||null);e.currentTarget.value=''}}/><BlurWorkspace file={file} onPick={()=>input.current?.click()}/></>}
