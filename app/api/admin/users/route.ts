import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { ensureSchema, getSql } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/password';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureSchema();
  const sql = getSql();
  const admins = await sql`
    SELECT id, email, name, role, active, last_login_at, created_at
    FROM admins
    ORDER BY id ASC
  `;

  return NextResponse.json({ admins });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json(
      { error: 'Only superadmins can create new admin accounts.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const name = String(body.name || '').trim();
    const password = String(body.password || '');
    const role = body.role === 'superadmin' ? 'superadmin' : 'admin';

    if (!email || !name || password.length < 6) {
      return NextResponse.json(
        { error: 'Name, email, and a password (at least 6 characters) are required.' },
        { status: 400 }
      );
    }

    await ensureSchema();
    const sql = getSql();

    const existing = await sql`
      SELECT id FROM admins WHERE LOWER(email) = ${email} LIMIT 1
    `;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'An administrator with this email already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);
    const inserted = await sql`
      INSERT INTO admins (email, name, password_hash, role, active)
      VALUES (${email}, ${name}, ${passwordHash}, ${role}, true)
      RETURNING id, email, name, role, active, last_login_at, created_at
    `;

    return NextResponse.json({ user: inserted[0] });
  } catch (err) {
    console.error('Create admin user error:', err);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
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
    await ensureSchema();
    const sql = getSql();

    if (body.action === 'change_own_password') {
      const currentPassword = String(body.currentPassword || '');
      const newPassword = String(body.newPassword || '');
      const newName = body.name ? String(body.name).trim() : admin.name;

      if (!currentPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Current password and a new password (min 6 chars) are required.' },
          { status: 400 }
        );
      }

      const row = await sql`
        SELECT password_hash FROM admins WHERE id = ${admin.id} LIMIT 1
      `;
      if (row.length === 0 || !verifyPassword(currentPassword, String(row[0].password_hash))) {
        return NextResponse.json(
          { error: 'Current password is incorrect.' },
          { status: 400 }
        );
      }

      const nextHash = hashPassword(newPassword);
      const updated = await sql`
        UPDATE admins
        SET password_hash = ${nextHash}, name = ${newName}
        WHERE id = ${admin.id}
        RETURNING id, email, name, role, active, last_login_at, created_at
      `;

      return NextResponse.json({ user: updated[0] });
    }

    if (admin.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Only superadmins can modify administrator accounts.' },
        { status: 403 }
      );
    }

    const targetId = Number(body.id);
    if (!targetId) {
      return NextResponse.json({ error: 'Missing admin ID' }, { status: 400 });
    }

    if (targetId === admin.id && body.active === false) {
      return NextResponse.json(
        { error: 'You cannot deactivate your own active superadmin session.' },
        { status: 400 }
      );
    }

    const name = body.name !== undefined ? String(body.name).trim() : undefined;
    const role =
      body.role !== undefined
        ? body.role === 'superadmin'
          ? 'superadmin'
          : 'admin'
        : undefined;
    const active = body.active !== undefined ? Boolean(body.active) : undefined;
    const newPassword = body.newPassword ? String(body.newPassword) : undefined;
    const passwordHash =
      newPassword && newPassword.length >= 6 ? hashPassword(newPassword) : undefined;

    const updated = await sql`
      UPDATE admins
      SET
        name = COALESCE(${name ?? null}, name),
        role = COALESCE(${role ?? null}, role),
        active = COALESCE(${active ?? null}, active),
        password_hash = COALESCE(${passwordHash ?? null}, password_hash)
      WHERE id = ${targetId}
      RETURNING id, email, name, role, active, last_login_at, created_at
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ user: updated[0] });
  } catch (err) {
    console.error('Update admin user error:', err);
    return NextResponse.json(
      { error: 'Failed to update admin user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json(
      { error: 'Only superadmins can delete administrator accounts.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    if (!id) {
      return NextResponse.json({ error: 'Missing admin ID' }, { status: 400 });
    }
    if (id === admin.id) {
      return NextResponse.json(
        { error: 'You cannot delete your own superadmin account.' },
        { status: 400 }
      );
    }

    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM admins WHERE id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete admin user error:', err);
    return NextResponse.json(
      { error: 'Failed to delete admin user' },
      { status: 500 }
    );
  }
}
