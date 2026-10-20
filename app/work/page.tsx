import { FolderKanban, Images, Shapes } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { WorkGallery, type WorkItem } from '@/components/WorkGallery';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DEFAULT_PORTFOLIO_COLLECTIONS } from '@/lib/portfolio-seed-data';

export const metadata = { title: 'Work' };

const notes = [
  {
    icon: Shapes,
    title: 'Identity',
    copy: 'Marks, systems and visual rules that make brands easier to recognise.',
  },
  {
    icon: Images,
    title: 'Campaigns',
    copy: 'Flyers and promotional work made to earn attention in busy places.',
  },
  {
    icon: FolderKanban,
    title: 'Everyday tools',
    copy: 'Letterheads and working assets that keep the brand consistent after launch.',
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
      <section className="container py-24 md:py-32">
        <Reveal>
          <Badge>Selected work</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-8xl">
            Built for brands with something to say.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[#a1a1aa]">
            A living archive of identity systems, campaign artwork, editorial layouts
            and visual experiments from the studio.
          </p>
        </Reveal>
      </section>

      <section className="container pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {notes.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <Card interactive className="h-full">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ed168c]/30 bg-[#ed168c]/10 text-[#ed168c]">
                    <Icon size={21} />
                  </div>
                  <CardTitle className="pt-5 text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-7">
                    {copy}
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-28">
        <WorkGallery items={fallbackItems} />
      </section>

      <section className="container pb-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-[#ffd400]/40 bg-[#ffd400] p-8 text-[#09090b] shadow-2xl md:flex-row md:items-center md:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]">
                Have a project in mind?
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Let us add the next case study.
              </h2>
            </div>
            <CTA />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
