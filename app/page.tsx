import Link from 'next/link';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ledgerMetrics = [
  {
    code: '01 // ARCHIVE',
    value: '74+',
    label: 'Catalogued brand, print & campaign works',
  },
  {
    code: '02 // CAPABILITIES',
    value: '12',
    label: 'Integrated print, registration & digital services',
  },
  {
    code: '03 // TURNAROUND',
    value: 'Same-Day',
    label: 'Express document print, passport & portal desk',
  },
  {
    code: '04 // ATELIER',
    value: 'Lagos',
    label: '1 Alawode St, Kilo Bus Stop, Surulere',
  },
];

const registrationPortals = [
  { code: 'REG-01', name: 'JAMB & Direct Entry', status: 'Active Desk' },
  { code: 'REG-02', name: 'WAEC / NECO / GCE', status: 'Biometrics & Pin' },
  { code: 'REG-03', name: 'Post-UTME & Tertiary Portals', status: 'Full Upload' },
  { code: 'REG-04', name: 'NYSC Mobilisation & Green Card', status: 'Print & Verify' },
  { code: 'REG-05', name: 'Visa Forms & Official Passports', status: 'Studio Photo' },
];

export default function Home() {
  return (
    <main>
      {/* HERO: Asymmetric Editorial Split with Specimen Proof Frame */}
      <section className="studio-grid-surface relative overflow-clip border-b border-[#232429]">
        <div className="container grid min-h-[calc(100dvh-7rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
                <span className="text-[#ffd400]">INDEX // 00</span>
                <span>PRINT HOUSE, PORTAL DESK &amp; CREATIVE STUDIO</span>
              </div>

              <h1 className="display-hero mt-7 max-w-4xl font-bold text-[#f5f4f0]">
                Tactile print craft and{' '}
                <span className="font-editorial italic font-normal text-[#ffd400]">
                  sharp digital
                </span>{' '}
                identity.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#a1a1aa]">
                From books, stationery and high-resolution printing to JAMB/WAEC/NYSC
                registrations, brand systems and custom web design — Phintech is
                Surulere&apos;s everyday print and creative technology partner.
              </p>

              <div className="pill-row-balance mt-7 gap-2 text-xs font-mono text-[#d4d4d8]">
                <span className="rounded-lg border border-[#232429] bg-[#101114] px-3 py-1.5">
                  [A] Print &amp; Large-Format
                </span>
                <span className="rounded-lg border border-[#232429] bg-[#101114] px-3 py-1.5">
                  [B] Books &amp; Stationery
                </span>
                <span className="rounded-lg border border-[#232429] bg-[#101114] px-3 py-1.5">
                  [C] Portal Registrations
                </span>
                <span className="rounded-lg border border-[#232429] bg-[#101114] px-3 py-1.5">
                  [D] Branding &amp; Web
                </span>
              </div>

              <div className="pill-row-balance mt-10 gap-4">
                <CTA />
                <Button asChild href="/services" variant="outline" size="lg">
                  Explore all 12 services <ArrowUpRight size={17} />
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="hero-art rounded-2xl border border-[#2a2c32] bg-[#101114] p-3.5 shadow-2xl">
              <div className="mb-3 flex items-center justify-between border-b border-[#232429] pb-2.5 font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa]">
                <span>SPECIMEN REF // PT-085</span>
                <span className="text-[#ffd400]">LARGE-FORMAT &amp; IDENTITY</span>
              </div>

              <div className="relative overflow-clip rounded-xl border border-white/10 bg-[#09090b]">
                <img
                  src="/portfolio/branding/85%20BIRTHDAY%20BANNER.jpg"
                  alt="Phintech large-format campaign and identity print specimen"
                  fetchPriority="high"
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover"
                />
                <Link
                  href="/work"
                  className="group absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-[#09090b]/90 p-4 backdrop-blur-md transition-colors hover:border-[#ffd400]/60"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ffd400]">
                      Selected Archive // 01 of 74
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-[#f5f4f0]">
                      Inspect the complete studio work index
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f5f4f0] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[#ffd400] group-hover:text-[#ffd400]">
                    <MoveUpRight size={18} />
                  </span>
                </Link>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#71717a]">
                <span>STOCK: HEAVYWEIGHT VINYL &amp; COATED ART</span>
                <span>LAGOS, NG</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURAL LEDGER STRIP */}
      <section className="border-b border-[#232429] bg-[#0c0d10]">
        <div className="container grid divide-y divide-[#232429] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {ledgerMetrics.map((metric) => (
            <div
              key={metric.code}
              className="py-7 sm:px-6 first:sm:pl-0 last:sm:pr-0"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#a1a1aa]">
                {metric.code}
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums tracking-tight text-[#f5f4f0] first-letter:text-[#ffd400]">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-[#a1a1aa]">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ASYMMETRIC BENTO CAPABILITIES ARCHITECTURE */}
      <section className="container py-24 md:py-32">
        <Reveal>
          <div className="grid gap-6 border-b border-[#232429] pb-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                01 // CAPABILITY ARCHITECTURE
              </p>
              <p className="mt-2 text-sm text-[#a1a1aa]">
                Four integrated studio pillars under one roof in Surulere.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 className="display-section max-w-2xl font-bold text-[#f5f4f0]">
                Everyday print precision and{' '}
                <span className="font-editorial italic font-normal text-[#ffd400]">
                  enduring brand systems.
                </span>
              </h2>
              <Button asChild href="/services" variant="ghost" className="self-start sm:self-auto">
                Full service directory <ArrowUpRight size={17} />
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Bento Cell 1: 7 Columns — Print Production & Finishing */}
          <Reveal className="lg:col-span-7">
            <Card
              interactive
              className="grid h-full gap-6 p-6 sm:p-8 md:grid-cols-[1.15fr_0.85fr] md:items-center"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#ffd400]">
                    <span>PILLAR 01 // PRINT HOUSE</span>
                    <span className="text-[#a1a1aa]">PRESS &amp; BINDERY</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#f5f4f0] sm:text-3xl">
                    Printing, Large-Format &amp; Document Finishing
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
                    High-contrast everyday printing, high-speed photocopying, thermal
                    laminating, spiral/hard binding, official passport photographs and
                    weather-ready large-format banners.
                  </p>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="pill-row-balance gap-2 font-mono text-[11px] text-[#d4d4d8]">
                    <span className="rounded-md border border-[#2a2c32] bg-[#15161b] px-2.5 py-1">
                      Direct Digital Press
                    </span>
                    <span className="rounded-md border border-[#2a2c32] bg-[#15161b] px-2.5 py-1">
                      Flex &amp; Roll-Up Banners
                    </span>
                    <span className="rounded-md border border-[#2a2c32] bg-[#15161b] px-2.5 py-1">
                      Laminating &amp; Binding
                    </span>
                    <span className="rounded-md border border-[#2a2c32] bg-[#15161b] px-2.5 py-1">
                      Passport Studio
                    </span>
                  </div>

                  <Link
                    href="/contact?service=Printing%20and%20photocopying"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:text-[#ffe144]"
                  >
                    Book a print run <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="overflow-clip rounded-xl border border-[#26272b] bg-[#09090b]">
                <img
                  src="/portfolio/branding/CUP%20BRANDING.jpg"
                  alt="Custom branded merchandise and print production by Phintech"
                  loading="lazy"
                  width={500}
                  height={600}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Card>
          </Reveal>

          {/* Bento Cell 2: 5 Columns — Online Registration Desk */}
          <Reveal delay={0.06} className="lg:col-span-5">
            <Card interactive className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#ffd400]">
                  <span>PILLAR 02 // PORTAL DESK</span>
                  <span className="rounded-full border border-[#ffd400]/30 bg-[#ffd400]/10 px-2.5 py-0.5 text-[10px]">
                    WALK-IN &amp; REMOTE
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#f5f4f0]">
                  Official Academic, NYSC &amp; Visa Registrations
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#a1a1aa]">
                  Accurate portal capture, document scanning, passport sizing and slip
                  printing without queue stress.
                </p>

                <div className="mt-5 divide-y divide-[#232429] rounded-xl border border-[#232429] bg-[#0b0c0f] px-4">
                  {registrationPortals.map((item) => (
                    <div
                      key={item.code}
                      className="flex items-center justify-between py-2.5 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] text-[#ffd400]">
                          {item.code}
                        </span>
                        <span className="font-medium text-[#f5f4f0]">{item.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#a1a1aa]">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href="/contact?service=Online%20registration"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:text-[#ffe144]"
                >
                  Start registration assistance <ArrowUpRight size={14} />
                </Link>
              </div>
            </Card>
          </Reveal>

          {/* Bento Cell 3: 5 Columns — Books & Stationery */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <Card interactive className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#ffd400]">
                  <span>PILLAR 03 // SUPPLY STORE</span>
                  <span className="text-[#a1a1aa]">RETAIL &amp; BULK</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#f5f4f0]">
                  Books, Paper &amp; Essential Stationery
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
                  Curated books, notebooks, office files, writing instruments and
                  classroom or corporate stationery stocked for immediate pickup.
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[#232429] pt-5 text-xs">
                  <div className="rounded-xl border border-[#232429] bg-[#0b0c0f] p-3">
                    <dt className="font-mono text-[10px] uppercase text-[#a1a1aa]">
                      School &amp; Study
                    </dt>
                    <dd className="mt-1 font-semibold text-[#f5f4f0]">
                      Textbooks, notebooks &amp; exam sets
                    </dd>
                  </div>
                  <div className="rounded-xl border border-[#232429] bg-[#0b0c0f] p-3">
                    <dt className="font-mono text-[10px] uppercase text-[#a1a1aa]">
                      Office &amp; Studio
                    </dt>
                    <dd className="mt-1 font-semibold text-[#f5f4f0]">
                      Reams, folders, envelopes &amp; ink
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact?service=Books%20and%20stationery"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:text-[#ffe144]"
                >
                  Request supply availability <ArrowUpRight size={14} />
                </Link>
              </div>
            </Card>
          </Reveal>

          {/* Bento Cell 4: 7 Columns — Brand Identity & Web Engineering */}
          <Reveal delay={0.14} className="lg:col-span-7">
            <Card
              interactive
              className="flex h-full flex-col justify-between p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#ffd400]">
                  <span>PILLAR 04 // CREATIVE TECHNOLOGY</span>
                  <span className="text-[#a1a1aa]">IDENTITY &amp; WEB</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#f5f4f0] sm:text-3xl">
                  Brand Identity Systems, UI/UX &amp; Web Engineering
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a1a1aa]">
                  Logos, corporate letterheads, campaign collateral, responsive
                  websites and e-commerce storefronts engineered to make ambitious
                  businesses unmistakable.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3.5 rounded-xl border border-[#232429] bg-[#0b0c0f] p-3">
                    <img
                      src="/portfolio/logos/LOGO.jpg"
                      alt="Brand mark specimen"
                      loading="lazy"
                      width={64}
                      height={64}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#ffd400]">
                        Visual Identity
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-[#f5f4f0]">
                        40+ logos, marks &amp; corporate guidelines
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-xl border border-[#232429] bg-[#0b0c0f] p-3">
                    <img
                      src="/portfolio/letter-head/JBC%20LETTER%20HEAD.jpg"
                      alt="Corporate stationery specimen"
                      loading="lazy"
                      width={64}
                      height={64}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#ffd400]">
                        Digital &amp; Print Systems
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-[#f5f4f0]">
                        Websites, UI/UX &amp; executive stationery
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#232429] pt-5">
                <Link
                  href="/contact?service=Brand%20identity"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:text-[#ffe144]"
                >
                  Commission a brand or web project <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/work"
                  className="font-mono text-xs text-[#a1a1aa] transition-colors hover:text-[#f5f4f0]"
                >
                  Browse portfolio →
                </Link>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* CURATED ARCHIVE EXHIBITION SPREAD */}
      <section className="border-t border-[#232429] bg-[#0b0c0f] py-24 md:py-32">
        <div className="container">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-[#232429] pb-10 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                  02 // SELECTED ARCHIVE SPECIMENS
                </p>
                <h2 className="display-section mt-3 font-bold text-[#f5f4f0]">
                  Work built to hold{' '}
                  <span className="font-editorial italic font-normal text-[#ffd400]">
                    attention.
                  </span>
                </h2>
              </div>
              <Button asChild href="/work" variant="outline">
                Enter full 74-piece archive <ArrowUpRight size={17} />
              </Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            {/* Lead Exhibition Plate: 7 cols */}
            <Reveal className="group lg:col-span-7">
              <Link
                href="/work"
                className="card-surface card-interactive flex h-full flex-col justify-between rounded-2xl border border-[#232429] bg-[#101114] p-4 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#a1a1aa]">
                  <span>PLATE 01 // CAMPAIGN DIRECTION</span>
                  <span className="text-[#ffd400]">FLYER &amp; PRINT SERIES</span>
                </div>
                <div className="overflow-clip rounded-xl border border-white/10 bg-[#09090b]">
                  <img
                    src="/portfolio/flyers/OPEN%20HEAVEN.jpg"
                    alt="Open Heaven campaign flyer artwork"
                    loading="lazy"
                    width={900}
                    height={675}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-end justify-between gap-4 pt-1">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#f5f4f0]">
                      Open Heaven Event Campaign
                    </h3>
                    <p className="mt-0.5 text-sm text-[#a1a1aa]">
                      High-impact typographic hierarchy and print-ready key visual
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400]">
                    Inspect →
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Secondary Stacked Plates: 5 cols */}
            <div className="grid gap-6 lg:col-span-5">
              <Reveal delay={0.07} className="group">
                <Link
                  href="/work"
                  className="card-surface card-interactive block rounded-2xl border border-[#232429] bg-[#101114] p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#a1a1aa]">
                    <span>PLATE 02 // BRAND MARK</span>
                    <span className="text-[#ffd400]">IDENTITY ARCHIVE</span>
                  </div>
                  <div className="overflow-clip rounded-xl border border-white/10 bg-[#09090b]">
                    <img
                      src="/portfolio/logos/LOGO.jpg"
                      alt="Logo identity system specimen"
                      loading="lazy"
                      width={600}
                      height={420}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[#f5f4f0]">
                      Signature Identity Lockup
                    </h3>
                    <span className="font-mono text-xs text-[#ffd400]">View →</span>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.14} className="group">
                <Link
                  href="/work"
                  className="card-surface card-interactive block rounded-2xl border border-[#232429] bg-[#101114] p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#a1a1aa]">
                    <span>PLATE 03 // CORPORATE SYSTEM</span>
                    <span className="text-[#ffd400]">LETTERHEAD SUITE</span>
                  </div>
                  <div className="overflow-clip rounded-xl border border-white/10 bg-[#09090b]">
                    <img
                      src="/portfolio/letter-head/JBC%20LETTER%20HEAD.jpg"
                      alt="JBC corporate letterhead system"
                      loading="lazy"
                      width={600}
                      height={420}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[#f5f4f0]">
                      JBC Executive Stationery
                    </h3>
                    <span className="font-mono text-xs text-[#ffd400]">View →</span>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL DISPATCH POSTER CTA */}
      <section className="container py-24 md:py-28">
        <Reveal>
          <div className="relative overflow-clip rounded-3xl border border-[#ffd400]/50 bg-[#ffd400] px-7 py-12 text-[#09090b] shadow-2xl md:px-14 md:py-16">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#09090b]/15 pb-4 font-mono text-xs font-bold uppercase tracking-[0.18em]">
              <span>DISPATCH // STUDIO COMMISSION &amp; WALK-IN DESK</span>
              <span>1 ALAWODE ST, SURULERE, LAGOS</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h2 className="display-section font-bold tracking-[-0.045em] text-[#09090b]">
                  Ready to print, register, or build your{' '}
                  <span className="font-editorial italic font-normal underline decoration-[#09090b]/30 underline-offset-8">
                    next chapter?
                  </span>
                </h2>
                <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[#09090b]/80">
                  Walk into our Surulere studio for immediate print and portal
                  services, or send a project brief for branding and digital work.
                </p>
              </div>

              <div className="pill-row-balance gap-3 lg:justify-end">
                <Button
                  asChild
                  href="/contact"
                  size="lg"
                  className="bg-[#09090b] text-[#ffd400] hover:bg-[#18181b]"
                >
                  Start a project brief <ArrowUpRight size={18} />
                </Button>
                <Button
                  asChild
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="border-[#09090b]/30 bg-transparent text-[#09090b] hover:border-[#09090b] hover:bg-[#09090b]/10 hover:text-[#09090b]"
                >
                  All 12 capabilities
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
