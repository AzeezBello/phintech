'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Shield,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { index: '01', href: '/about', label: 'About' },
  { index: '02', href: '/services', label: 'Services' },
  { index: '03', href: '/work', label: 'Archive' },
  { index: '04', href: '/faq', label: 'FAQ' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-xl">
      <div className="border-b border-white/[0.05] bg-[#0c0d10]/90">
        <div className="container flex h-8 items-center justify-between text-[11px] font-mono tracking-wider text-[#a1a1aa]">
          <div className="flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#ffd400]"
              aria-hidden="true"
            />
            <span className="uppercase">
              Phintech Atelier <span className="hidden sm:inline">// Surulere, Lagos (06°30′N 03°21′E)</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[#71717a]">
              PRINT • PORTAL REGISTRATIONS • BRAND &amp; WEB
            </span>
            <Link
              href="/contact"
              className="text-[#f5f4f0] transition-colors hover:text-[#ffd400]"
            >
              Desk Open Mon–Fri →
            </Link>
          </div>
        </div>
      </div>

      <div className="container flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Phintech Creatives home"
          className="group inline-flex items-center gap-3.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]"
        >
          <img
            src="/logo.jpg"
            alt="Phintech Creatives mark"
            className="spring-scale h-11 w-11 rounded-full border border-white/15 object-cover group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none tracking-[-0.04em] text-[#f5f4f0]">
              Phintech<span className="text-[#ffd400]">.</span>
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a1a1aa]">
              Creatives Studio
            </span>
          </div>
        </Link>

        <nav
          aria-label="Main navigation"
          className="pill-row-balance hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'action-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150',
                  active
                    ? 'bg-white/[0.08] text-[#ffd400]'
                    : 'text-[#a1a1aa] hover:bg-white/[0.04] hover:text-[#f5f4f0]'
                )}
              >
                <span className="font-mono text-[10px] tracking-widest opacity-60">
                  {item.index}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="ml-3 border-l border-[#232429] pl-4">
            <Button asChild href="/contact" size="sm" className="h-10 px-4">
              Start a brief <ArrowUpRight size={15} />
            </Button>
          </div>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="mobile-navigation container flex flex-col gap-2 border-t border-[#232429] bg-[#0c0d10] pb-6 pt-4 text-sm font-semibold md:hidden"
        >
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors',
                  active
                    ? 'bg-[#ffd400]/15 text-[#ffd400]'
                    : 'text-[#d4d4d8] hover:bg-white/[0.04]'
                )}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs opacity-60">{item.index}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Button
              asChild
              href="/contact"
              className="w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Start a project brief <ArrowUpRight size={16} />
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#232429] bg-[#090a0c] py-16">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr_0.85fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Phintech Creatives"
                className="h-9 w-9 rounded-full border border-white/15 object-cover"
                loading="lazy"
              />
              <Link
                href="/"
                className="font-display text-2xl font-bold tracking-[-0.04em] text-[#f5f4f0]"
              >
                Phintech<span className="text-[#ffd400]">.</span>
              </Link>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#a1a1aa]">
              A multidisciplinary print house, official registration desk, and
              creative technology studio crafting sharp visual systems and everyday
              print essentials in Lagos.
            </p>
            <div className="mt-6 flex items-start gap-2.5 text-xs text-[#a1a1aa]">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#ffd400]" />
              <span>
                1 Alawode Street, off Kilo Bus Stop, Surulere, Lagos • Mon–Fri,
                9:00am–5:00pm
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
              01 // Capabilities
            </p>
            <div className="mt-4 grid gap-2.5 text-sm text-[#a1a1aa]">
              <Link href="/services" className="transition-colors hover:text-[#f5f4f0]">
                Print &amp; Large-Format
              </Link>
              <Link href="/services" className="transition-colors hover:text-[#f5f4f0]">
                Books &amp; Office Supply
              </Link>
              <Link href="/services" className="transition-colors hover:text-[#f5f4f0]">
                JAMB / WAEC / NYSC Desk
              </Link>
              <Link href="/services" className="transition-colors hover:text-[#f5f4f0]">
                Brand Identity &amp; Web
              </Link>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
              02 // Directory
            </p>
            <div className="mt-4 grid gap-2.5 text-sm text-[#a1a1aa]">
              <Link href="/about" className="transition-colors hover:text-[#f5f4f0]">
                Studio Dossier
              </Link>
              <Link href="/work" className="transition-colors hover:text-[#f5f4f0]">
                Selected Archive (74+)
              </Link>
              <Link href="/faq" className="transition-colors hover:text-[#f5f4f0]">
                Client FAQ
              </Link>
              <Link href="/contact" className="transition-colors hover:text-[#f5f4f0]">
                Initiate a Brief
              </Link>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
              03 // Studio Channels
            </p>
            <p className="mt-4 text-sm text-[#a1a1aa]">
              Direct desk enquiries &amp; file dispatches:
            </p>
            <a
              href="mailto:philtech91@gmail.com"
              className="mt-1 inline-block font-mono text-xs text-[#f5f4f0] underline decoration-[#ffd400]/50 underline-offset-4 transition-colors hover:text-[#ffd400]"
            >
              philtech91@gmail.com
            </a>
            <div className="mt-5 flex gap-2.5">
              <a
                href="mailto:philtech91@gmail.com"
                aria-label="Email Phintech Creatives"
                className="action-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2e3036] bg-[#121317] text-[#a1a1aa] hover:border-[#ffd400] hover:text-[#ffd400]"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://www.instagram.com/phintechcreatives/"
                target="_blank"
                rel="noreferrer"
                aria-label="Phintech Creatives on Instagram"
                className="action-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2e3036] bg-[#121317] text-[#a1a1aa] hover:border-[#ffd400] hover:text-[#ffd400]"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/phintechcreatives/"
                target="_blank"
                rel="noreferrer"
                aria-label="Phintech Creatives on Facebook"
                className="action-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2e3036] bg-[#121317] text-[#a1a1aa] hover:border-[#ffd400] hover:text-[#ffd400]"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/phintechcreatives/"
                target="_blank"
                rel="noreferrer"
                aria-label="Phintech Creatives on LinkedIn"
                className="action-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2e3036] bg-[#121317] text-[#a1a1aa] hover:border-[#ffd400] hover:text-[#ffd400]"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col justify-between gap-4 text-xs text-[#a1a1aa] sm:flex-row sm:items-center">
          <p className="font-mono tabular-nums">
            © {new Date().getFullYear()} PHINTECH CREATIVES STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="pill-row-balance gap-5">
            <Link href="/terms" className="transition-colors hover:text-[#f5f4f0]">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-[#f5f4f0]">
              Privacy
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 font-mono font-bold text-[#a1a1aa] transition-colors hover:text-[#ffd400]"
            >
              <Shield size={12} /> Admin Console
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CTA() {
  return (
    <Button asChild href="/contact" size="lg">
      Start a project <ArrowUpRight size={18} />
    </Button>
  );
}

export function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/2348100984938?text=Hello%20Phintech%20Creatives%2C%20I%27d%20like%20to%20start%20a%20project."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Phintech Creatives on WhatsApp"
      className="action-button group fixed bottom-5 right-5 z-40 flex items-center rounded-full border border-[#43e477]/40 bg-[#25D366] p-3.5 text-[#052412] shadow-[0_12px_32px_rgba(37,211,102,0.28)] hover:bg-[#3be072] sm:bottom-7 sm:right-7"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold tracking-tight opacity-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-2.5 group-hover:max-w-36 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
      <MessageCircle size={22} strokeWidth={2.5} />
    </a>
  );
}
