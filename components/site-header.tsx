'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Menu, X } from 'lucide-react';
import { useState } from 'react';
export default function SiteHeader(){
 const {data:session}=useSession(); const [open,setOpen]=useState(false);
 const links=[['Features','#features'],['How it works','#how-it-works'],['Pricing','/pricing'],['Editor','/editor']];
 return <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><Link href="/" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet text-white"><Box size={21}/></span><span className="text-xl font-black tracking-tight">betty<span className="text-violet">.</span></span></Link><nav className="hidden items-center gap-7 md:flex">{links.map(([label,href])=><Link key={label} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-violet">{label}</Link>)}</nav><div className="hidden items-center gap-3 md:flex">{session?<><Link href="/editor" className="btn-secondary">My workspace</Link><button onClick={()=>signOut({callbackUrl:'/'})} className="text-sm font-bold text-slate-600">Sign out</button></>:<><Link href="/sign-in" className="text-sm font-bold">Sign in</Link><Link href="/sign-up" className="btn-primary">Get started <span>↗</span></Link></>}</div><button className="md:hidden" aria-label="Toggle menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<div className="border-t bg-white px-5 py-4 md:hidden">{links.map(([label,href])=><Link onClick={()=>setOpen(false)} key={label} href={href} className="block py-3 font-semibold">{label}</Link>)}<Link href={session?'/editor':'/sign-in'} className="mt-2 block font-bold text-violet">{session?'Open workspace':'Sign in'}</Link></div>}</header>
}
