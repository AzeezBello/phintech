import fs from 'fs';
import path from 'path';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { neon } from '@neondatabase/serverless';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

const KEY_LEN = 64;
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, KEY_LEN).toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedBuffer = scryptSync(password, salt, KEY_LEN);
  if (keyBuffer.length !== derivedBuffer.length) return false;
  return timingSafeEqual(keyBuffer, derivedBuffer);
}

const SUPERADMIN_EMAIL = 'demolablaze@gmail.com';
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_INITIAL_PASSWORD || '$Omerta93';

const DEFAULT_PORTFOLIO_COLLECTIONS = [
  {
    label: 'Branding',
    slug: 'branding',
    files: [
      '801.jpg', '802.jpg', '803.jpg', '804.jpg', '805.jpg',
      '85 BIRTHDAY BANNER.jpg', '85 XAMPLE.jpg', 'C1.jpg', 'C2.jpg',
      'C4.jpg', 'C6.jpg', 'C7.jpg', 'CUP BRANDING.jpg', 'bag1.jpg', 'bag2.jpg',
    ],
  },
  {
    label: 'Flyers',
    slug: 'flyers',
    files: [
      'ALEXANDER LAUNDRY SERVICES.jpg', 'CALL TO GLORY.jpg',
      'FB_IMG_1540900566580.jpg', 'FIRE TERBANACLE.jpg', 'HOLY GHOST.jpg',
      'IMG_20231016_163920_336.jpg', 'KRISTY LERE.jpg', 'OPEN HEAVEN.jpg',
      'REDEEM FLYER.jpg', 'REDEEM FLYERS PRAISE.jpg', 'REDEEM.jpg', 'eagle.jpg',
    ],
  },
  {
    label: 'Letter Heads',
    slug: 'letter-head',
    files: [
      'DAFNE.jpg', 'GREEN CODE.jpg', 'JBC LETTER HEAD.jpg', 'PEGESUS.jpg',
      'PLAN CONCEPT.jpg', 'PLURAL DEVELOPMENT.jpg', 'ZIPS LETTER HEAD.jpg',
    ],
  },
  {
    label: 'Logos',
    slug: 'logos',
    files: [
      '7 FIGURES.jpg', 'ADEBOLA OGUNGBE AND CO.jpg', 'AR.jpg', 'AUTOTHEFT.jpg',
      'BUTTERFLY.jpg', 'DIVING LIFE DREAMS.jpg', 'EONIAN.jpg',
      'FB_IMG_1501187141845.jpg', 'FB_IMG_1501521333730.jpg', 'HAULAGE.jpg',
      'Ideal.jpg', 'JEMEN.jpg', 'LOGO CONCEPT.jpg', 'LOGO SAMPLE.jpg',
      'LOGO.jpg', 'PURPLE.jpg', 'SAMPLE LOGO.jpg', 'SAMSONITE.jpg',
      'SMAKE.jpg', 'TANTUA.jpg', 'VILLAM.jpg', 'XOE.jpg', 'ZIPS.jpg',
      'atmos.jpg', 'berikon.jpg', 'claystone.jpg', 'consupport.jpg',
      'cvilouild.jpg', 'eglux.jpg', 'flamboyant.jpg', 'fleurApex.jpg',
      'hijja.jpg', 'integride.jpg', 'lighton.jpg', 'neuimark.jpg',
      'nueimark 2.jpg', 'primashoxy.jpg', 'sealcom.jpg', 'somitypeters.jpg',
      'vivyafrik.jpg',
    ],
  },
];

const DEFAULT_SERVICES = [
  { title: 'Books and stationery', category: 'Retail & Supplies', description: 'Shop for books and everyday stationery supplies for school, work and home.', active: true, sort_order: 1 },
  { title: 'Printing and photocopying', category: 'Print Studio', description: 'Get clear, dependable printing and photocopying for documents, schoolwork and business materials.', active: true, sort_order: 2 },
  { title: 'Laminating and binding', category: 'Print Studio', description: 'Protect, finish and organise your documents with laminating and binding services.', active: true, sort_order: 3 },
  { title: 'Large-format printing', category: 'Print Studio', description: 'Make a bigger impression with large-format prints for banners, posters and other display materials.', active: true, sort_order: 4 },
  { title: 'Passport photographs', category: 'Studio Services', description: 'Get passport photographs prepared for official applications and identification.', active: true, sort_order: 5 },
  { title: 'Online registration', category: 'Digital Portal', description: 'Get help with online applications and registrations, including JAMB, WAEC, Post-UTME, visa and NYSC processes.', active: true, sort_order: 6 },
  { title: 'Brand identity', category: 'Creative & Brand', description: 'Naming direction, logos, colour systems and guidelines that give your business a recognisable point of view.', active: true, sort_order: 7 },
  { title: 'Web design and development', category: 'Digital Products', description: 'Responsive, high-performing websites that make your offer easy to understand and easier to act on.', active: true, sort_order: 8 },
  { title: 'UI and UX design', category: 'Digital Products', description: 'Clear product flows and interfaces shaped around the real needs of your customers and team.', active: true, sort_order: 9 },
  { title: 'E-commerce', category: 'Digital Products', description: 'Thoughtful storefronts that build trust, reduce friction and help more of the right people buy.', active: true, sort_order: 10 },
  { title: 'Campaign design', category: 'Creative & Brand', description: 'Launch concepts, social assets and print-ready creative that keep your message consistent everywhere.', active: true, sort_order: 11 },
  { title: 'Digital products', category: 'Digital Products', description: 'From first prototype to useful release, we help turn a promising idea into something people can use.', active: true, sort_order: 12 },
];

async function main() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_UNPOOLED;

  if (!connectionString) {
    throw new Error('No DATABASE_URL found in .env.local or environment');
  }

  const sql = neon(connectionString);

  console.log('Connecting to Neon PostgreSQL...');
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

  const passwordHash = hashPassword(SUPERADMIN_PASSWORD);

  const upserted = await sql`
    INSERT INTO admins (email, name, password_hash, role, active)
    VALUES (${SUPERADMIN_EMAIL}, 'Demola Blaze', ${passwordHash}, 'superadmin', true)
    ON CONFLICT (email) DO UPDATE
      SET password_hash = EXCLUDED.password_hash,
          role = 'superadmin',
          active = true
    RETURNING id, email, name, role, active, created_at
  `;

  const admin = upserted[0];
  const check = await sql`SELECT password_hash FROM admins WHERE id = ${admin.id}`;
  const verified = verifyPassword(SUPERADMIN_PASSWORD, check[0].password_hash);

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

  const servicesCount = await sql`SELECT COUNT(*)::int AS count FROM services_catalog`;
  if ((servicesCount[0]?.count ?? 0) === 0) {
    for (const svc of DEFAULT_SERVICES) {
      await sql`
        INSERT INTO services_catalog (title, category, description, active, sort_order)
        VALUES (${svc.title}, ${svc.category}, ${svc.description}, ${svc.active}, ${svc.sort_order})
      `;
    }
  }

  const finalCounts = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM admins) AS admins_count,
      (SELECT COUNT(*)::int FROM portfolio_items) AS portfolio_count,
      (SELECT COUNT(*)::int FROM services_catalog) AS services_count,
      (SELECT COUNT(*)::int FROM enquiries) AS enquiries_count
  `;

  console.log('Superadmin seeded and verified:', {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    active: admin.active,
    passwordVerified: verified,
    counts: finalCounts[0],
  });
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
