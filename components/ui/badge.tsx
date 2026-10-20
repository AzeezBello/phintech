import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default:
    'border-[#ffd400]/35 bg-[#ffd400]/12 text-[#ffd400] shadow-[inset_0_1px_0_0_rgba(255,212,0,0.15)]',
  secondary:
    'border-[#2e3036] bg-[#18191e] text-[#d4d4d8]',
  destructive:
    'border-[#ed168c]/40 bg-[#ed168c]/15 text-[#ff7ec4]',
  outline:
    'border-[#32343a] bg-transparent text-[#a1a1aa]',
  success:
    'border-[#4ade80]/35 bg-[#4ade80]/12 text-[#4ade80]',
  warning:
    'border-[#38bdf8]/35 bg-[#38bdf8]/12 text-[#38bdf8]',
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
