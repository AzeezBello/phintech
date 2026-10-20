import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CTA } from '@/components/Site';
import { Reveal } from '@/components/Motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
    'A focused identity or campaign can take a few weeks. A website or larger digital product usually needs more time for strategy, design, development and testing. Walk-in printing, binding, passport photos and portal registrations are handled same-day at our Surulere desk.',
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
      <section className="studio-grid-surface border-b border-[#232429] py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
              <span className="text-[#ffd400]">INDEX // 04</span>
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
              A little clarity{' '}
              <span className="font-editorial italic font-normal text-[#ffd400]">
                before we begin.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
              Practical answers on walk-in print runs, JAMB/WAEC/NYSC registrations,
              brand commissions, timelines and file handovers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-32">
            <Card className="p-6 sm:p-7">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
                DIRECT STUDIO DESK
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-[#f5f4f0]">
                Need an immediate answer for a print run or registration?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
                Our Surulere desk is open Monday to Friday, 9:00am – 5:00pm WAT for
                walk-in printing, binding, passport photos and portal assistance.
              </p>
              <div className="mt-6 space-y-3 border-t border-[#232429] pt-5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono uppercase text-[#a1a1aa]">Location</span>
                  <span className="font-semibold text-[#f5f4f0]">
                    1 Alawode St, Surulere
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono uppercase text-[#a1a1aa]">Email</span>
                  <a
                    href="mailto:philtech91@gmail.com"
                    className="font-mono text-[#ffd400] hover:underline"
                  >
                    philtech91@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] hover:text-[#ffe144]"
                >
                  Send a direct enquiry <ArrowUpRight size={14} />
                </Link>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="px-6 py-4 sm:px-8">
              <Accordion type="single" defaultValue="item-0">
                {questions.map(([question, answer], index) => {
                  const num = String(index + 1).padStart(2, '0');
                  return (
                    <AccordionItem key={question} value={`item-${index}`}>
                      <AccordionTrigger>
                        <span className="flex items-baseline gap-4 text-left">
                          <span className="font-mono text-xs font-bold text-[#ffd400]">
                            {num}
                          </span>
                          <span>{question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-8">{answer}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="container pb-24 md:pb-28">
        <Reveal>
          <Card className="border-[#ffd400]/35 bg-[#101114] p-8 md:p-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffd400]">
                  STILL CURIOUS?
                </p>
                <h2 className="display-section mt-3 font-bold text-[#f5f4f0]">
                  The quickest answer is usually a{' '}
                  <span className="font-editorial italic font-normal text-[#ffd400]">
                    conversation.
                  </span>
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
