import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Terms and Conditions',
  description:
    'Terms and conditions for using the Phintech Creatives website and engaging our services.',
};

const sections = [
  [
    'Using this website',
    'This website is provided to introduce Phintech Creatives, our work and our services. You may browse, share and refer to its public content for personal or business evaluation. You must not copy, republish, alter or commercially reuse our content without written permission.',
  ],
  [
    'Our services',
    'The information on this website is general and does not create a client relationship or guarantee that a particular service is available. Project work begins only after both parties agree the scope, fees, timeline and working terms in writing.',
  ],
  [
    'Intellectual property',
    'Unless otherwise agreed in writing, Phintech retains rights to its original concepts, methods, templates and portfolio presentation. A client receives the agreed final deliverables after the applicable project fees have been paid. Third-party assets remain subject to their own licences.',
  ],
  [
    'Third-party links',
    'This website may link to external websites or platforms. We are not responsible for the availability, content, privacy practices or security of third-party services. You use those services according to their own terms.',
  ],
  [
    'Accuracy and availability',
    'We aim to keep this website accurate and available, but content may change without notice and we do not promise that every page will always be error-free or uninterrupted.',
  ],
  [
    'Limitation of liability',
    'To the fullest extent allowed by applicable law, Phintech Creatives is not liable for indirect or consequential loss arising from use of this website or reliance on its general information.',
  ],
  [
    'Changes to these terms',
    'We may update these terms when our services or website change. The date of the latest version will be shown below.',
  ],
  [
    'Contact',
    'Questions about these terms can be sent to philtech91@gmail.com or discussed through our contact page.',
  ],
];

export default function Page() {
  return (
    <main className="container py-20 md:py-28">
      <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
        <span className="text-[#ffd400]">LEGAL // 01</span>
        <span>TERMS OF ENGAGEMENT</span>
      </div>
      <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
        Terms and{' '}
        <span className="font-editorial italic font-normal text-[#ffd400]">
          conditions.
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
        The working terms for using the Phintech Creatives website and commissioning
        a project with our studio.
      </p>
      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[#71717a]">
        LAST UPDATED // SEPTEMBER 13, 2026
      </p>

      <div className="mt-14 max-w-4xl divide-y divide-[#232429] rounded-2xl border border-[#232429] bg-[#101114]">
        {sections.map(([title, copy], idx) => (
          <div
            key={title}
            className="grid gap-4 p-6 sm:p-8 md:grid-cols-[0.32fr_0.68fr]"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#ffd400]">
                CLAUSE // {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-[#f5f4f0]">
                {title}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#a1a1aa]">{copy}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Button asChild href="mailto:philtech91@gmail.com" variant="outline">
          Ask a legal question <ArrowUpRight size={16} />
        </Button>
      </div>
    </main>
  );
}
