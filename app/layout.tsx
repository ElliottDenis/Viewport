// app/layout.tsx
import "./../styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Tabs from "../components/Tabs";

export const metadata: Metadata = {
  title: "Viewport",
  description: "Private perspectives, shared safely.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-start p-6">
        <header className="w-full max-w-3xl flex flex-col items-center py-6">
          {/* ✅ Clickable logo → navigates home */}
          <Link href="/" className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Viewport logo"
              className="w-40 h-40 mb-3 object-contain cursor-pointer hover:opacity-90 transition"
            />
          </Link>

          <p className="text-sm text-gray-400 mb-2">
            Private perspectives, shared safely.
          </p>

          {/* ✅ Only Send & View buttons here */}
          <Tabs />
        </header>

        <main className="w-full max-w-3xl mt-6">{children}</main>
      </body>
    </html>
  );
}
