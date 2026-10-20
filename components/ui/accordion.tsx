'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccordionContextValue = {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

export function Accordion({
  type = 'single',
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === 'single') next.clear();
          next.add(value);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('divide-y divide-[#26272b]', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
} | null>(null);

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used within Accordion');
  const isOpen = ctx.openItems.has(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('py-2', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);
  if (!ctx || !item)
    throw new Error('AccordionTrigger must be inside AccordionItem');

  return (
    <h3 className="flex">
      <button
        type="button"
        aria-expanded={item.isOpen}
        onClick={() => ctx.toggleItem(item.value)}
        className={cn(
          'group flex flex-1 items-center justify-between gap-6 py-4 text-left text-lg font-black tracking-[-0.02em] text-[#fafafa] transition-colors duration-150 hover:text-[#ffd400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] md:text-xl',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#32343a] bg-[#141519] text-[#ffd400] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#ffd400]',
            item.isOpen && 'rotate-45 border-[#ffd400] bg-[#ffd400] text-[#09090b]'
          )}
        >
          <Plus size={16} />
        </span>
      </button>
    </h3>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const item = React.useContext(AccordionItemContext);
  if (!item) throw new Error('AccordionContent must be inside AccordionItem');

  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        item.isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            'max-w-3xl pb-5 pr-12 text-base leading-7 text-[#a1a1aa]',
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
