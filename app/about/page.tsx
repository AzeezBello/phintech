import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = { title: 'About' };

const principles = [
  {
    code: '01 // DIRECTION',
    title: 'Direction over noise',
    copy: 'We ask the useful questions first, then make the answer visible in every print sheet, mark and interface detail.',
    practice: 'Discovery & Visual Strategy',
  },
  {
    code: '02 // UTILITY',
    title: 'People at the centre',
    copy: 'The best work feels clear to the person using it — whether a student registering for JAMB or a founder launching a brand.',
    practice: 'Human-Centred Service',
  },
  {
    code: '03 // PURPOSE',
    title: 'Ideas with a job',
    copy: 'Every visual decision should earn its place by making a business easier to understand, trust and choose.',
    practice: 'Identity & Campaign Systems',
  },
  {
    code: '04 // EXECUTION',
    title: 'Craft with purpose',
    copy: 'Strategy gets the work moving. Careful press calibration, binding and code execution get it remembered.',
    practice: 'Print & Digital Production',
  },
];

export default function Page() {
  return (
    <main>
      {/* ASYMMETRIC STUDIO DOSSIER HERO */}
      <section className="studio-grid-surface border-b border-[#232429] py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
              <span className="text-[#ffd400]">DOSSIER // 01</span>
              <span>ABOUT PHINTECH CREATIVES</span>
            </div>
            <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
              We make good businesses look as{' '}
              <span className="font-editorial italic font-normal text-[#ffd400]">
                good as they are.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
              Phintech Creatives is a multidisciplinary print house, registration desk
              and creative technology studio in Surulere, Lagos — helping ambitious
              teams and everyday walk-in clients turn intent into tangible results.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="p-6 sm:p-7">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
                STUDIO SPECIFICATIONS // ATELIER PROFILE
              </p>
              <dl className="mt-4 divide-y divide-[#232429] text-xs">
                <div className="flex items-center justify-between py-3">
                  <dt className="font-mono uppercase text-[#a1a1aa]">Base</dt>
                  <dd className="font-semibold text-[#f5f4f0]">
                    1 Alawode St, Kilo, Surulere, Lagos
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="font-mono uppercase text-[#a1a1aa]">Model</dt>
                  <dd className="font-semibold text-[#f5f4f0]">
                    Print Press + Portal Desk + Digital Studio
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="font-mono uppercase text-[#a1a1aa]">Archive</dt>
                  <dd className="font-mono font-bold text-[#ffd400]">
                    74+ Indexed Works
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <dt className="font-mono uppercase text-[#a1a1aa]">Hours</dt>
                  <dd className="font-mono text-[#f5f4f0]">Mon–Fri // 09:00–17:00</dd>
                </div>
              </dl>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* DOCUMENTARY DIPTYCH & EDITORIAL PULL QUOTE */}
      <section className="container py-24 md:py-28">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="card-surface overflow-clip rounded-2xl border border-[#232429] bg-[#101114] p-4 lg:col-span-6">
              <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#a1a1aa]">
                <span>SPECIMEN // PHYSICAL BRANDING</span>
                <span className="text-[#ffd400]">SURULERE PRESS</span>
              </div>
              <img
                src="/portfolio/branding/CUP%20BRANDING.jpg"
                alt="Phintech branding project on a custom printed cup"
                loading="lazy"
                width={700}
                height={560}
                className="aspect-[5/4] w-full rounded-xl object-cover"
              />
            </div>

            <Card className="flex flex-col justify-between p-8 md:p-11 lg:col-span-6">
              <div className="flex items-center justify-between border-b border-[#232429] pb-4 font-mono text-xs text-[#a1a1aa]">
                <span className="font-bold text-[#ffd400]">01 // THE THESIS</span>
                <span>PRACTICE NOTES</span>
              </div>

              <div className="my-8">
                <blockquote className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f4f0] md:text-4xl">
                  &ldquo;Clarity is a{' '}
                  <span className="font-editorial italic font-normal text-[#ffd400]">
                    creative advantage
                  </span>{' '}
                  — in print and on screen.&rdquo;
                </blockquote>
                <p className="mt-6 text-base leading-relaxed text-[#a1a1aa]">
                  When a business knows what it stands for, its brand works harder. And
                  when an individual needs urgent document printing, binding or exam
                  registration, reliability matters most. We built Phintech to bridge
                  both worlds: high-craft studio design and dependable everyday service.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#232429] pt-5">
                <span className="font-mono text-xs text-[#a1a1aa]">
                  EST. LAGOS • PRINT &amp; DIGITAL
                </span>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] hover:text-[#ffe144]"
                >
                  Inspect studio archive <ArrowUpRight size={14} />
                </Link>
              </div>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* INDEXED STUDIO PRINCIPLES LEDGER (REPLACING UNIFORM ICON CARDS) */}
      <section className="border-y border-[#232429] bg-[#0b0c0f] py-24 md:py-28">
        <div className="container">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-[#232429] pb-10 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                  02 // STUDIO ETHOS
                </p>
                <h2 className="display-section mt-3 font-bold text-[#f5f4f0]">
                  Four habits behind{' '}
                  <span className="font-editorial italic font-normal text-[#ffd400]">
                    every commission.
                  </span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                OPERATING PRINCIPLES // 01 — 04
              </p>
            </div>
          </Reveal>

          <div className="mt-10 divide-y divide-[#232429] rounded-2xl border border-[#232429] bg-[#101114]">
            {principles.map((item, index) => (
              <Reveal key={item.code} delay={index * 0.05}>
                <div className="grid gap-4 p-6 transition-colors hover:bg-[#14151a] sm:p-8 md:grid-cols-[0.22fr_0.3fr_0.48fr] md:items-baseline">
                  <div>
                    <p className="font-mono text-xs font-bold text-[#ffd400]">
                      {item.code}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#71717a]">
                      {item.practice}
                    </p>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#f5f4f0]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#a1a1aa]">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="container py-24">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 rounded-2xl border border-[#232429] bg-[#101114] p-8 md:flex-row md:items-end md:p-12">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                03 // INITIATE A COMMISSION
              </p>
              <h2 className="display-section mt-3 max-w-2xl font-bold text-[#f5f4f0]">
                Bring the messy brief. We will bring{' '}
                <span className="font-editorial italic font-normal text-[#ffd400]">
                  the method.
                </span>
              </h2>
            </div>
            <div className="pill-row-balance gap-3">
              <CTA />
              <Button asChild href="/services" variant="outline" size="lg">
                View services
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
