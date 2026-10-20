import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <main className="container py-24 md:py-32">
      <Badge>Legal</Badge>
      <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-8xl">
        Terms and conditions.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-[#a1a1aa]">
        The basic terms for using the Phintech Creatives website and starting a project
        with us.
      </p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">
        Last updated: September 13, 2026
      </p>

      <div className="mt-14 grid max-w-4xl gap-4">
        {sections.map(([title, copy]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm leading-7 text-[#a1a1aa]">
              {copy}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Button asChild href="mailto:philtech91@gmail.com" variant="outline">
          Ask a question <ArrowUpRight size={16} />
        </Button>
      </div>
    </main>
  );
}
