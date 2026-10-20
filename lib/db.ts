import { neon } from '@neondatabase/serverless';
import { hashPassword } from './password';
import { DEFAULT_PORTFOLIO_COLLECTIONS } from './portfolio-seed-data';

export function getSql() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_UNPOOLED;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured.');
  }
  return neon(connectionString);
}

let schemaInitialized = false;

export const DEFAULT_SUPERADMIN_EMAIL = 'demolablaze@gmail.com';
export const DEFAULT_SUPERADMIN_PASSWORD =
  process.env.SUPERADMIN_INITIAL_PASSWORD || '$Omerta93';

export const DEFAULT_SERVICES = [
  {
    title: 'Books and stationery',
    category: 'Retail & Supplies',
    description:
      'Shop for books and everyday stationery supplies for school, work and home.',
    active: true,
    sort_order: 1,
  },
  {
    title: 'Printing and photocopying',
    category: 'Print Studio',
    description:
      'Get clear, dependable printing and photocopying for documents, schoolwork and business materials.',
    active: true,
    sort_order: 2,
  },
  {
    title: 'Laminating and binding',
    category: 'Print Studio',
    description:
      'Protect, finish and organise your documents with laminating and binding services.',
    active: true,
    sort_order: 3,
  },
  {
    title: 'Large-format printing',
    category: 'Print Studio',
    description:
      'Make a bigger impression with large-format prints for banners, posters and other display materials.',
    active: true,
    sort_order: 4,
  },
  {
    title: 'Passport photographs',
    category: 'Studio Services',
    description:
      'Get passport photographs prepared for official applications and identification.',
    active: true,
    sort_order: 5,
  },
  {
    title: 'Online registration',
    category: 'Digital Portal',
    description:
      'Get help with online applications and registrations, including JAMB, WAEC, Post-UTME, visa and NYSC processes.',
    active: true,
    sort_order: 6,
  },
  {
    title: 'Brand identity',
    category: 'Creative & Brand',
    description:
      'Naming direction, logos, colour systems and guidelines that give your business a recognisable point of view.',
    active: true,
    sort_order: 7,
  },
  {
    title: 'Web design and development',
    category: 'Digital Products',
    description:
      'Responsive, high-performing websites that make your offer easy to understand and easier to act on.',
    active: true,
    sort_order: 8,
  },
  {
    title: 'UI and UX design',
    category: 'Digital Products',
    description:
      'Clear product flows and interfaces shaped around the real needs of your customers and team.',
    active: true,
    sort_order: 9,
  },
  {
    title: 'E-commerce',
    category: 'Digital Products',
    description:
      'Thoughtful storefronts that build trust, reduce friction and help more of the right people buy.',
    active: true,
    sort_order: 10,
  },
  {
    title: 'Campaign design',
    category: 'Creative & Brand',
    description:
      'Launch concepts, social assets and print-ready creative that keep your message consistent everywhere.',
    active: true,
    sort_order: 11,
  },
  {
    title: 'Digital products',
    category: 'Digital Products',
    description:
      'From first prototype to useful release, we help turn a promising idea into something people can use.',
    active: true,
    sort_order: 12,
  },
];

export async function ensureSchema() {
  if (schemaInitialized) return;
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL DEFAULT 'Super Admin',
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      active BOOLEAN NOT NULL DEFAULT true,
      last_login_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id SERIAL PRIMARY KEY,
      token_hash TEXT UNIQUE NOT NULL,
      admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      service TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS services_catalog (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'General',
      description TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Ensure default superadmin exists
  const existingSuperadmin = await sql`
    SELECT id FROM admins WHERE LOWER(email) = LOWER(${DEFAULT_SUPERADMIN_EMAIL}) LIMIT 1
  `;

  if (existingSuperadmin.length === 0) {
    const passwordHash = hashPassword(DEFAULT_SUPERADMIN_PASSWORD);
    await sql`
      INSERT INTO admins (email, name, password_hash, role, active)
      VALUES (${DEFAULT_SUPERADMIN_EMAIL}, 'Demola Blaze', ${passwordHash}, 'superadmin', true)
      ON CONFLICT (email) DO NOTHING
    `;
  }

  // Seed portfolio items if empty
  const portfolioCount = await sql`SELECT COUNT(*)::int AS count FROM portfolio_items`;
  if ((portfolioCount[0]?.count ?? 0) === 0) {
    for (const collection of DEFAULT_PORTFOLIO_COLLECTIONS) {
      for (let i = 0; i < collection.files.length; i++) {
        const file = collection.files[i];
        const title = file.replace(/\.[^.]+$/, '');
        const imageUrl = encodeURI(`/portfolio/${collection.slug}/${file}`);
        const featured = i < 2;
        await sql`
          INSERT INTO portfolio_items (title, category, image_url, featured)
          VALUES (${title}, ${collection.slug}, ${imageUrl}, ${featured})
        `;
      }
    }
  }

  // Seed services catalog if empty
  const servicesCount = await sql`SELECT COUNT(*)::int AS count FROM services_catalog`;
  if ((servicesCount[0]?.count ?? 0) === 0) {
    for (const svc of DEFAULT_SERVICES) {
      await sql`
        INSERT INTO services_catalog (title, category, description, active, sort_order)
        VALUES (${svc.title}, ${svc.category}, ${svc.description}, ${svc.active}, ${svc.sort_order})
      `;
    }
  }

  schemaInitialized = true;
}
