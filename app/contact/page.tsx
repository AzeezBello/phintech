'use client';

import { useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Reveal } from '@/components/Motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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

export default function Page() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );
  const [feedback, setFeedback] = useState('');

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
      <section className="container py-24 md:py-32">
        <Reveal>
          <Badge>Start something good</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-8xl">
            Let&apos;s make it <span className="text-[#ffd400]">matter.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#a1a1aa]">
            Tell us what you are building, changing or imagining. We will get back to
            you with a clear next step.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send a project brief</CardTitle>
                <CardDescription>
                  Share a few details below and your enquiry goes straight to our studio dashboard.
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
                        placeholder="Your name"
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
                        placeholder="Your company or project"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-service">Service needed</Label>
                      <NativeSelect id="contact-service" name="service" defaultValue="">
                        <option value="">General enquiry</option>
                        <option value="Printing and photocopying">
                          Printing and photocopying
                        </option>
                        <option value="Books and stationery">
                          Books and stationery
                        </option>
                        <option value="Online registration">
                          Online registration (JAMB / WAEC / NYSC / Visa)
                        </option>
                        <option value="Brand identity">Brand identity & Logos</option>
                        <option value="Web design and development">
                          Web design & development
                        </option>
                        <option value="Large-format printing">
                          Large-format & Campaign printing
                        </option>
                      </NativeSelect>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Project details</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      placeholder="What are we making together?"
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

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === 'submitting'}
                      className="min-w-[170px]"
                    >
                      {status === 'submitting' ? (
                        'Sending brief...'
                      ) : (
                        <>
                          Send enquiry <ArrowUpRight size={17} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5">
              <Card className="overflow-hidden">
                <iframe
                  title="Map showing Phintech Creatives in Surulere, Lagos"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.325%2C6.49%2C3.365%2C6.525&layer=mapnik&marker=6.508%2C3.345"
                  className="h-72 w-full border-0 grayscale-[0.35] contrast-[0.92]"
                  loading="lazy"
                />
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffd400]/15 text-[#ffd400]">
                      <MapPin size={19} />
                    </div>
                    <div>
                      <p className="font-bold text-[#fafafa]">Visit the studio</p>
                      <p className="mt-1 text-sm leading-6 text-[#a1a1aa]">
                        1 Alawode Street, off Kilo Bus Stop,
                        <br />
                        Surulere, Lagos
                      </p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=1+Alawode+Street+off+Kilo+Bus+Stop+Surulere+Lagos"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd400] hover:underline"
                      >
                        Open in Google Maps <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="flex items-center gap-3 text-sm text-[#d4d4d8]">
                    <Mail size={16} className="shrink-0 text-[#ffd400]" />
                    <span>hello@phintechcreatives.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#d4d4d8]">
                    <Phone size={16} className="shrink-0 text-[#ffd400]" />
                    <span>Available for new projects</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#d4d4d8]">
                    <Clock size={16} className="shrink-0 text-[#ffd400]" />
                    <span>Mon - Fri, 9am - 5pm</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
