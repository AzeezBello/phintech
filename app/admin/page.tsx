import { redirect } from 'next/navigation';
import { getCurrentAdmin, type AdminUser } from '@/lib/auth';
import { ensureSchema, getSql } from '@/lib/db';
import {
  AdminDashboard,
  type EnquiryRecord,
  type PortfolioRecord,
  type ServiceRecord,
} from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  await ensureSchema();
  const sql = getSql();

  const [enquiriesRows, portfolioRows, servicesRows, adminsRows] =
    await Promise.all([
      sql`
        SELECT id, name, email, company, phone, service, message, status, notes, created_at, updated_at
        FROM enquiries
        ORDER BY created_at DESC, id DESC
      `,
      sql`
        SELECT id, title, category, image_url, featured, created_at
        FROM portfolio_items
        ORDER BY featured DESC, id DESC
      `,
      sql`
        SELECT id, title, category, description, active, sort_order, created_at
        FROM services_catalog
        ORDER BY sort_order ASC, id ASC
      `,
      sql`
        SELECT id, email, name, role, active, last_login_at, created_at
        FROM admins
        ORDER BY id ASC
      `,
    ]);

  const initialEnquiries: EnquiryRecord[] = enquiriesRows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    email: String(r.email),
    company: r.company ? String(r.company) : null,
    phone: r.phone ? String(r.phone) : null,
    service: r.service ? String(r.service) : null,
    message: String(r.message),
    status: (['new', 'in_progress', 'replied', 'archived'].includes(
      String(r.status)
    )
      ? r.status
      : 'new') as EnquiryRecord['status'],
    notes: r.notes ? String(r.notes) : null,
    created_at: String(r.created_at),
    updated_at: String(r.updated_at),
  }));

  const initialPortfolio: PortfolioRecord[] = portfolioRows.map((r) => ({
    id: Number(r.id),
    title: String(r.title),
    category: (['branding', 'flyers', 'letter-head', 'logos'].includes(
      String(r.category)
    )
      ? r.category
      : 'branding') as PortfolioRecord['category'],
    image_url: String(r.image_url),
    featured: Boolean(r.featured),
    created_at: String(r.created_at),
  }));

  const initialServices: ServiceRecord[] = servicesRows.map((r) => ({
    id: Number(r.id),
    title: String(r.title),
    category: String(r.category),
    description: String(r.description),
    active: Boolean(r.active),
    sort_order: Number(r.sort_order),
    created_at: String(r.created_at),
  }));

  const initialAdmins: AdminUser[] = adminsRows.map((r) => ({
    id: Number(r.id),
    email: String(r.email),
    name: String(r.name),
    role: r.role === 'superadmin' ? 'superadmin' : 'admin',
    active: Boolean(r.active),
    last_login_at: r.last_login_at ? String(r.last_login_at) : null,
    created_at: String(r.created_at),
  }));

  return (
    <AdminDashboard
      currentAdmin={admin}
      initialEnquiries={initialEnquiries}
      initialPortfolio={initialPortfolio}
      initialServices={initialServices}
      initialAdmins={initialAdmins}
    />
  );
}
