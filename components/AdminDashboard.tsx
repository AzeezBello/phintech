'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Database,
  ExternalLink,
  FolderKanban,
  Inbox,
  Layers,
  LogOut,
  Mail,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Star,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import type { AdminUser } from '@/lib/auth';
import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export type EnquiryRecord = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  message: string;
  status: 'new' | 'in_progress' | 'replied' | 'archived';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type PortfolioRecord = {
  id: number;
  title: string;
  category: 'branding' | 'flyers' | 'letter-head' | 'logos';
  image_url: string;
  featured: boolean;
  created_at: string;
};

export type ServiceRecord = {
  id: number;
  title: string;
  category: string;
  description: string;
  active: boolean;
  sort_order: number;
  created_at: string;
};

type Props = {
  currentAdmin: AdminUser;
  initialEnquiries: EnquiryRecord[];
  initialPortfolio: PortfolioRecord[];
  initialServices: ServiceRecord[];
  initialAdmins: AdminUser[];
};

const CATEGORY_LABELS: Record<PortfolioRecord['category'], string> = {
  branding: 'Branding',
  flyers: 'Flyers',
  'letter-head': 'Letter Heads',
  logos: 'Logos',
};

const STATUS_VARIANTS: Record<EnquiryRecord['status'], BadgeVariant> = {
  new: 'default',
  in_progress: 'warning',
  replied: 'success',
  archived: 'secondary',
};

export function AdminDashboard({
  currentAdmin,
  initialEnquiries,
  initialPortfolio,
  initialServices,
  initialAdmins,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(initialEnquiries);
  const [portfolio, setPortfolio] = useState<PortfolioRecord[]>(initialPortfolio);
  const [services, setServices] = useState<ServiceRecord[]>(initialServices);
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Enquiry filter state
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');
  const [enquirySearch, setEnquirySearch] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<number | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');

  // Portfolio filter & create form state
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] =
    useState<string>('all');
  const [portfolioSearch, setPortfolioSearch] = useState<string>('');
  const [newPortfolioTitle, setNewPortfolioTitle] = useState('');
  const [newPortfolioCategory, setNewPortfolioCategory] =
    useState<PortfolioRecord['category']>('branding');
  const [newPortfolioUrl, setNewPortfolioUrl] = useState('');
  const [newPortfolioFeatured, setNewPortfolioFeatured] = useState(false);
  const [creatingPortfolio, setCreatingPortfolio] = useState(false);

  // Portfolio edit modal state
  const [editingPortfolioItem, setEditingPortfolioItem] =
    useState<PortfolioRecord | null>(null);
  const [editPortfolioTitle, setEditPortfolioTitle] = useState('');
  const [editPortfolioCategory, setEditPortfolioCategory] =
    useState<PortfolioRecord['category']>('branding');
  const [editPortfolioUrl, setEditPortfolioUrl] = useState('');
  const [editPortfolioFeatured, setEditPortfolioFeatured] = useState(false);
  const [savingPortfolioEdit, setSavingPortfolioEdit] = useState(false);

  // Service form state
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Print Studio');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceOrder, setNewServiceOrder] = useState('13');
  const [creatingService, setCreatingService] = useState(false);

  // Team / Admin form state
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'superadmin'>(
    'admin'
  );
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  // Own password update state
  const [profileName, setProfileName] = useState(currentAdmin.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  function notify(msg: string) {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage((prev) => (prev === msg ? '' : prev));
    }, 4000);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  async function refreshAll() {
    try {
      const [enqRes, portRes, svcRes, admRes] = await Promise.all([
        fetch('/api/admin/enquiries'),
        fetch('/api/admin/portfolio'),
        fetch('/api/admin/services'),
        fetch('/api/admin/users'),
      ]);
      if (enqRes.ok) {
        const d = await enqRes.json();
        setEnquiries(d.enquiries);
      }
      if (portRes.ok) {
        const d = await portRes.json();
        setPortfolio(d.items);
      }
      if (svcRes.ok) {
        const d = await svcRes.json();
        setServices(d.services);
      }
      if (admRes.ok) {
        const d = await admRes.json();
        setAdmins(d.admins);
      }
      notify('Synced latest data from Neon PostgreSQL.');
    } catch {
      notify('Could not refresh data.');
    }
  }

  // Enquiry actions
  async function updateEnquiryStatus(
    id: number,
    status: EnquiryRecord['status']
  ) {
    const res = await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const { enquiry } = await res.json();
      setEnquiries((prev) => prev.map((e) => (e.id === id ? enquiry : e)));
      notify(`Enquiry #${id} marked as ${status.replace('_', ' ')}.`);
    }
  }

  async function saveEnquiryNotes(id: number) {
    const res = await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, notes: notesDraft }),
    });
    if (res.ok) {
      const { enquiry } = await res.json();
      setEnquiries((prev) => prev.map((e) => (e.id === id ? enquiry : e)));
      setEditingNotesId(null);
      notify(`Saved notes for enquiry #${id}.`);
    }
  }

  async function deleteEnquiry(id: number) {
    const res = await fetch(`/api/admin/enquiries?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      notify(`Deleted enquiry #${id}.`);
    }
  }

  // Portfolio actions
  async function handleCreatePortfolio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (creatingPortfolio) return;
    if (!newPortfolioUrl.trim()) {
      notify('Please upload an image or enter an image URL first.');
      return;
    }
    setCreatingPortfolio(true);
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPortfolioTitle,
          category: newPortfolioCategory,
          image_url: newPortfolioUrl,
          featured: newPortfolioFeatured,
        }),
      });
      const data = await res.json();
      if (res.ok && data.item) {
        setPortfolio((prev) => [data.item, ...prev]);
        setNewPortfolioTitle('');
        setNewPortfolioUrl('');
        setNewPortfolioFeatured(false);
        notify(`Added "${data.item.title}" to portfolio.`);
      } else {
        notify(data.error || 'Failed to add portfolio item.');
      }
    } finally {
      setCreatingPortfolio(false);
    }
  }

  function openEditPortfolioModal(item: PortfolioRecord) {
    setEditingPortfolioItem(item);
    setEditPortfolioTitle(item.title);
    setEditPortfolioCategory(item.category);
    setEditPortfolioUrl(item.image_url);
    setEditPortfolioFeatured(item.featured);
  }

  async function handleSavePortfolioEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingPortfolioItem || savingPortfolioEdit) return;
    if (!editPortfolioUrl.trim()) {
      notify('Please upload or provide an image for this project.');
      return;
    }
    setSavingPortfolioEdit(true);
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingPortfolioItem.id,
          title: editPortfolioTitle,
          category: editPortfolioCategory,
          image_url: editPortfolioUrl,
          featured: editPortfolioFeatured,
        }),
      });
      const data = await res.json();
      if (res.ok && data.item) {
        setPortfolio((prev) =>
          prev.map((p) => (p.id === editingPortfolioItem.id ? data.item : p))
        );
        setEditingPortfolioItem(null);
        notify(`Updated "${data.item.title}".`);
      } else {
        notify(data.error || 'Failed to update portfolio project.');
      }
    } finally {
      setSavingPortfolioEdit(false);
    }
  }

  async function togglePortfolioFeatured(item: PortfolioRecord) {
    const res = await fetch('/api/admin/portfolio', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, featured: !item.featured }),
    });
    if (res.ok) {
      const { item: updated } = await res.json();
      setPortfolio((prev) =>
        prev.map((p) => (p.id === item.id ? updated : p))
      );
      notify(
        updated.featured
          ? `Featured "${updated.title}".`
          : `Unfeatured "${updated.title}".`
      );
    }
  }

  async function deletePortfolioItem(id: number) {
    const res = await fetch(`/api/admin/portfolio?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setPortfolio((prev) => prev.filter((p) => p.id !== id));
      notify('Removed portfolio project.');
    }
  }

  // Service actions
  async function handleCreateService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (creatingService) return;
    setCreatingService(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newServiceTitle,
          category: newServiceCategory,
          description: newServiceDesc,
          sort_order: Number(newServiceOrder) || 10,
          active: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.service) {
        setServices((prev) => [...prev, data.service]);
        setNewServiceTitle('');
        setNewServiceDesc('');
        notify(`Added service "${data.service.title}".`);
      } else {
        notify(data.error || 'Failed to add service.');
      }
    } finally {
      setCreatingService(false);
    }
  }

  async function toggleServiceActive(svc: ServiceRecord) {
    const res = await fetch('/api/admin/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: svc.id, active: !svc.active }),
    });
    if (res.ok) {
      const { service } = await res.json();
      setServices((prev) => prev.map((s) => (s.id === svc.id ? service : s)));
      notify(
        service.active
          ? `Enabled "${service.title}".`
          : `Hidden "${service.title}".`
      );
    }
  }

  async function deleteService(id: number) {
    const res = await fetch(`/api/admin/services?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      notify('Deleted service.');
    }
  }

  // Admin / Superadmin actions
  async function handleCreateAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (creatingAdmin) return;
    setCreatingAdmin(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAdminName,
          email: newAdminEmail,
          password: newAdminPassword,
          role: newAdminRole,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setAdmins((prev) => [...prev, data.user]);
        setNewAdminName('');
        setNewAdminEmail('');
        setNewAdminPassword('');
        notify(`Created ${data.user.role} account for ${data.user.email}.`);
      } else {
        notify(data.error || 'Could not create admin account.');
      }
    } finally {
      setCreatingAdmin(false);
    }
  }

  async function toggleAdminStatus(target: AdminUser) {
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: target.id, active: !target.active }),
    });
    const data = await res.json();
    if (res.ok && data.user) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === target.id ? data.user : a))
      );
      notify(
        data.user.active
          ? `Activated ${data.user.email}.`
          : `Suspended ${data.user.email}.`
      );
    } else {
      notify(data.error || 'Update failed.');
    }
  }

  async function toggleAdminRole(target: AdminUser) {
    const nextRole = target.role === 'superadmin' ? 'admin' : 'superadmin';
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: target.id, role: nextRole }),
    });
    const data = await res.json();
    if (res.ok && data.user) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === target.id ? data.user : a))
      );
      notify(`Updated ${data.user.email} role to ${data.user.role}.`);
    } else {
      notify(data.error || 'Role update failed.');
    }
  }

  async function deleteAdminUser(id: number) {
    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      notify('Removed administrator account.');
    } else {
      notify(data.error || 'Could not remove administrator.');
    }
  }

  async function handleUpdateOwnProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (updatingProfile) return;
    setUpdatingProfile(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_own_password',
          name: profileName,
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setAdmins((prev) =>
          prev.map((a) => (a.id === currentAdmin.id ? data.user : a))
        );
        setCurrentPassword('');
        setNewPassword('');
        notify('Your profile and password have been updated.');
      } else {
        notify(data.error || 'Could not update password.');
      }
    } finally {
      setUpdatingProfile(false);
    }
  }

  // Computed metrics
  const newEnquiriesCount = useMemo(
    () => enquiries.filter((e) => e.status === 'new').length,
    [enquiries]
  );

  const featuredPortfolioCount = useMemo(
    () => portfolio.filter((p) => p.featured).length,
    [portfolio]
  );

  const activeServicesCount = useMemo(
    () => services.filter((s) => s.active).length,
    [services]
  );

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (enquiryStatusFilter !== 'all' && e.status !== enquiryStatusFilter) {
        return false;
      }
      if (!enquirySearch.trim()) return true;
      const q = enquirySearch.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.company || '').toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q)
      );
    });
  }, [enquiries, enquiryStatusFilter, enquirySearch]);

  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((p) => {
      if (
        portfolioCategoryFilter !== 'all' &&
        p.category !== portfolioCategoryFilter
      ) {
        return false;
      }
      if (!portfolioSearch.trim()) return true;
      const q = portfolioSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [portfolio, portfolioCategoryFilter, portfolioSearch]);

  return (
    <main className="container py-12 md:py-16">
      {/* Sonner-style Floating Notification Pill */}
      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className="sonner-toast fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#ffd400]/45 bg-[#121318]/95 px-5 py-3 text-xs font-bold text-[#ffd400] shadow-[0_16px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        >
          <CheckCircle2 size={15} className="shrink-0" />
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage('')}
            aria-label="Dismiss notification"
            className="ml-1 rounded-full p-0.5 text-[#a1a1aa] hover:text-white"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge>
              <Sparkles size={13} />
              {currentAdmin.role === 'superadmin' ? 'Superadmin' : 'Admin'} Dashboard
            </Badge>
            <Badge variant="success">
              <Database size={12} /> Neon PostgreSQL Connected
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Phintech Control Centre
          </h1>
          <p className="mt-2 text-sm text-[#a1a1aa]">
            Signed in as <strong className="text-[#fafafa]">{currentAdmin.name}</strong>{' '}
            (<span className="text-[#ffd400]">{currentAdmin.email}</span>)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button type="button" variant="outline" size="sm" onClick={refreshAll}>
            <RefreshCw size={14} /> Sync DB
          </Button>
          <Button asChild href="/work" variant="outline" size="sm">
            Live Work <ExternalLink size={14} />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut size={14} /> Sign Out
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Shadcn Tabs Navigation & Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <Layers size={15} />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="enquiries">
            <Inbox size={15} />
            <span>Enquiries</span>
            {newEnquiriesCount > 0 && (
              <span className="tabular-nums rounded-full bg-[#09090b]/20 px-1.5 py-0.5 text-[10px] font-black">
                {newEnquiriesCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <FolderKanban size={15} />
            <span>Portfolio</span>
            <span className="tabular-nums opacity-70">({portfolio.length})</span>
          </TabsTrigger>
          <TabsTrigger value="services">
            <Sparkles size={15} />
            <span>Services</span>
            <span className="tabular-nums opacity-70">({services.length})</span>
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users size={15} />
            <span>Superadmin & Team</span>
            <span className="tabular-nums opacity-70">({admins.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-[#ffd400]">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Client Enquiries
                  </span>
                  <Inbox size={17} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="tabular-nums text-4xl font-black tracking-tight">
                  {enquiries.length}
                </p>
                <p className="mt-1 text-xs text-[#a1a1aa]">
                  {newEnquiriesCount} unread / new enquiries
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-[#ffd400]">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Portfolio Archive
                  </span>
                  <FolderKanban size={17} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="tabular-nums text-4xl font-black tracking-tight">
                  {portfolio.length}
                </p>
                <p className="mt-1 text-xs text-[#a1a1aa]">
                  {featuredPortfolioCount} featured works across 4 categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-[#ffd400]">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Studio Services
                  </span>
                  <Sparkles size={17} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="tabular-nums text-4xl font-black tracking-tight">
                  {activeServicesCount}/{services.length}
                </p>
                <p className="mt-1 text-xs text-[#a1a1aa]">
                  Active offerings in catalog
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-[#ed168c]">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Administrators
                  </span>
                  <Shield size={17} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="tabular-nums text-4xl font-black tracking-tight">
                  {admins.length}
                </p>
                <p className="mt-1 text-xs text-[#a1a1aa]">
                  {admins.filter((a) => a.role === 'superadmin').length}{' '}
                  superadmin(s) active
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-[#26272b] pb-4">
                <div>
                  <CardTitle>Recent Enquiries</CardTitle>
                  <CardDescription>
                    Messages submitted through the Phintech Contact page
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('enquiries')}
                >
                  Manage all
                </Button>
              </CardHeader>
              <CardContent>
                {enquiries.length === 0 ? (
                  <div className="py-10 text-center text-sm text-[#a1a1aa]">
                    No enquiries recorded yet. Submissions on{' '}
                    <Link href="/contact" className="text-[#ffd400] underline">
                      /contact
                    </Link>{' '}
                    appear here automatically.
                  </div>
                ) : (
                  <div className="divide-y divide-[#222328]">
                    {enquiries.slice(0, 5).map((enq) => (
                      <div
                        key={enq.id}
                        className="flex flex-col justify-between gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-[#fafafa]">
                              {enq.name}
                            </span>
                            <Badge variant={STATUS_VARIANTS[enq.status]}>
                              {enq.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs text-[#a1a1aa]">
                            {enq.email} {enq.company ? `• ${enq.company}` : ''}
                          </p>
                          <p className="mt-1.5 line-clamp-2 text-sm text-[#d4d4d8]">
                            {enq.message}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveTab('enquiries')}
                        >
                          Inspect
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump directly to studio management workflows backed by your Neon database.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  className="action-button flex items-center justify-between rounded-xl border border-[#2a2c32] bg-[#141519] p-3.5 text-left text-sm font-bold text-[#fafafa] hover:border-[#ffd400]"
                >
                  <span>Upload or feature portfolio work</span>
                  <Plus size={16} className="text-[#ffd400]" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="action-button flex items-center justify-between rounded-xl border border-[#2a2c32] bg-[#141519] p-3.5 text-left text-sm font-bold text-[#fafafa] hover:border-[#ffd400]"
                >
                  <span>Update studio services</span>
                  <Sparkles size={16} className="text-[#ffd400]" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('team')}
                  className="action-button flex items-center justify-between rounded-xl border border-[#2a2c32] bg-[#141519] p-3.5 text-left text-sm font-bold text-[#fafafa] hover:border-[#ffd400]"
                >
                  <span>Manage Superadmin & Team</span>
                  <Users size={16} className="text-[#ed168c]" />
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: ENQUIRIES */}
        <TabsContent value="enquiries" className="space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Tabs
              value={enquiryStatusFilter}
              onValueChange={setEnquiryStatusFilter}
              className="w-auto"
            >
              <TabsList>
                {(['all', 'new', 'in_progress', 'replied', 'archived'] as const).map(
                  (st) => (
                    <TabsTrigger key={st} value={st} className="uppercase">
                      {st.replace('_', ' ')}
                    </TabsTrigger>
                  )
                )}
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-72">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]"
              />
              <Input
                type="search"
                aria-label="Search enquiries"
                placeholder="Search name, email, message..."
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="none"
                className="pl-9"
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              {filteredEnquiries.length === 0 ? (
                <div className="p-12 text-center text-sm text-[#a1a1aa]">
                  No enquiries match the current filter.
                </div>
              ) : (
                <Table
                  style={
                    {
                      '--label-2': '"Message"',
                      '--label-3': '"Status"',
                      '--label-4': '"Notes"',
                      '--label-5': '"Actions"',
                    } as React.CSSProperties
                  }
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Internal Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnquiries.map((enq) => (
                      <TableRow key={enq.id} className="align-top">
                        <th className="p-4 text-left font-normal">
                          <p className="font-bold text-[#fafafa]">{enq.name}</p>
                          <p className="text-xs text-[#ffd400]">{enq.email}</p>
                          {enq.company && (
                            <p className="mt-0.5 text-xs text-[#a1a1aa]">
                              {enq.company}
                            </p>
                          )}
                          <p className="tabular-nums mt-1 text-[11px] text-[#71717a]">
                            {new Date(enq.created_at).toLocaleString()}
                          </p>
                        </th>
                        <TableCell className="max-w-md">
                          <p className="whitespace-pre-wrap leading-6">
                            {enq.message}
                          </p>
                        </TableCell>
                        <TableCell>
                          <NativeSelect
                            aria-label={`Status for ${enq.name}`}
                            value={enq.status}
                            onChange={(e) =>
                              updateEnquiryStatus(
                                enq.id,
                                e.target.value as EnquiryRecord['status']
                              )
                            }
                            className="h-9 text-xs"
                          >
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                          </NativeSelect>
                        </TableCell>
                        <TableCell>
                          {editingNotesId === enq.id ? (
                            <div className="space-y-2">
                              <Textarea
                                rows={2}
                                value={notesDraft}
                                onChange={(e) => setNotesDraft(e.target.value)}
                                placeholder="Add internal note..."
                                className="min-h-[68px] text-xs"
                              />
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => saveEnquiryNotes(enq.id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingNotesId(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-xs text-[#a1a1aa]">
                                {enq.notes || 'No notes'}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingNotesId(enq.id);
                                  setNotesDraft(enq.notes || '');
                                }}
                                className="mt-1 text-xs font-bold text-[#ffd400] hover:underline"
                              >
                                {enq.notes ? 'Edit note' : '+ Add note'}
                              </button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-2">
                            <Button
                              asChild
                              href={`mailto:${enq.email}?subject=Re:%20Your%20Phintech%20Creatives%20Enquiry`}
                              variant="outline"
                              size="sm"
                            >
                              <Mail size={13} /> Reply
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteEnquiry(enq.id)}
                              aria-label={`Delete enquiry from ${enq.name}`}
                              className="hover:text-[#ed168c]"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: PORTFOLIO (with Image Uploader + Edit Modal) */}
        <TabsContent value="portfolio" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Portfolio Project</CardTitle>
              <CardDescription>
                Drag and drop an image file (or paste from clipboard) to upload directly to Neon PostgreSQL and publish to the live Work archive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleCreatePortfolio}
                className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"
              >
                <ImageUploader
                  id="create-portfolio-image"
                  value={newPortfolioUrl}
                  onChange={(url, meta) => {
                    setNewPortfolioUrl(url);
                    if (meta?.filename && !newPortfolioTitle.trim()) {
                      const suggested = meta.filename
                        .replace(/\.[^.]+$/, '')
                        .replace(/[-_]+/g, ' ')
                        .trim();
                      if (suggested) setNewPortfolioTitle(suggested);
                    }
                  }}
                />

                <div className="flex flex-col justify-between gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-title">Project Title</Label>
                      <Input
                        id="portfolio-title"
                        name="title"
                        required
                        placeholder="e.g. Lagos Tech Fest Identity"
                        value={newPortfolioTitle}
                        onChange={(e) => setNewPortfolioTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio-category">Category</Label>
                      <NativeSelect
                        id="portfolio-category"
                        name="category"
                        value={newPortfolioCategory}
                        onChange={(e) =>
                          setNewPortfolioCategory(
                            e.target.value as PortfolioRecord['category']
                          )
                        }
                      >
                        <option value="branding">Branding</option>
                        <option value="flyers">Flyers</option>
                        <option value="letter-head">Letter Heads</option>
                        <option value="logos">Logos</option>
                      </NativeSelect>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[#2a2c32] bg-[#0d0e11] px-4 py-3">
                    <div>
                      <Label
                        htmlFor="portfolio-featured-switch"
                        className="cursor-pointer text-xs text-[#fafafa]"
                      >
                        Feature on top of archive
                      </Label>
                      <p className="text-[11px] text-[#a1a1aa]">
                        Highlights this work with a Featured badge
                      </p>
                    </div>
                    <Switch
                      id="portfolio-featured-switch"
                      checked={newPortfolioFeatured}
                      onCheckedChange={setNewPortfolioFeatured}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={creatingPortfolio || !newPortfolioUrl}
                    className="w-full justify-center"
                  >
                    <Plus size={16} />{' '}
                    {creatingPortfolio ? 'Publishing Project...' : 'Publish to Portfolio'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Tabs
              value={portfolioCategoryFilter}
              onValueChange={setPortfolioCategoryFilter}
              className="w-auto"
            >
              <TabsList>
                {(
                  ['all', 'branding', 'flyers', 'letter-head', 'logos'] as const
                ).map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : CATEGORY_LABELS[cat]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-72">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]"
              />
              <Input
                type="search"
                aria-label="Search portfolio items"
                placeholder="Search title..."
                value={portfolioSearch}
                onChange={(e) => setPortfolioSearch(e.target.value)}
                spellCheck={false}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPortfolio.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-[4/3] bg-[#141519]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {item.featured && (
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-black/75 px-2.5 py-0.5 text-[10px] backdrop-blur-md">
                        <Sparkles size={10} /> Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-[#fafafa]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#a1a1aa]">
                        {CATEGORY_LABELS[item.category] || item.category}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => openEditPortfolioModal(item)}
                        aria-label={`Edit or replace image for ${item.title}`}
                        className="h-8 w-8"
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        type="button"
                        variant={item.featured ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => togglePortfolioFeatured(item)}
                        aria-label={
                          item.featured ? 'Unfeature item' : 'Feature item'
                        }
                        className="h-8 w-8"
                      >
                        <Star size={13} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePortfolioItem(item.id)}
                        aria-label={`Delete ${item.title}`}
                        className="h-8 w-8 hover:text-[#ed168c]"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit / Replace Image Modal */}
          <Dialog
            open={Boolean(editingPortfolioItem)}
            onOpenChange={(open) => {
              if (!open) setEditingPortfolioItem(null);
            }}
          >
            {editingPortfolioItem && (
              <form onSubmit={handleSavePortfolioEdit} className="space-y-5">
                <DialogHeader>
                  <DialogTitle>Edit Portfolio Project</DialogTitle>
                  <DialogDescription>
                    Upload a replacement image or update metadata for &ldquo;
                    {editingPortfolioItem.title}&rdquo;.
                  </DialogDescription>
                </DialogHeader>

                <ImageUploader
                  id="edit-portfolio-image"
                  value={editPortfolioUrl}
                  onChange={(url) => setEditPortfolioUrl(url)}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-portfolio-title">Project Title</Label>
                    <Input
                      id="edit-portfolio-title"
                      required
                      value={editPortfolioTitle}
                      onChange={(e) => setEditPortfolioTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-portfolio-category">Category</Label>
                    <NativeSelect
                      id="edit-portfolio-category"
                      value={editPortfolioCategory}
                      onChange={(e) =>
                        setEditPortfolioCategory(
                          e.target.value as PortfolioRecord['category']
                        )
                      }
                    >
                      <option value="branding">Branding</option>
                      <option value="flyers">Flyers</option>
                      <option value="letter-head">Letter Heads</option>
                      <option value="logos">Logos</option>
                    </NativeSelect>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#2a2c32] bg-[#0d0e11] px-4 py-3">
                  <Label
                    htmlFor="edit-portfolio-featured"
                    className="cursor-pointer text-xs text-[#fafafa]"
                  >
                    Feature on top of archive
                  </Label>
                  <Switch
                    id="edit-portfolio-featured"
                    checked={editPortfolioFeatured}
                    onCheckedChange={setEditPortfolioFeatured}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingPortfolioItem(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={savingPortfolioEdit || !editPortfolioUrl}
                  >
                    {savingPortfolioEdit ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </Dialog>
        </TabsContent>

        {/* TAB 4: SERVICES */}
        <TabsContent value="services" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Studio Service</CardTitle>
              <CardDescription>
                Manage offerings in your Neon `services_catalog` table.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleCreateService}
                className="grid gap-4 md:grid-cols-3"
              >
                <div className="space-y-2">
                  <Label htmlFor="service-title">Service Name</Label>
                  <Input
                    id="service-title"
                    required
                    placeholder="e.g. Corporate Gift Branding"
                    value={newServiceTitle}
                    onChange={(e) => setNewServiceTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-category">Category</Label>
                  <Input
                    id="service-category"
                    required
                    placeholder="Print Studio"
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-order">Display Order</Label>
                  <Input
                    id="service-order"
                    type="text"
                    inputMode="numeric"
                    value={newServiceOrder}
                    onChange={(e) => setNewServiceOrder(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="service-desc">Description</Label>
                  <Input
                    id="service-desc"
                    required
                    placeholder="Short description shown on the Services page"
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="submit"
                    disabled={creatingService}
                    className="w-full"
                  >
                    <Plus size={16} />{' '}
                    {creatingService ? 'Saving...' : 'Add Service'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <Card key={svc.id}>
                <CardContent className="flex h-full flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ffd400]">
                        {svc.category}
                      </span>
                      <Badge variant={svc.active ? 'success' : 'secondary'}>
                        {svc.active ? 'Active' : 'Hidden'}
                      </Badge>
                    </div>
                    <h3 className="mt-3 text-lg font-black text-[#fafafa]">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">
                      {svc.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#26272b] pt-3">
                    <div className="flex items-center gap-2.5">
                      <Switch
                        checked={svc.active}
                        onCheckedChange={() => toggleServiceActive(svc)}
                        aria-label={`Toggle ${svc.title}`}
                      />
                      <span className="text-xs font-bold text-[#a1a1aa]">
                        {svc.active ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteService(svc.id)}
                      aria-label={`Delete ${svc.title}`}
                      className="h-8 w-8 hover:text-[#ed168c]"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 5: SUPERADMIN & TEAM */}
        <TabsContent value="team" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {currentAdmin.role === 'superadmin' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-[#ffd400]">
                    <UserPlus size={18} />
                    <CardTitle>Create Administrator Account</CardTitle>
                  </div>
                  <CardDescription>
                    Grant team members or co-founders access to the Phintech Admin Dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-admin-name">Full name</Label>
                      <Input
                        id="new-admin-name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Full name"
                        value={newAdminName}
                        onChange={(e) => setNewAdminName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-admin-email">Email address</Label>
                      <Input
                        id="new-admin-email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        spellCheck={false}
                        autoCorrect="off"
                        autoCapitalize="none"
                        required
                        placeholder="admin@phintechcreatives.com"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-admin-password">
                        Initial Password
                      </Label>
                      <Input
                        id="new-admin-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        minLength={6}
                        required
                        placeholder="At least 6 characters"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                      />
                    </div>

                    <fieldset className="space-y-2">
                      <legend className="text-xs font-bold uppercase tracking-[0.08em] text-[#a1a1aa]">
                        Access Role
                      </legend>
                      <div className="flex flex-wrap gap-4 pt-1">
                        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#fafafa]">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={newAdminRole === 'admin'}
                            onChange={() => setNewAdminRole('admin')}
                            className="h-4 w-4 accent-[#ffd400]"
                          />
                          <span>Admin (Standard)</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#fafafa]">
                          <input
                            type="radio"
                            name="role"
                            value="superadmin"
                            checked={newAdminRole === 'superadmin'}
                            onChange={() => setNewAdminRole('superadmin')}
                            className="h-4 w-4 accent-[#ffd400]"
                          />
                          <span>Superadmin (Full Access)</span>
                        </label>
                      </div>
                    </fieldset>

                    <Button type="submit" disabled={creatingAdmin}>
                      <UserPlus size={16} />{' '}
                      {creatingAdmin ? 'Creating...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-[#ffd400]">
                  <Shield size={18} />
                  <CardTitle>Update Your Profile & Password</CardTitle>
                </div>
                <CardDescription>
                  Update display name or rotate password for{' '}
                  <strong className="text-[#fafafa]">{currentAdmin.email}</strong>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleUpdateOwnProfile}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Display Name</Label>
                    <Input
                      id="profile-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-current-password">
                      Current Password
                    </Label>
                    <Input
                      id="profile-current-password"
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-new-password">New Password</Label>
                    <Input
                      id="profile-new-password"
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={updatingProfile}>
                    {updatingProfile ? 'Updating...' : 'Save Security Settings'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Administrator Directory</CardTitle>
              <CardDescription>
                Accounts stored in the Neon `admins` table.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table
                style={
                  {
                    '--label-2': '"Email"',
                    '--label-3': '"Role"',
                    '--label-4': '"Status"',
                    '--label-5': '"Actions"',
                  } as React.CSSProperties
                }
              >
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((adm) => (
                    <TableRow key={adm.id}>
                      <th className="p-4 text-left font-bold text-[#fafafa]">
                        {adm.name}
                        {adm.id === currentAdmin.id && (
                          <Badge className="ml-2 px-2 py-0.5 text-[10px]">
                            You
                          </Badge>
                        )}
                      </th>
                      <TableCell className="text-[#a1a1aa]">
                        {adm.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            adm.role === 'superadmin'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {adm.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={adm.active ? 'success' : 'secondary'}>
                          {adm.active ? 'Active' : 'Suspended'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {currentAdmin.role === 'superadmin' &&
                        adm.id !== currentAdmin.id ? (
                          <div className="inline-flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAdminRole(adm)}
                            >
                              Make{' '}
                              {adm.role === 'superadmin'
                                ? 'Admin'
                                : 'Superadmin'}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAdminStatus(adm)}
                            >
                              {adm.active ? 'Suspend' : 'Activate'}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteAdminUser(adm.id)}
                              aria-label={`Delete ${adm.email}`}
                              className="hover:text-[#ed168c]"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-[#71717a]">
                            Primary Superadmin
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
