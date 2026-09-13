'use client';
import Link from 'next/link';
import {useState} from 'react';
import {ArrowUpRight,Facebook,Instagram,Linkedin,Mail,Menu,MessageCircle,X} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function Header(){
  const[open,setOpen]=useState(false);
  return <header className="sticky top-0 z-50 border-b border-[#303035]/80 bg-[#080808e6] backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between">
      <Link href="/" aria-label="Phintech Creatives home"><img src="/logo.jpg" alt="Phintech Creative" className="h-14 w-14 rounded-full object-cover"/></Link>
      <nav className="hidden items-center gap-8 text-sm font-bold text-[#b8b8be] md:flex">
        <Link className="transition hover:text-[#ffffff]" href="/about">About</Link>
        <Link className="transition hover:text-[#ffffff]" href="/services">Services</Link>
        <Link className="transition hover:text-[#ffffff]" href="/work">Work</Link>
        <Link className="transition hover:text-[#ffffff]" href="/faq">FAQ</Link>
        <Button asChild href="/contact" className="h-10 px-4">Contact <ArrowUpRight size={16}/></Button>
      </nav>
      <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="container flex flex-col gap-5 border-t border-[#303035] pb-6 pt-5 text-sm font-bold md:hidden"><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></nav>}
  </header>
}

export function Footer(){return <footer className="border-t border-[#303035] py-12"><div className="container grid gap-10 md:grid-cols-[1fr_auto_auto]"><div><p className="font-black text-[#ffffff]">Phintech<span className="text-[#ed168c]">.</span></p><p className="mt-3 max-w-xs text-sm leading-6 text-[#b8b8be]">Branding, design and technology from Lagos for ambitious businesses everywhere.</p></div><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#ffd400]">Explore</p><div className="mt-4 grid gap-3 text-sm text-[#b8b8be]"><Link href="/about" className="transition hover:text-[#ffffff]">About</Link><Link href="/services" className="transition hover:text-[#ffffff]">Services</Link><Link href="/work" className="transition hover:text-[#ffffff]">Work</Link><Link href="/faq" className="transition hover:text-[#ffffff]">FAQ</Link></div></div><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#ffd400]">Connect</p><div className="mt-4 flex gap-3"><a href="mailto:philtech91@gmail.com" aria-label="Email Phintech Creatives" className="rounded-full border border-[#303035] p-2 text-[#b8b8be] transition hover:border-[#ffd400] hover:text-[#ffd400]"><Mail size={17}/></a><a href="https://www.instagram.com/phintechcreatives/" target="_blank" rel="noreferrer" aria-label="Phintech Creatives on Instagram" className="rounded-full border border-[#303035] p-2 text-[#b8b8be] transition hover:border-[#ed168c] hover:text-[#ed168c]"><Instagram size={17}/></a><a href="https://www.facebook.com/phintechcreatives/" target="_blank" rel="noreferrer" aria-label="Phintech Creatives on Facebook" className="rounded-full border border-[#303035] p-2 text-[#b8b8be] transition hover:border-[#ffd400] hover:text-[#ffd400]"><Facebook size={17}/></a><a href="https://www.linkedin.com/company/phintechcreatives/" target="_blank" rel="noreferrer" aria-label="Phintech Creatives on LinkedIn" className="rounded-full border border-[#303035] p-2 text-[#b8b8be] transition hover:border-[#ffd400] hover:text-[#ffd400]"><Linkedin size={17}/></a></div></div><div className="border-t border-[#303035] pt-5 text-xs text-[#b8b8be] md:col-span-3 md:flex md:justify-between"><p>© {new Date().getFullYear()} Phintech Creatives. All rights reserved.</p><div className="mt-2 flex gap-5 md:mt-0"><Link href="/terms" className="transition hover:text-[#ffffff]">Terms</Link><Link href="/privacy" className="transition hover:text-[#ffffff]">Privacy</Link></div></div></div></footer>}

export function CTA(){return <Button asChild href="/contact">Start a project <ArrowUpRight size={18}/></Button>}

export function WhatsAppWidget(){return <a href="https://wa.me/2348100984938?text=Hello%20Phintech%20Creatives%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noreferrer" aria-label="Chat with Phintech Creatives on WhatsApp" className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] p-3 text-[#062b16] shadow-xl shadow-[#25D366]/20 transition duration-300 hover:scale-105 hover:bg-[#43e477] sm:bottom-7 sm:right-7 sm:pl-4"><span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-black opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">Chat on WhatsApp</span><MessageCircle size={24} strokeWidth={2.5}/></a>}
