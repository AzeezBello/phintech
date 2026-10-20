'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Expand, Search, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type WorkItem = {
  id: string;
  title: string;
  category: 'branding' | 'flyers' | 'letter-head' | 'logos';
  categoryLabel: string;
  imageUrl: string;
  featured?: boolean;
};

const CATEGORIES = [
  { value: 'all', label: 'All Work' },
  { value: 'branding', label: 'Branding' },
  { value: 'flyers', label: 'Flyers' },
  { value: 'letter-head', label: 'Letter Heads' },
  { value: 'logos', label: 'Logos' },
] as const;

export function WorkGallery({ items: initialItems }: { items: WorkItem[] }) {
  const [items, setItems] = useState<WorkItem[]>(initialItems);
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<WorkItem | null>(null);

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

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-4 border-b border-[#26272b] pb-6 lg:flex-row lg:items-center">
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
                  <span className="tabular-nums opacity-70">({count})</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="relative w-full lg:w-72">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]"
          />
          <Input
            type="search"
            aria-label="Filter projects by name"
            placeholder="Filter archive..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="none"
            className="pl-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-sm text-[#a1a1aa]">
            No projects found matching &ldquo;{query}&rdquo;.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="mt-4"
          >
            Reset filters
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card
              key={item.id}
              interactive
              className="group cursor-pointer overflow-hidden"
              onClick={() => setSelected(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#141519]">
                <img
                  src={item.imageUrl}
                  alt={`${item.categoryLabel} project: ${item.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
                  <Expand size={14} />
                </div>
                {item.featured && (
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-black/75 backdrop-blur-md">
                      <Sparkles size={11} /> Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div>
                  <h3 className="font-bold tracking-tight text-[#fafafa]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#a1a1aa]">
                    {item.categoryLabel}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  {item.categoryLabel}
                </Badge>
              </CardContent>
            </Card>
          ))}
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
              <div className="mb-1">
                <Badge variant="default">{selected.categoryLabel}</Badge>
              </div>
              <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
              <DialogDescription>
                Phintech Creatives Studio Archive • Lagos, Nigeria
              </DialogDescription>
            </DialogHeader>

            <div className="overflow-hidden rounded-xl border border-[#26272b] bg-[#0a0b0e]">
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelected(null)}
              >
                Close preview
              </Button>
              <Button
                asChild
                href={`/contact?service=${encodeURIComponent(selected.categoryLabel)}`}
                size="sm"
              >
                Request similar work <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
