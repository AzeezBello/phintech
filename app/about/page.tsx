import { Compass, Heart, Lightbulb, Target } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata = { title: 'About' };

const principles = [
  {
    icon: Compass,
    title: 'Direction over noise',
    copy: 'We ask the useful questions first, then make the answer visible in every detail.',
  },
  {
    icon: Heart,
    title: 'People at the centre',
    copy: 'The best work feels clear to the person using it and true to the people behind it.',
  },
  {
    icon: Lightbulb,
    title: 'Ideas with a job',
    copy: 'Every visual decision should earn its place by making a brand easier to choose.',
  },
  {
    icon: Target,
    title: 'Craft with purpose',
    copy: 'Strategy gets the work moving. Careful execution gets it remembered.',
  },
];

export default function Page() {
  return (
    <main>
      <section className="container py-24 md:py-32">
        <Reveal>
          <Badge>About Phintech</Badge>
          <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-[-0.06em] md:text-8xl">
            We make good businesses look as good as they are.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[#a1a1aa]">
            Phintech is a creative technology studio in Lagos helping ambitious teams
            turn a point of view into a brand, a website and a better way to be found.
          </p>
        </Reveal>
      </section>

      <section className="container pb-28">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            <div className="card-surface overflow-hidden rounded-2xl border border-[#26272b]">
              <img
                src="/portfolio/branding/CUP%20BRANDING.jpg"
                alt="Phintech branding project on a branded cup"
                className="h-full min-h-80 w-full object-cover"
              />
            </div>
            <Card className="flex flex-col justify-between p-8 md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd400]">
                The short version
              </p>
              <div>
                <p className="mt-10 text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">
                  Clarity is a creative advantage.
                </p>
                <p className="mt-5 leading-7 text-[#a1a1aa]">
                  When a business knows what it stands for, its brand works harder. We
                  help you find that clarity and turn it into a system your team can
                  actually use.
                </p>
              </div>
            </Card>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[#26272b] bg-[#0c0d10]">
        <div className="container py-24">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd400]">
              How we think
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Four habits behind the work.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <Card interactive className="h-full">
                  <CardHeader>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ed168c]/30 bg-[#ed168c]/10 text-[#ed168c]">
                      <Icon size={22} />
                    </div>
                    <CardTitle className="pt-5 text-2xl">{title}</CardTitle>
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
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd400]">
                Work with us
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Bring the messy bit. We will bring the method.
              </h2>
            </div>
            <CTA />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
