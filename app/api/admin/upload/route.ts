import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { ensureSchema, getSql } from '@/lib/db';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    let filename = 'upload.jpg';
    let mimeType = 'image/jpeg';
    let buffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file');
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: 'No image file provided.' },
          { status: 400 }
        );
      }

      filename = file.name || 'upload.jpg';
      mimeType = file.type || 'image/jpeg';

      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return NextResponse.json(
          { error: 'Unsupported file format. Please upload JPG, PNG, WebP, AVIF, or GIF.' },
          { status: 400 }
        );
      }

      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { error: 'Image exceeds maximum size of 8 MB.' },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      const body = await req.json();
      filename = String(body.filename || 'upload.jpg');
      mimeType = String(body.mimeType || 'image/jpeg');
      const base64Data = String(body.base64Data || '');

      if (!base64Data) {
        return NextResponse.json(
          { error: 'Missing image payload.' },
          { status: 400 }
        );
      }

      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return NextResponse.json(
          { error: 'Unsupported image format.' },
          { status: 400 }
        );
      }

      const cleaned = base64Data.replace(/^data:[^;]+;base64,/, '');
      buffer = Buffer.from(cleaned, 'base64');

      if (buffer.byteLength > MAX_BYTES) {
        return NextResponse.json(
          { error: 'Image exceeds maximum size of 8 MB.' },
          { status: 400 }
        );
      }
    }

    const dataBase64 = buffer.toString('base64');
    const byteSize = buffer.byteLength;

    await ensureSchema();
    const sql = getSql();

    const inserted = await sql`
      INSERT INTO uploaded_media (filename, mime_type, byte_size, data_base64)
      VALUES (${filename}, ${mimeType}, ${byteSize}, ${dataBase64})
      RETURNING id, filename, mime_type, byte_size, created_at
    `;

    const record = inserted[0];
    const url = `/api/portfolio/image/${record.id}`;

    return NextResponse.json({
      ok: true,
      id: Number(record.id),
      url,
      filename: String(record.filename),
      mimeType: String(record.mime_type),
      byteSize: Number(record.byte_size),
    });
  } catch (err) {
    console.error('Portfolio image upload error:', err);
    return NextResponse.json(
      { error: 'Failed to upload image. Please try again.' },
      { status: 500 }
    );
  }
}
