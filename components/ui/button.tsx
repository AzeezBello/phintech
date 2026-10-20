import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-[#ffd400] text-[#09090b] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.4)] hover:bg-[#ffe144]',
  destructive:
    'bg-[#ed168c]/15 text-[#ff7ec4] border border-[#ed168c]/40 hover:bg-[#ed168c] hover:text-white',
  outline:
    'border border-[#2e3036] bg-[#121317]/80 text-[#fafafa] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-[#ffd400]/70 hover:bg-[#181920] hover:text-[#ffd400]',
  secondary:
    'bg-[#1c1d22] text-[#fafafa] border border-[#2e3036] hover:bg-[#25272e]',
  ghost:
    'bg-transparent text-[#a1a1aa] hover:bg-white/[0.06] hover:text-[#fafafa]',
  link: 'text-[#ffd400] underline-offset-4 hover:underline px-0 h-auto',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-11 px-5 py-2.5 text-sm',
  sm: 'h-9 px-3.5 text-xs',
  lg: 'h-12 px-7 text-base',
  icon: 'h-9 w-9 p-0',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'action-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold tracking-[-0.01em] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080809] disabled:pointer-events-none disabled:opacity-50',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (asChild && href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
