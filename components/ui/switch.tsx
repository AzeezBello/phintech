'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      ref={ref}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080809] disabled:cursor-not-allowed disabled:opacity-50',
        checked
          ? 'border-[#ffd400] bg-[#ffd400]'
          : 'border-[#2e3036] bg-[#18191e]',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'spring-scale pointer-events-none block h-4 w-4 rounded-full shadow-sm',
          checked
            ? 'translate-x-5 bg-[#09090b]'
            : 'translate-x-0.5 bg-[#a1a1aa]'
        )}
      />
    </button>
  )
);
Switch.displayName = 'Switch';
