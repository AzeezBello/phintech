import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { ensureSchema, getSql } from '@/lib/db';

const ALLOWED_STATUSES = new Set(['new', 'in_progress', 'replied', 'archived']);

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureSchema();
  const sql = getSql();
  const enquiries = await sql`
    SELECT id, name, email, company, phone, service, message, status, notes, created_at, updated_at
    FROM enquiries
    ORDER BY created_at DESC, id DESC
  `;

  return NextResponse.json({ enquiries });
}

export async function PATCH(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = Number(body.id);
    if (!id) {
      return NextResponse.json({ error: 'Missing enquiry ID' }, { status: 400 });
    }

    const status = body.status ? String(body.status) : undefined;
    if (status && !ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const notes = body.notes !== undefined ? String(body.notes) : undefined;

    await ensureSchema();
    const sql = getSql();

    const updated = await sql`
      UPDATE enquiries
      SET
        status = COALESCE(${status ?? null}, status),
        notes = COALESCE(${notes ?? null}, notes),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, email, company, phone, service, message, status, notes, created_at, updated_at
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ enquiry: updated[0] });
  } catch (err) {
    console.error('Update enquiry error:', err);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    if (!id) {
      return NextResponse.json({ error: 'Missing enquiry ID' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM enquiries WHERE id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete enquiry error:', err);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
