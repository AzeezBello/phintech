import type {HTMLAttributes} from 'react';
import {cn} from '@/lib/utils';

export function Badge({className,...props}:HTMLAttributes<HTMLSpanElement>){return <span className={cn('inline-flex items-center rounded-full border border-[#5b4d00] bg-[#2a2200] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#ffd400]',className)} {...props}/>}