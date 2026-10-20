import { createHash, randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { ensureSchema, getSql } from './db';

export const SESSION_COOKIE_NAME = 'phintech_admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type AdminUser = {
  id: number;
  email: string;
  name: string;
  role: 'superadmin' | 'admin';
  active: boolean;
  last_login_at: string | null;
  created_at: string;
};

export function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createAdminSession(adminId: number): Promise<string> {
  await ensureSchema();
  const sql = getSql();
  const token = randomBytes(32).toString('hex');
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000).toISOString();

  await sql`
    INSERT INTO admin_sessions (token_hash, admin_id, expires_at)
    VALUES (${tokenHash}, ${adminId}, ${expiresAt})
  `;

  await sql`
    UPDATE admins SET last_login_at = NOW() WHERE id = ${adminId}
  `;

  return token;
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    await ensureSchema();
    const sql = getSql();
    const tokenHash = hashSessionToken(token);

    const rows = await sql`
      SELECT
        a.id,
        a.email,
        a.name,
        a.role,
        a.active,
        a.last_login_at,
        a.created_at
      FROM admin_sessions s
      INNER JOIN admins a ON a.id = s.admin_id
      WHERE s.token_hash = ${tokenHash}
        AND s.expires_at > NOW()
        AND a.active = true
      LIMIT 1
    `;

    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: Number(row.id),
      email: String(row.email),
      name: String(row.name),
      role: row.role === 'superadmin' ? 'superadmin' : 'admin',
      active: Boolean(row.active),
      last_login_at: row.last_login_at ? String(row.last_login_at) : null,
      created_at: String(row.created_at),
    };
  } catch {
    return null;
  }
}

export async function destroySessionByToken(token: string | undefined) {
  if (!token) return;
  try {
    await ensureSchema();
    const sql = getSql();
    const tokenHash = hashSessionToken(token);
    await sql`DELETE FROM admin_sessions WHERE token_hash = ${tokenHash}`;
  } catch {
    // Ignore errors during session cleanup
  }
}
