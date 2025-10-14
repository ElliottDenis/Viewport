import "./../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viewport",
  description: "Share perspectives, quickly and securely.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-start p-6">
        <header className="w-full max-w-3xl flex flex-col items-center py-6">
            <img
              src="/logo.png"
              alt="Viewport logo"
              className="w-64 h-64 mb-3"
            />
            {/* <h1 className="text-3xl font-bold">Viewport</h1> */}
            <p className="text-sm text-gray-400">
              Quickly share a view — files, images, text.
            </p>
          </header>
        <main className="w-full max-w-3xl">{children}</main>
      </body>
    </html>
  );
}
