'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password.');
        setSubmitting(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Unable to reach server. Please check your connection.');
      setSubmitting(false);
    }
  }

  return (
    <main className="container py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <Link
            href="/"
            className="action-button inline-flex items-center gap-2 text-sm font-bold text-[#a1a1aa] hover:text-[#ffd400]"
          >
            <ArrowLeft size={16} /> Back to website
          </Link>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="p-7 pb-3 sm:p-9 sm:pb-4">
            <div className="mb-4 flex items-center justify-between">
              <Badge>
                <ShieldCheck size={14} /> Superadmin Portal
              </Badge>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2e3036] bg-[#16171c] text-[#ffd400]">
                <Lock size={16} />
              </div>
            </div>
            <CardTitle className="text-3xl tracking-[-0.03em]">
              Sign in to Admin
            </CardTitle>
            <CardDescription>
              Manage enquiries, portfolio projects, services, and administrator access.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-7 pt-4 sm:p-9 sm:pt-4">
            <form
              method="POST"
              action="/api/admin/login"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="none"
                  enterKeyHint="next"
                  required
                  placeholder="demolablaze@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="current-password">Password</Label>
                  <button
                    id="toggle-password"
                    type="button"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-describedby="toggle-password-warning"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd400] transition-colors hover:underline"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff size={13} /> Hide password
                      </>
                    ) : (
                      <>
                        <Eye size={13} /> Show password
                      </>
                    )}
                  </button>
                  <span id="toggle-password-warning" className="visually-hidden">
                    Warning: this will display your password on the screen.
                  </span>
                </div>
                <Input
                  id="current-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  enterKeyHint="done"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>

              {error && (
                <Alert variant="destructive" aria-live="polite">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <AlertDescription className="font-semibold">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
