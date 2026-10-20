import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="studio-grid-surface flex min-h-[calc(100dvh-13rem)] items-center py-24">
      <div className="container">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 border-l-2 border-[#ed168c] pl-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#a1a1aa]">
            <span className="text-[#ed168c]">STATUS // 404</span>
            <span>ROUTE NOT INDEXED</span>
          </div>
          <h1 className="display-hero mt-6 font-bold text-[#f5f4f0]">
            That page took a{' '}
            <span className="font-editorial italic font-normal text-[#ffd400]">
              wrong turn.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#a1a1aa]">
            The link may be outdated or the specimen may have moved inside our
            studio archive.
          </p>
          <div className="pill-row-balance mt-10 gap-4">
            <Button asChild href="/" size="lg">
              <ArrowLeft size={17} /> Return to studio home
            </Button>
            <Button asChild href="/work" variant="outline" size="lg">
              Browse 74+ archive works <ArrowUpRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
