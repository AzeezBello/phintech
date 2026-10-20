import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import {
  createAdminSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please enter both email and password.' },
        { status: 400 }
      );
    }

    await ensureSchema();
    const sql = getSql();

    const rows = await sql`
      SELECT id, email, name, password_hash, role, active
      FROM admins
      WHERE LOWER(email) = ${email}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const admin = rows[0];
    if (!admin.active) {
      return NextResponse.json(
        { error: 'This administrator account is currently disabled.' },
        { status: 403 }
      );
    }

    const isValid = verifyPassword(password, String(admin.password_hash));
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const token = await createAdminSession(Number(admin.id));

    const res = NextResponse.json({
      ok: true,
      admin: {
        id: Number(admin.id),
        email: String(admin.email),
        name: String(admin.name),
        role: String(admin.role),
      },
    });

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return res;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Unable to sign in right now. Please try again.' },
      { status: 500 }
    );
  }
}
