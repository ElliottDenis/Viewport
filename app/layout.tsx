import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QuickView - Share files and text securely',
  description: 'Share any file or text via a short code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="row" style={{justifyContent:'space-between', marginBottom: 16}}>
            <Link href="/"><strong>🔭 QuickView</strong></Link>
            <nav className="row" style={{gap:16}}>
              <Link href="/create">Create</Link>
              {/* <a href="https://supabase.com" target="_blank" rel="noreferrer">Supabase</a> */}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
