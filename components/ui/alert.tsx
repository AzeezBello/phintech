import * as React from 'react';
import { cn } from '@/lib/utils';

export type AlertVariant = 'default' | 'destructive' | 'success';

const alertVariants: Record<AlertVariant, string> = {
  default: 'border-[#2e3036] bg-[#141519] text-[#fafafa]',
  destructive:
    'border-[#ed168c]/45 bg-[#ed168c]/10 text-[#ff7ec4] [&>svg]:text-[#ed168c]',
  success:
    'border-[#4ade80]/40 bg-[#4ade80]/10 text-[#4ade80] [&>svg]:text-[#4ade80]',
};

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      'relative flex w-full items-start gap-3 rounded-xl border p-4 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]',
      alertVariants[variant],
      className
    )}
    {...props}
  />
));
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm leading-relaxed opacity-90', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
