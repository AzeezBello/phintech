import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { Card } from '@/components/ui/card';

export const metadata = { title: 'Services' };

const printAndDeskServices = [
  {
    code: 'SRV // 01',
    category: 'SUPPLY',
    title: 'Books and stationery',
    copy: 'Shop for books and everyday stationery supplies for school, work and home.',
    specs: ['Academic & Reference Books', 'Notebooks & Exam Pads', 'Office Files & Paper'],
  },
  {
    code: 'SRV // 02',
    category: 'PRINT PRESS',
    title: 'Printing and photocopying',
    copy: 'Get clear, dependable printing and photocopying for documents, schoolwork and business materials.',
    specs: ['Monochrome & Full Colour', 'High-Volume Runs', 'A4 / A3 Document Output'],
  },
  {
    code: 'SRV // 03',
    category: 'BINDERY',
    title: 'Laminating and binding',
    copy: 'Protect, finish and organise your documents with laminating and binding services.',
    specs: ['Thermal Pouch Laminating', 'Spiral & Comb Binding', 'Thesis & Report Finishing'],
  },
  {
    code: 'SRV // 04',
    category: 'WIDE FORMAT',
    title: 'Large-format printing',
    copy: 'Make a bigger impression with large-format prints for banners, posters and other display materials.',
    specs: ['Weatherproof Flex Banners', 'Roll-Up Display Stands', 'Event & Retail Posters'],
  },
  {
    code: 'SRV // 05',
    category: 'STUDIO PHOTO',
    title: 'Passport photographs',
    copy: 'Get passport photographs prepared for official applications and identification.',
    specs: ['Embassy & Visa Dimensions', 'Instant Print & Digital Copy', 'Biometric Background Standards'],
  },
  {
    code: 'SRV // 06',
    category: 'PORTAL DESK',
    title: 'Online registration',
    copy: 'Get help with online applications and registrations, including JAMB, WAEC, Post-UTME, visa and NYSC processes.',
    specs: ['JAMB / WAEC / Post-UTME', 'NYSC Mobilisation & Printing', 'Visa Application Support'],
  },
];

const creativeStudioServices = [
  {
    code: '07',
    category: 'IDENTITY',
    title: 'Brand identity',
    copy: 'Naming direction, logos, colour systems and guidelines that give your business a recognisable point of view.',
    deliverables: ['Logo & Mark Suite', 'Typography & Colour System', 'Stationery & Brand Book'],
  },
  {
    code: '08',
    category: 'ENGINEERING',
    title: 'Web design and development',
    copy: 'Responsive, high-performing websites that make your offer easy to understand and easier to act on.',
    deliverables: ['Custom Next.js / Web Builds', 'Technical SEO & Speed', 'CMS & Content Architecture'],
  },
  {
    code: '09',
    category: 'PRODUCT DESIGN',
    title: 'UI and UX design',
    copy: 'Clear product flows and interfaces shaped around the real needs of your customers and team.',
    deliverables: ['Wireframes & User Flows', 'Interactive Design Systems', 'Clickable Prototypes'],
  },
  {
    code: '10',
    category: 'COMMERCE',
    title: 'E-commerce',
    copy: 'Thoughtful storefronts that build trust, reduce friction and help more of the right people buy.',
    deliverables: ['Catalog & Checkout Flows', 'Payment Gateway Setup', 'Inventory & Order Views'],
  },
  {
    code: '11',
    category: 'CAMPAIGNS',
    title: 'Campaign design',
    copy: 'Launch concepts, social assets and print-ready creative that keep your message consistent everywhere.',
    deliverables: ['Event Flyers & Key Visuals', 'Out-of-Home Print Assets', 'Social Rollout Kits'],
  },
  {
    code: '12',
    category: 'VENTURES',
    title: 'Digital products',
    copy: 'From first prototype to useful release, we help turn a promising idea into something people can use.',
    deliverables: ['MVP Architecture', 'Full-Stack Web Apps', 'Post-Launch Iteration'],
  },
];

const steps = [
  {
    number: 'STAGE 01',
    title: 'Choose what you need',
    copy: 'Select the right service — from walk-in printing and portal registration to bespoke brand and digital commissions.',
    meta: 'WALK-IN OR ONLINE BRIEF',
  },
  {
    number: 'STAGE 02',
    title: 'Share the details',
    copy: 'Tell us your specifications, quantities, portal requirements, sizes or launch deadlines so we can scope accurately.',
    meta: 'CLEAR SCOPE & TIMELINE',
  },
  {
    number: 'STAGE 03',
    title: 'Get it sorted',
    copy: 'We execute with studio precision — delivering finished prints, verified portal slips, or production-ready digital assets.',
    meta: 'STUDIO HANDOVER & DISPATCH',
  },
];

export default function Page() {
  return (
    <main>
      {/* EDITORIAL SPLIT HERO */}
      <section className="studio-grid-surface border-b border-[#232429] py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
              <span className="text-[#ffd400]">DIRECTORY // 02</span>
              <span>12 STUDIO CAPABILITIES</span>
            </div>
            <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
              Practical services for{' '}
              <span className="font-editorial italic font-normal text-[#ffd400]">
                school, work
              </span>{' '}
              and business.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
              From books, high-speed printing and official online registrations to
              brand identity systems and custom web engineering — find every capability
              under one roof in Surulere.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-[#232429] bg-[#101114] p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
                INDEX JUMP // TWO PRACTICE DIVISIONS
              </p>
              <div className="mt-4 divide-y divide-[#232429] text-sm">
                <a
                  href="#division-print-desk"
                  className="flex items-center justify-between py-3 text-[#f5f4f0] transition-colors hover:text-[#ffd400]"
                >
                  <span>01. Print House, Books &amp; Portal Desk</span>
                  <span className="font-mono text-xs text-[#a1a1aa]">SRV 01–06 ↓</span>
                </a>
                <a
                  href="#division-creative-tech"
                  className="flex items-center justify-between py-3 text-[#f5f4f0] transition-colors hover:text-[#ffd400]"
                >
                  <span>02. Brand Identity &amp; Digital Engineering</span>
                  <span className="font-mono text-xs text-[#a1a1aa]">SRV 07–12 ↓</span>
                </a>
                <a
                  href="#studio-process"
                  className="flex items-center justify-between pt-3 text-[#f5f4f0] transition-colors hover:text-[#ffd400]"
                >
                  <span>03. How Commissions &amp; Orders Work</span>
                  <span className="font-mono text-xs text-[#a1a1aa]">3 STAGES ↓</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIVISION 01: CSS SUBGRID SPECIMEN CARDS (SERVICES 01–06) */}
      <section id="division-print-desk" className="container py-24 md:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 border-b border-[#232429] pb-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                DIVISION 01 // EVERYDAY PRINT, SUPPLY &amp; REGISTRATIONS
              </p>
              <h2 className="display-section mt-3 font-bold text-[#f5f4f0]">
                Walk-in print production &amp;{' '}
                <span className="font-editorial italic font-normal text-[#ffd400]">
                  official portal desk.
                </span>
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
              SPECIFICATIONS // SRV 01 — SRV 06
            </p>
          </div>
        </Reveal>

        <div className="subgrid-card-grid">
          {printAndDeskServices.map((service) => (
            <Card
              key={service.code}
              interactive
              className="subgrid-card p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#232429] pb-3 font-mono text-xs">
                  <span className="font-bold text-[#ffd400]">{service.code}</span>
                  <span className="rounded-md border border-[#2a2c32] bg-[#15161b] px-2 py-0.5 text-[10px] text-[#a1a1aa]">
                    {service.category}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#f5f4f0]">
                  {service.title}
                </h3>
              </div>

              <div className="my-4 flex flex-col justify-between gap-5">
                <p className="text-sm leading-relaxed text-[#a1a1aa]">
                  {service.copy}
                </p>
                <ul className="space-y-1.5 border-t border-[#232429]/80 pt-4 font-mono text-xs text-[#d4d4d8]">
                  {service.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#ffd400]" aria-hidden="true" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#232429] pt-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:text-[#ffe144]"
                >
                  Request this service <ArrowUpRight size={14} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* DIVISION 02: EDITORIAL CAPABILITY LEDGER (SERVICES 07–12) */}
      <section
        id="division-creative-tech"
        className="border-y border-[#232429] bg-[#0b0c0f] py-24 md:py-28"
      >
        <div className="container">
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-4 border-b border-[#232429] pb-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                  DIVISION 02 // BRAND STUDIO &amp; DIGITAL ENGINEERING
                </p>
                <h2 className="display-section mt-3 font-bold text-[#f5f4f0]">
                  Identity systems, campaigns &amp;{' '}
                  <span className="font-editorial italic font-normal text-[#ffd400]">
                    digital products.
                  </span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                STUDIO COMMISSIONS // SRV 07 — SRV 12
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-[#232429] rounded-2xl border border-[#232429] bg-[#101114]">
            {creativeStudioServices.map((service, index) => (
              <Reveal key={service.code} delay={index * 0.04}>
                <div className="group grid gap-6 p-6 transition-colors hover:bg-[#14151a] sm:p-8 lg:grid-cols-[0.12fr_0.3fr_0.38fr_0.2fr] lg:items-center">
                  <div className="flex items-center gap-3 lg:block">
                    <span className="font-mono text-sm font-bold text-[#ffd400]">
                      SRV // {service.code}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#71717a] lg:mt-1">
                      {service.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#f5f4f0]">
                      {service.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed text-[#a1a1aa]">
                      {service.copy}
                    </p>
                    <div className="pill-row-balance mt-3 gap-1.5 font-mono text-[11px] text-[#d4d4d8]">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-[#26272b] bg-[#0b0c0f] px-2.5 py-0.5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="action-button inline-flex items-center gap-1.5 rounded-full border border-[#2e3036] bg-[#16171d] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f5f4f0] transition-colors group-hover:border-[#ffd400] group-hover:bg-[#ffd400] group-hover:text-[#09090b]"
                    >
                      Commission <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO WORKFLOW BLUEPRINT */}
      <section id="studio-process" className="container py-24 md:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                03 // OPERATING PROTOCOL
              </p>
              <h2 className="display-section mt-3 font-bold text-[#f5f4f0]">
                A direct path from brief to{' '}
                <span className="font-editorial italic font-normal text-[#ffd400]">
                  finished work.
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#a1a1aa]">
                Whether you need fifty bound booklets by afternoon or a complete
                rebrand and website launch, our studio process stays transparent from
                first message to final delivery.
              </p>
            </div>

            <div className="grid divide-y divide-[#232429] rounded-2xl border border-[#232429] bg-[#101114] md:grid-cols-3 md:divide-x md:divide-y-0">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-[#ffd400]">{step.number}</span>
                      <span className="text-[10px] text-[#71717a]">{step.meta}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-[#f5f4f0]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
                      {step.copy}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#232429] pt-3 font-mono text-[11px] text-[#71717a]">
                    PHINTECH STANDARD WORKFLOW
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CLOSING BRIEF DISPATCH */}
      <section className="container pb-24 md:pb-28">
        <Reveal>
          <Card className="border-[#ffd400]/35 bg-[#101114] p-8 md:p-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                  CUSTOM SCOPE OR COMBINED PACKAGE?
                </p>
                <h2 className="display-section mt-3 max-w-2xl font-bold text-[#f5f4f0]">
                  A five-minute conversation is a perfectly good first brief.
                </h2>
              </div>
              <CTA />
            </div>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
