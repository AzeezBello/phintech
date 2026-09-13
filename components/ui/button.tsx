import Link from 'next/link';
import type {ButtonHTMLAttributes,ReactNode} from 'react';
import {cn} from '@/lib/utils';

type ButtonProps=ButtonHTMLAttributes<HTMLButtonElement>&{children:ReactNode;asChild?:boolean;href?:string;variant?:'default'|'outline'|'ghost'};

const styles={default:'bg-[#ffd400] text-[#080808] hover:bg-[#ffe45c]',outline:'border border-[#45484b] bg-transparent text-[#ffffff] hover:border-[#ffd400] hover:text-[#ffd400]',ghost:'text-[#b8b8be] hover:text-[#ffffff]'};

export function Button({children,className,variant='default',href,asChild,...props}:ButtonProps){const classes=cn('inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] disabled:pointer-events-none disabled:opacity-50',styles[variant],className);if(asChild&&href)return <Link href={href} className={classes}>{children}</Link>;return <button className={classes} {...props}>{children}</button>}