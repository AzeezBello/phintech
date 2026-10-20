import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <main className="container py-20 md:py-28">
      <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
        <span className="text-[#ffd400]">LEGAL // 02</span>
        <span>DATA &amp; PRIVACY POLICY</span>
      </div>
      <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
        Privacy{' '}
        <span className="font-editorial italic font-normal text-[#ffd400]">
          policy.
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
        A straightforward explanation of what we collect through this website and how
        our studio handles your enquiry data.
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
                SECTION // {String(idx + 1).padStart(2, '0')}
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
          Contact us about privacy <ArrowUpRight size={16} />
        </Button>
      </div>
    </main>
  );
}
