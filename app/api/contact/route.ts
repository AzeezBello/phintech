import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const d = await req.json();
    const name = String(d.name || '').trim();
    const email = String(d.email || '').trim();
    const company = d.company ? String(d.company).trim() : null;
    const phone = d.phone ? String(d.phone).trim() : null;
    const service = d.service ? String(d.service).trim() : null;
    const message = String(d.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();
    await sql`
      INSERT INTO enquiries (name, email, company, phone, service, message, status)
      VALUES (${name}, ${email}, ${company}, ${phone}, ${service}, ${message}, 'new')
    `;

    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
          to: [process.env.CONTACT_TO_EMAIL],
          subject: `New enquiry from ${name}`,
          text: JSON.stringify({ name, email, company, phone, service, message }, null, 2),
        }),
      }).catch(() => null);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact submission error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
