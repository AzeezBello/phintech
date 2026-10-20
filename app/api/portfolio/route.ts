import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '@/lib/db';

const CATEGORY_LABELS: Record<string, string> = {
  branding: 'Branding',
  flyers: 'Flyers',
  'letter-head': 'Letter Heads',
  logos: 'Logos',
};

export async function GET() {
  try {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT id, title, category, image_url, featured
      FROM portfolio_items
      ORDER BY featured DESC, id DESC
    `;

    const items = rows.map((r) => {
      const cat = (['branding', 'flyers', 'letter-head', 'logos'].includes(
        String(r.category)
      )
        ? String(r.category)
        : 'branding') as 'branding' | 'flyers' | 'letter-head' | 'logos';
      return {
        id: `db-${r.id}`,
        title: String(r.title),
        category: cat,
        categoryLabel: CATEGORY_LABELS[cat] || 'Branding',
        imageUrl: String(r.image_url),
        featured: Boolean(r.featured),
      };
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
