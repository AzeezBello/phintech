import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  FileCheck2,
  MoveUpRight,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const services = [
  {
    icon: Printer,
    title: 'Printing and photocopying',
    copy: 'Everyday printing, photocopying, laminating, binding and large-format prints.',
  },
  {
    icon: BookOpen,
    title: 'Books and stationery',
    copy: 'Books and stationery essentials for school, work and home.',
  },
  {
    icon: FileCheck2,
    title: 'Online registration',
    copy: 'Help with JAMB, WAEC, Post-UTME, visa, NYSC and other online registrations.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="container grid min-h-[calc(100vh-5rem)] items-center gap-16 py-24 lg:grid-cols-[1.12fr_.88fr] lg:py-28">
          <div>
            <Reveal>
              <Badge>
                <Sparkles size={13} /> Printing, registration & creative services in Lagos
              </Badge>
              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.06em] md:text-8xl">
                Your everyday print and digital{' '}
                <span className="text-[#ffd400]">partner.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#a1a1aa]">
                From books, stationery and quality printing to online registrations,
                passport photos, branding and web design, Phintech helps you get things
                done.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <CTA />
                <Button asChild href="/services" variant="outline" size="lg">
                  Explore our services <ArrowUpRight size={17} />
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#ffd400]/10 blur-3xl" />
            <div className="hero-art relative rotate-1 overflow-hidden rounded-[2rem] border border-white/10 bg-[#121317] p-3 shadow-2xl">
              <img
                src="/portfolio/branding/85%20BIRTHDAY%20BANNER.jpg"
                alt="Phintech branding project"
                className="aspect-[4/5] w-full rounded-[1.4rem] object-cover"
              />
              <Link
                href="/work"
                className="group absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-2xl border border-white/15 bg-[#090a0d]/85 p-4 backdrop-blur-md transition-colors hover:border-[#ffd400]/50"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd400]">
                    Selected work
                  </p>
                  <p className="mt-1 font-bold text-[#fafafa]">
                    Identity with a pulse.
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#fafafa] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[#ffd400] group-hover:text-[#ffd400]">
                  <MoveUpRight size={18} />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#26272b] bg-[#0c0d10]">
        <div className="container grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <p className="tabular-nums text-3xl font-black tracking-tight text-[#ffd400]">
              74+
            </p>
            <p className="mt-1 text-sm text-[#a1a1aa]">Projects in the archive</p>
          </div>
          <div>
            <p className="tabular-nums text-3xl font-black tracking-tight text-[#fafafa]">
              360°
            </p>
            <p className="mt-1 text-sm text-[#a1a1aa]">
              From first sketch to final build
            </p>
          </div>
          <div>
            <p className="text-3xl font-black tracking-tight text-[#fafafa]">
              Lagos
            </p>
            <p className="mt-1 text-sm text-[#a1a1aa]">
              Rooted here, built for anywhere
            </p>
          </div>
        </div>
      </section>

      <section className="container py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd400]">
                What we bring
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Everyday essentials and ideas made visible.
              </h2>
            </div>
            <Button asChild href="/services" variant="ghost">
              See all services <ArrowUpRight size={17} />
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <Card interactive className="flex h-full flex-col justify-between">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd400] text-[#09090b] shadow-sm">
                    <Icon size={20} />
                  </div>
                  <CardTitle className="pt-6 text-2xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-7">
                    {copy}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:text-[#ffe144]"
                  >
                    Learn more <ArrowUpRight size={14} />
                  </Link>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-28">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd400]">
                A few favourites
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Work that earns attention.
              </h2>
            </div>
            <Button
              asChild
              href="/work"
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              View all work <ArrowUpRight size={17} />
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.3fr_.7fr]">
          <Reveal className="group">
            <Link
              href="/work"
              className="card-surface block overflow-hidden rounded-2xl border border-[#26272b]"
            >
              <img
                src="/portfolio/flyers/OPEN%20HEAVEN.jpg"
                alt="Open Heaven flyer design"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </Link>
          </Reveal>
          <div className="grid gap-5">
            <Reveal delay={0.07} className="group">
              <Link
                href="/work"
                className="card-surface block overflow-hidden rounded-2xl border border-[#26272b]"
              >
                <img
                  src="/portfolio/logos/LOGO.jpg"
                  alt="Logo identity design"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </Link>
            </Reveal>
            <Reveal delay={0.14} className="group">
              <Link
                href="/work"
                className="card-surface block overflow-hidden rounded-2xl border border-[#26272b]"
              >
                <img
                  src="/portfolio/letter-head/JBC%20LETTER%20HEAD.jpg"
                  alt="JBC letterhead design"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container pb-28">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[#ffd400]/40 bg-[#ffd400] px-7 py-12 text-[#09090b] shadow-2xl md:px-14 md:py-16">
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em]">
                  Your next chapter starts here
                </p>
                <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.05em] md:text-6xl">
                  Ready to get what you need, or start something new?
                </h2>
              </div>
              <Button
                asChild
                href="/contact"
                size="lg"
                className="bg-[#09090b] text-[#ffd400] hover:bg-[#18181b]"
              >
                Let&apos;s talk <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
