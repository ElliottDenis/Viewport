// app/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <main className="py-12 flex flex-col items-center gap-8 text-center">
      <section className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-3">Welcome to Viewport</h1>
        <p className="text-gray-300 mb-6">
          Quickly share pictures, files and text with a short code. Optional PINs and account-level controls
          keep things private and secure.
        </p>
      </section>

      <section className="w-full max-w-2xl text-left mt-6">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <ol className="list-decimal list-inside text-gray-300">
          <li>Upload an image, file or text from the Send page.</li>
          <li>Get a short code (and optional 4-digit PIN) to share.</li>
          <li>Recipients paste the code on the View page to see the content.</li>
        </ol>
      </section>
    </main>
  );
}