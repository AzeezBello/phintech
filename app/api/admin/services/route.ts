import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { ensureSchema, getSql } from '@/lib/db';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureSchema();
  const sql = getSql();
  const services = await sql`
    SELECT id, title, category, description, active, sort_order, created_at
    FROM services_catalog
    ORDER BY sort_order ASC, id ASC
  `;

  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const title = String(body.title || '').trim();
    const category = String(body.category || 'General').trim();
    const description = String(body.description || '').trim();
    const active = body.active !== undefined ? Boolean(body.active) : true;
    const sortOrder = Number(body.sort_order ?? 10);

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Service title and description are required.' },
        { status: 400 }
      );
    }

    await ensureSchema();
    const sql = getSql();
    const inserted = await sql`
      INSERT INTO services_catalog (title, category, description, active, sort_order)
      VALUES (${title}, ${category}, ${description}, ${active}, ${sortOrder})
      RETURNING id, title, category, description, active, sort_order, created_at
    `;

    return NextResponse.json({ service: inserted[0] });
  } catch (err) {
    console.error('Create service error:', err);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
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
      return NextResponse.json({ error: 'Missing service ID' }, { status: 400 });
    }

    const title = body.title !== undefined ? String(body.title).trim() : undefined;
    const category =
      body.category !== undefined ? String(body.category).trim() : undefined;
    const description =
      body.description !== undefined ? String(body.description).trim() : undefined;
    const active =
      body.active !== undefined ? Boolean(body.active) : undefined;
    const sortOrder =
      body.sort_order !== undefined ? Number(body.sort_order) : undefined;

    await ensureSchema();
    const sql = getSql();
    const updated = await sql`
      UPDATE services_catalog
      SET
        title = COALESCE(${title ?? null}, title),
        category = COALESCE(${category ?? null}, category),
        description = COALESCE(${description ?? null}, description),
        active = COALESCE(${active ?? null}, active),
        sort_order = COALESCE(${sortOrder ?? null}, sort_order)
      WHERE id = ${id}
      RETURNING id, title, category, description, active, sort_order, created_at
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ service: updated[0] });
  } catch (err) {
    console.error('Update service error:', err);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
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
      return NextResponse.json({ error: 'Missing service ID' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM services_catalog WHERE id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete service error:', err);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
