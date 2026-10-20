import { ArrowUpRight } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { WorkGallery, type WorkItem } from '@/components/WorkGallery';
import { Button } from '@/components/ui/button';
import { DEFAULT_PORTFOLIO_COLLECTIONS } from '@/lib/portfolio-seed-data';

export const metadata = { title: 'Work Archive' };

const archiveCollections = [
  {
    code: 'COL // 01',
    title: 'Branding & Merchandise',
    count: 15,
    copy: 'Banners, packaging, branded vessels and physical identity rollouts.',
  },
  {
    code: 'COL // 02',
    title: 'Campaign Flyers',
    count: 12,
    copy: 'Event posters, promotional key visuals and high-impact print flyers.',
  },
  {
    code: 'COL // 03',
    title: 'Corporate Letterheads',
    count: 7,
    copy: 'Executive stationery systems and official document templates.',
  },
  {
    code: 'COL // 04',
    title: 'Logos & Identity Marks',
    count: 40,
    copy: 'Distinctive symbols, monograms and wordmarks built for longevity.',
  },
];

const fallbackItems: WorkItem[] = DEFAULT_PORTFOLIO_COLLECTIONS.flatMap(
  (collection) =>
    collection.files.map((file, idx) => ({
      id: `${collection.slug}-${file}`,
      title: file.replace(/\.[^.]+$/, ''),
      category: collection.slug,
      categoryLabel: collection.label,
      imageUrl: encodeURI(`/portfolio/${collection.slug}/${file}`),
      featured: idx < 2,
    }))
);

export default function Page() {
  return (
    <main>
      {/* EDITORIAL ARCHIVE HEADER */}
      <section className="studio-grid-surface border-b border-[#232429] py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
                  <span className="text-[#ffd400]">ARCHIVE // 03</span>
                  <span>CATALOGUED STUDIO SPECIMENS</span>
                </div>
                <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
                  Built for brands with{' '}
                  <span className="font-editorial italic font-normal text-[#ffd400]">
                    something to say.
                  </span>
                </h1>
              </div>

              <div className="lg:pb-2">
                <p className="text-base leading-relaxed text-[#a1a1aa]">
                  A living index of 74+ identity marks, campaign prints, corporate
                  letterhead suites and physical branding pieces produced by Phintech
                  Creatives in Lagos.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 4-CELL ARCHITECTURAL COLLECTION LEDGER */}
          <Reveal delay={0.08}>
            <div className="mt-14 grid divide-y divide-[#232429] rounded-2xl border border-[#232429] bg-[#101114] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {archiveCollections.map((col) => (
                <div key={col.code} className="p-6">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#ffd400]">{col.code}</span>
                    <span className="tabular-nums text-[#a1a1aa]">
                      [{col.count} WORKS]
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold text-[#f5f4f0]">
                    {col.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#a1a1aa]">
                    {col.copy}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTERACTIVE ARCHIVE GALLERY */}
      <section className="container py-20 md:py-24">
        <WorkGallery items={fallbackItems} />
      </section>

      {/* CLOSING COMMISSION BANNER */}
      <section className="container pb-24 md:pb-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-[#ffd400]/50 bg-[#ffd400] p-8 text-[#09090b] shadow-2xl md:flex-row md:items-center md:p-12">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                COMMISSION // NEXT ARCHIVE ENTRY
              </p>
              <h2 className="display-section mt-3 font-bold tracking-[-0.04em] text-[#09090b]">
                Let&apos;s add your project to the{' '}
                <span className="font-editorial italic font-normal underline decoration-[#09090b]/30 underline-offset-8">
                  studio index.
                </span>
              </h2>
            </div>
            <div className="pill-row-balance gap-3">
              <Button
                asChild
                href="/contact"
                size="lg"
                className="bg-[#09090b] text-[#ffd400] hover:bg-[#18181b]"
              >
                Start a project <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
