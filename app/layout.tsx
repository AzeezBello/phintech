import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, WhatsAppWidget } from '@/components/Site';

export const metadata: Metadata = {
  metadataBase: new URL('https://phintechcreatives.com'),
  title: {
    default: 'Phintech Creatives | Print Atelier, Registrations & Brand Studio',
    template: '%s | Phintech Creatives',
  },
  description:
    'Books and stationery, printing, photocopying, laminating, binding, passport photos, online registration, branding and web design in Surulere, Lagos.',
  openGraph: {
    title: 'Phintech Creatives',
    description: 'Printing, online services and creative technology in Lagos.',
    url: 'https://phintechcreatives.com',
    siteName: 'Phintech Creatives',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
      </head>
      <body className="min-h-[100dvh] flex flex-col selection:bg-[#ffd400] selection:text-[#09090b]">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
