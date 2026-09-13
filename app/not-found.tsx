import Link from 'next/link';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';

export default function NotFound(){return <main className="container flex min-h-[calc(100vh-13rem)] items-center py-24"><div className="max-w-3xl"><Badge>404 - Page not found</Badge><h1 className="mt-6 text-6xl font-black tracking-[-.07em] md:text-9xl">That page took a wrong turn.</h1><p className="mt-8 max-w-xl text-xl leading-8 text-[#b8b8be]">The link may be outdated or the page may have moved. There is still plenty worth exploring.</p><div className="mt-10 flex flex-wrap gap-4"><Button asChild href="/"><ArrowLeft size={17}/> Back home</Button><Button asChild href="/work" variant="outline">View our work <ArrowUpRight size={17}/></Button></div></div></main>}
