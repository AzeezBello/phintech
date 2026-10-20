import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How Phintech Creatives handles information submitted through this website.',
};

const sections = [
  [
    'What we collect',
    'When you use the contact form, we collect the details you choose to submit, such as your name, email address, company and project message. We may also receive basic technical information needed to keep the website secure and functioning.',
  ],
  [
    'How we use information',
    'We use enquiry details to respond to you, understand your project, prepare relevant next steps and provide requested services. We do not use your message to send unrelated marketing without a suitable legal basis or your permission.',
  ],
  [
    'Email delivery',
    'If configured, contact enquiries are sent through Resend, our email delivery provider. Information submitted through the form may be processed by Resend to deliver the message. Their processing is subject to their own privacy terms.',
  ],
  [
    'Cookies and analytics',
    'This website does not intentionally use advertising cookies. If analytics or other measurement tools are added in the future, this policy will be updated to explain what they collect and how you can manage them.',
  ],
  [
    'Sharing information',
    'We do not sell your personal information. We may share information with trusted providers that help us operate the website or deliver a project, and only where necessary for that purpose. We may also disclose information where required by law.',
  ],
  [
    'Retention and security',
    'We keep enquiry information only for as long as it is useful for responding, managing a project or meeting legal and operational requirements. We take reasonable steps to protect it, but no internet transmission can be guaranteed completely secure.',
  ],
  [
    'Your choices',
    'You can ask us what personal information we hold about you, request a correction or ask us to delete it where applicable. Contact us at philtech91@gmail.com and include enough detail for us to identify your enquiry.',
  ],
  [
    'Contact',
    'For privacy questions or requests, email philtech91@gmail.com or visit us at 1 Alawode Street, off Kilo Bus Stop, Surulere, Lagos.',
  ],
];

export default function Page() {
  return (
    <main className="container py-24 md:py-32">
      <Badge>Legal</Badge>
      <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-8xl">
        Privacy policy.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-[#a1a1aa]">
        A straightforward explanation of what we collect through this website and how we
        use it.
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
          Contact us about privacy <ArrowUpRight size={16} />
        </Button>
      </div>
    </main>
  );
}
