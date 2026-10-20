'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Expand, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type WorkItem = {
  id: string;
  title: string;
  category: 'branding' | 'flyers' | 'letter-head' | 'logos';
  categoryLabel: string;
  imageUrl: string;
  featured?: boolean;
};

const CATEGORIES = [
  { value: 'all', label: 'All Specimens' },
  { value: 'branding', label: 'Branding' },
  { value: 'flyers', label: 'Flyers' },
  { value: 'letter-head', label: 'Letterheads' },
  { value: 'logos', label: 'Logos' },
] as const;

export function WorkGallery({ items: initialItems }: { items: WorkItem[] }) {
  const [items, setItems] = useState<WorkItem[]>(initialItems);
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<{ item: WorkItem; index: number } | null>(
    null
  );

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => null);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [items, category, query]);

  const isEditorialRhythm = category === 'all' && !query.trim();

  return (
    <div className="space-y-10">
      {/* STUDIO FILTER CONTROL BAR */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#232429] pb-6 lg:flex-row lg:items-center">
        <Tabs value={category} onValueChange={setCategory} className="w-auto">
          <TabsList>
            {CATEGORIES.map((c) => {
              const count =
                c.value === 'all'
                  ? items.length
                  : items.filter((i) => i.category === c.value).length;
              return (
                <TabsTrigger key={c.value} value={c.value}>
                  <span>{c.label}</span>
                  <span className="font-mono tabular-nums opacity-70">
                    [{count}]
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs uppercase tracking-wider text-[#a1a1aa] sm:inline">
            Showing {filtered.length} of {items.length}
          </span>
          <div className="relative w-full lg:w-72">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]"
            />
            <Input
              type="search"
              aria-label="Filter projects by name"
              placeholder="Search archive index..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
              className="pl-9 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[#ffd400]">
            0 MATCHES IN ARCHIVE
          </p>
          <p className="mx-auto mt-2 text-sm text-[#a1a1aa]">
            No studio specimens found matching &ldquo;{query}&rdquo;.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="mt-5"
          >
            Reset archive filters
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => {
            const isWidePlate = isEditorialRhythm && idx % 7 === 0;
            const plateCode = String(idx + 1).padStart(3, '0');
            return (
              <Card
                key={item.id}
                interactive
                className={cn(
                  'group flex cursor-pointer flex-col justify-between overflow-clip p-3.5',
                  isWidePlate && 'sm:col-span-2'
                )}
                onClick={() => setSelected({ item, index: idx + 1 })}
              >
                <div>
                  <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] text-[#a1a1aa]">
                    <span>
                      SPECIMEN // #{plateCode}
                      {item.featured ? ' • FEATURED' : ''}
                    </span>
                    <span className="uppercase text-[#ffd400]">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'relative overflow-clip rounded-xl border border-white/10 bg-[#0b0c0f]',
                      isWidePlate ? 'aspect-[16/10]' : 'aspect-[4/3]'
                    )}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`${item.categoryLabel} project: ${item.title}`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                      loading="lazy"
                    />
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
                      <Expand size={14} />
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-3 px-1 pt-1">
                  <h3 className="font-display text-base font-bold tracking-tight text-[#f5f4f0]">
                    {item.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[11px] text-[#a1a1aa] transition-colors group-hover:text-[#ffd400]">
                    Inspect →
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        {selected && (
          <div className="space-y-5">
            <DialogHeader>
              <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                <Badge variant="default">{selected.item.categoryLabel}</Badge>
                <span className="text-[#a1a1aa]">
                  ARCHIVE PLATE #{String(selected.index).padStart(3, '0')}
                </span>
              </div>
              <DialogTitle className="font-display text-2xl">
                {selected.item.title}
              </DialogTitle>
              <DialogDescription className="font-mono text-xs uppercase tracking-wider">
                Phintech Creatives Studio Archive • Surulere, Lagos
              </DialogDescription>
            </DialogHeader>

            <div className="overflow-clip rounded-xl border border-[#232429] bg-[#09090b] p-2">
              <img
                src={selected.item.imageUrl}
                alt={selected.item.title}
                className="max-h-[62dvh] w-full rounded-lg object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#232429] pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelected(null)}
              >
                Close proof sheet
              </Button>
              <Button
                asChild
                href={`/contact?service=${encodeURIComponent(selected.item.categoryLabel)}`}
                size="sm"
              >
                Commission similar work <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
