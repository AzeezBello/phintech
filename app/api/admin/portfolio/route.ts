import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { ensureSchema, getSql } from '@/lib/db';

const ALLOWED_CATEGORIES = new Set(['branding', 'flyers', 'letter-head', 'logos']);

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureSchema();
  const sql = getSql();
  const items = await sql`
    SELECT id, title, category, image_url, featured, created_at
    FROM portfolio_items
    ORDER BY featured DESC, id DESC
  `;

  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const title = String(body.title || '').trim();
    const category = String(body.category || '').trim();
    const imageUrl = String(body.image_url || '').trim();
    const featured = Boolean(body.featured);

    if (!title || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'Title, category and image URL are required.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json({ error: 'Invalid category.' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();
    const inserted = await sql`
      INSERT INTO portfolio_items (title, category, image_url, featured)
      VALUES (${title}, ${category}, ${imageUrl}, ${featured})
      RETURNING id, title, category, image_url, featured, created_at
    `;

    return NextResponse.json({ item: inserted[0] });
  } catch (err) {
    console.error('Create portfolio item error:', err);
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
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
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const title = body.title !== undefined ? String(body.title).trim() : undefined;
    const category =
      body.category !== undefined ? String(body.category).trim() : undefined;
    const imageUrl =
      body.image_url !== undefined ? String(body.image_url).trim() : undefined;
    const featured =
      body.featured !== undefined ? Boolean(body.featured) : undefined;

    if (category && !ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json({ error: 'Invalid category.' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();
    const updated = await sql`
      UPDATE portfolio_items
      SET
        title = COALESCE(${title ?? null}, title),
        category = COALESCE(${category ?? null}, category),
        image_url = COALESCE(${imageUrl ?? null}, image_url),
        featured = COALESCE(${featured ?? null}, featured)
      WHERE id = ${id}
      RETURNING id, title, category, image_url, featured, created_at
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item: updated[0] });
  } catch (err) {
    console.error('Update portfolio item error:', err);
    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
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
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM portfolio_items WHERE id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete portfolio item error:', err);
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
