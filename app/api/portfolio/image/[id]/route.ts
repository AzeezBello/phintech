import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '@/lib/db';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const mediaId = Number(id);
    if (!mediaId || Number.isNaN(mediaId)) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    await ensureSchema();
    const sql = getSql();

    const rows = await sql`
      SELECT mime_type, data_base64, filename
      FROM uploaded_media
      WHERE id = ${mediaId}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const { mime_type, data_base64, filename } = rows[0];
    const buffer = Buffer.from(String(data_base64), 'base64');

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': String(mime_type || 'image/jpeg'),
        'Content-Length': String(buffer.byteLength),
        'Content-Disposition': `inline; filename="${encodeURIComponent(String(filename || 'image.jpg'))}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('Serve portfolio image error:', err);
    return NextResponse.json(
      { error: 'Failed to load image' },
      { status: 500 }
    );
  }
}
