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
  Menu,
  MessageCircle,
  Shield,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#080809]/85 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="Phintech Creatives home"
          className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] rounded-full"
        >
          <img
            src="/logo.jpg"
            alt="Phintech Creative"
            className="spring-scale h-12 w-12 rounded-full border border-white/10 object-cover group-hover:scale-105"
          />
          <span className="hidden text-base font-black tracking-[-0.03em] text-[#fafafa] sm:inline-block">
            Phintech<span className="text-[#ed168c]">.</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'action-button rounded-full px-4 py-2 text-sm font-bold transition-colors duration-150',
                  active
                    ? 'bg-white/[0.08] text-[#ffd400]'
                    : 'text-[#a1a1aa] hover:bg-white/[0.04] hover:text-[#fafafa]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-3 pl-3 border-l border-[#26272b]">
            <Button asChild href="/contact" size="sm" className="h-10 px-4">
              Contact <ArrowUpRight size={15} />
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
          className="mobile-navigation container flex flex-col gap-2 border-t border-[#26272b] bg-[#0c0d10] pb-6 pt-4 text-sm font-bold md:hidden"
        >
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-3.5 py-2.5 transition-colors',
                  active
                    ? 'bg-[#ffd400]/15 text-[#ffd400]'
                    : 'text-[#d4d4d8] hover:bg-white/[0.04]'
                )}
              >
                {item.label}
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
              Start a project <ArrowUpRight size={16} />
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#26272b] bg-[#090a0c] py-14">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.2fr_auto_auto]">
          <div>
            <Link
              href="/"
              className="inline-block text-xl font-black tracking-[-0.04em] text-[#fafafa]"
            >
              Phintech<span className="text-[#ed168c]">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#a1a1aa]">
              Books, printing, online services and creative technology in Surulere, Lagos.
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffd400]">
              Explore
            </p>
            <div className="mt-4 grid gap-2.5 text-sm font-medium text-[#a1a1aa]">
              <Link href="/about" className="transition-colors hover:text-[#fafafa]">
                About
              </Link>
              <Link href="/services" className="transition-colors hover:text-[#fafafa]">
                Services
              </Link>
              <Link href="/work" className="transition-colors hover:text-[#fafafa]">
                Work
              </Link>
              <Link href="/faq" className="transition-colors hover:text-[#fafafa]">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffd400]">
              Connect
            </p>
            <div className="mt-4 flex gap-2.5">
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
                className="action-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2e3036] bg-[#121317] text-[#a1a1aa] hover:border-[#ed168c] hover:text-[#ed168c]"
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

        <Separator className="my-8" />

        <div className="flex flex-col justify-between gap-4 text-xs text-[#a1a1aa] sm:flex-row sm:items-center">
          <p className="tabular-nums">
            © {new Date().getFullYear()} Phintech Creatives. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/terms" className="transition-colors hover:text-[#fafafa]">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-[#fafafa]">
              Privacy
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 font-bold text-[#a1a1aa] transition-colors hover:text-[#ffd400]"
            >
              <Shield size={12} /> Admin
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
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-black tracking-tight opacity-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-2.5 group-hover:max-w-36 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
      <MessageCircle size={22} strokeWidth={2.5} />
    </a>
  );
}
