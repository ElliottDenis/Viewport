// app/layout.tsx
import "./../styles/globals.css";
import type { Metadata } from "next";
import Tabs from "../components/Tabs";
import AccountStatus from "../components/AccountStatus"; // adjust path if different
import Link from "next/link";

export const metadata: Metadata = {
  title: "Viewport",
  description: "Private perspectives, shared safely.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-start p-6">
        <header className="w-full max-w-3xl flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-4">
            <img src="/logo.png" alt="Viewport logo" className="w-16 h-16" />
            <div>
              <h1 className="text-lg font-bold">Viewport</h1>
              <p className="text-xs text-gray-400">Private perspectives, shared safely.</p>
            </div>
          </Link>

          {/* Account status shows sign-in or signed-in display + signout */}
          <div>
            <AccountStatus />
          </div>
        </header>
        <Tabs />
        <main className="w-full max-w-3xl">{children}</main>
      </body>
    </html>
  );
}
