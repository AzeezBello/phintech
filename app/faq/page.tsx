import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about working with Phintech Creatives.',
};

const questions = [
  [
    'What services do you offer?',
    'We sell books and stationery, provide general printing and photocopying, laminating and binding, large-format printing and passport photographs. We also assist with online registration for JAMB, WAEC, Post-UTME, visa and NYSC applications, alongside our branding, design and digital services.',
  ],
  [
    'What kind of projects does Phintech take on?',
    'We work with businesses, founders and teams that need a sharper brand, a better digital experience or creative support for an important launch. That can mean a focused identity project, a website, campaign design or a combination of services.',
  ],
  [
    'Do you work with clients outside Lagos?',
    'Yes. We are based in Surulere, Lagos and work with clients across Nigeria and beyond. Most of our process is designed to work smoothly through video calls, shared documents and regular progress updates.',
  ],
  [
    'How long does a project usually take?',
    'A focused identity or campaign can take a few weeks. A website or larger digital product usually needs more time for strategy, design, development and testing. After an initial conversation, we will give you a realistic timeline for your specific scope.',
  ],
  [
    'What happens after I send an enquiry?',
    'We review the details and reply with a useful next step. That may be a short call, a few clarifying questions or a recommendation for the right starting point. There is no pressure to commit before the work and expectations are clear.',
  ],
  [
    'Can you work with an existing brand?',
    'Absolutely. We can extend, refine or reorganise an existing identity when a full rebrand is not the right answer. We start by understanding what is already working and where the system is creating friction.',
  ],
  [
    'How do payments work?',
    'Projects are scoped and agreed before work begins. We typically use an initial deposit to reserve the project and milestone payments for longer engagements. The exact schedule is included in your proposal.',
  ],
  [
    'Do you provide files and handover support?',
    'Yes. At launch, you receive the agreed final files and a practical handover so your team knows how to use the new assets. Website projects also include the relevant access and launch notes.',
  ],
  [
    'What should I include in my enquiry?',
    'Tell us what you are trying to achieve, what you have tried so far, your ideal timing and anything that is already fixed. A rough brief is enough; we can shape the rest together.',
  ],
];

export default function Page() {
  return (
    <main>
      <section className="container py-24 md:py-32">
        <Reveal>
          <Badge>Questions, answered</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-8xl">
            A little clarity before we begin.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[#a1a1aa]">
            Here are the things clients most often ask before starting a project with us.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="mt-16 max-w-4xl px-6 py-4 sm:px-8">
            <Accordion type="single" defaultValue="item-0">
              {questions.map(([question, answer], index) => (
                <AccordionItem key={question} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Reveal>
      </section>

      <section className="container pb-28">
        <Reveal>
          <Card className="border-[#ffd400]/30 bg-gradient-to-br from-[#1c1806] to-[#101114] p-8 md:p-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd400]">
                  Still curious?
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                  The quickest answer is usually a conversation.
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
