import { notFound } from 'next/navigation';
import { tools } from '@/lib/catalog';
import { ToolWorkspace } from '@/components/ToolWorkspace';

export function generateStaticParams(){return tools.map(tool=>({slug:tool.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const tool=tools.find(t=>t.slug===slug);return tool?{title:`${tool.name} | LocalDoc`,description:`${tool.description} Process files privately on your device with LocalDoc.`}:{title:'Tool not found | LocalDoc'};}
export default async function ToolPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const tool=tools.find(t=>t.slug===slug);if(!tool)notFound();return <ToolWorkspace tool={tool}/>}
