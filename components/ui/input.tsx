import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-xl border border-[#2a2c32] bg-[#0d0e11] px-3.5 py-2 text-sm text-[#fafafa] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-[#71717a] focus-visible:border-[#ffd400] focus-visible:bg-[#111216] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]/20 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';
