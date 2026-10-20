'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Reveal } from '@/components/Motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const SERVICE_OPTIONS = [
  'Printing and photocopying',
  'Books and stationery',
  'Laminating and binding',
  'Large-format printing',
  'Passport photographs',
  'Online registration',
  'Brand identity',
  'Web design and development',
  'UI and UX design',
  'E-commerce',
  'Campaign design',
  'Digital products',
];

export default function Page() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );
  const [feedback, setFeedback] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get('service');
    if (svc) {
      setSelectedService(svc);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setFeedback('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          service: formData.get('service'),
          message: formData.get('message'),
        }),
      });

      if (r.ok) {
        setStatus('success');
        setFeedback('Thanks — your enquiry has been saved and received by our studio.');
        form.reset();
        setSelectedService('');
      } else {
        setStatus('error');
        setFeedback('Please check your details and try again.');
      }
    } catch {
      setStatus('error');
      setFeedback('Unable to send right now. Please try again.');
    }
  }

  return (
    <main>
      <section className="studio-grid-surface border-b border-[#232429] py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="inline-flex items-center gap-3 border-l-2 border-[#ffd400] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
              <span className="text-[#ffd400]">DISPATCH // 05</span>
              <span>STUDIO DESK &amp; PROJECT BRIEFS</span>
            </div>
            <h1 className="display-page mt-6 max-w-4xl font-bold text-[#f5f4f0]">
              Let&apos;s make it{' '}
              <span className="font-editorial italic font-normal text-[#ffd400]">
                matter.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
              Tell us what you are printing, registering, building or rebranding.
              Your brief goes straight to our Surulere studio desk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <Reveal>
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#a1a1aa]">
                  <span className="text-[#ffd400]">FORM // STUDIO BRIEF</span>
                  <span>DIRECT INTAKE</span>
                </div>
                <CardTitle className="font-display text-2xl sm:text-3xl">
                  Send a project or service brief
                </CardTitle>
                <CardDescription>
                  Share your requirements below and our team will respond with clear
                  pricing, turnaround or next steps.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  method="POST"
                  action="/api/contact"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Your full name"
                        onChange={() => {
                          if (status !== 'idle') setStatus('idle');
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email address</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        autoCorrect="off"
                        autoCapitalize="none"
                        required
                        placeholder="you@company.com"
                        onChange={() => {
                          if (status !== 'idle') setStatus('idle');
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-company">Company or organisation</Label>
                      <Input
                        id="contact-company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Optional organisation name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-service">Service needed</Label>
                      <NativeSelect
                        id="contact-service"
                        name="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="">General studio enquiry</option>
                        {SERVICE_OPTIONS.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc}
                          </option>
                        ))}
                        {selectedService &&
                          !SERVICE_OPTIONS.includes(selectedService) && (
                            <option value={selectedService}>{selectedService}</option>
                          )}
                      </NativeSelect>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Project or order details</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Include quantities, dimensions, portal registration type, or brand/website goals..."
                      onChange={() => {
                        if (status !== 'idle') setStatus('idle');
                      }}
                    />
                  </div>

                  {status === 'success' && (
                    <Alert variant="success">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                      <AlertDescription>{feedback}</AlertDescription>
                    </Alert>
                  )}

                  {status === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <AlertDescription>{feedback}</AlertDescription>
                    </Alert>
                  )}

                  <div className="pill-row-balance justify-between gap-4 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === 'submitting'}
                      className="min-w-[190px]"
                    >
                      {status === 'submitting' ? (
                        'Dispatching brief...'
                      ) : (
                        <>
                          Dispatch enquiry <ArrowUpRight size={17} />
                        </>
                      )}
                    </Button>
                    <span className="font-mono text-xs text-[#a1a1aa]">
                      LOGGED TO STUDIO DASHBOARD
                    </span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-6">
              <Card className="overflow-clip p-4">
                <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#a1a1aa]">
                  <span>ATELIER COORDINATES</span>
                  <span className="text-[#ffd400]">06°30′08″N 03°20′42″E</span>
                </div>
                <div className="overflow-clip rounded-xl border border-[#232429]">
                  <iframe
                    title="Map showing Phintech Creatives in Surulere, Lagos"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=3.325%2C6.49%2C3.365%2C6.525&layer=mapnik&marker=6.508%2C3.345"
                    className="h-64 w-full border-0 grayscale-[0.4] contrast-[0.95]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex gap-4 px-2 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ffd400]/30 bg-[#ffd400]/10 text-[#ffd400]">
                    <MapPin size={19} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-[#f5f4f0]">
                      Visit the Surulere Studio
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#a1a1aa]">
                      1 Alawode Street, off Kilo Bus Stop,
                      <br />
                      Surulere, Lagos, Nigeria
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=1+Alawode+Street+off+Kilo+Bus+Stop+Surulere+Lagos"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ffd400] hover:underline"
                    >
                      Open in Google Maps <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffd400]">
                  DIRECT CHANNELS &amp; HOURS
                </p>
                <div className="mt-4 divide-y divide-[#232429] text-sm">
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2.5 text-[#a1a1aa]">
                      <Mail size={15} className="text-[#ffd400]" />
                      <span>Email Desk</span>
                    </span>
                    <a
                      href="mailto:philtech91@gmail.com"
                      className="font-mono text-xs text-[#f5f4f0] hover:text-[#ffd400]"
                    >
                      philtech91@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2.5 text-[#a1a1aa]">
                      <MessageCircle size={15} className="text-[#ffd400]" />
                      <span>WhatsApp Desk</span>
                    </span>
                    <a
                      href="https://wa.me/2348100984938"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-[#ffd400] hover:underline"
                    >
                      +234 810 098 4938 →
                    </a>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="flex items-center gap-2.5 text-[#a1a1aa]">
                      <Clock size={15} className="text-[#ffd400]" />
                      <span>Working Hours</span>
                    </span>
                    <span className="font-mono text-xs text-[#f5f4f0]">
                      Mon – Fri, 9:00am – 5:00pm
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
