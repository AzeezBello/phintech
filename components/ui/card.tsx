import type {HTMLAttributes} from 'react';
import {cn} from '@/lib/utils';

export function Card({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn('rounded-2xl border border-[#2c2f31] bg-[#111314]',className)} {...props}/>}
export function CardContent({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn('p-6',className)} {...props}/>}