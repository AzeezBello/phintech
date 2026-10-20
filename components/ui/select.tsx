import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        'flex h-11 w-full appearance-none rounded-xl border border-[#2a2c32] bg-[#0d0e11] pl-3.5 pr-9 text-sm font-medium text-[#fafafa] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow,background-color] duration-150 focus-visible:border-[#ffd400] focus-visible:bg-[#111216] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]/20 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      size={15}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]"
    />
  </div>
));
NativeSelect.displayName = 'NativeSelect';
