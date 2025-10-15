// app/send/page.tsx
"use client";
import UploadForm from "../../components/UploadForm";

export default function SendPage() {
  return (
    <main className="flex flex-col items-center text-center min-h-screen py-12">
      <h1 className="text-2xl font-semibold mb-4">Send / Upload</h1>
      <p className="text-gray-400 mb-6">
        Upload a file, image or text and share it securely.
      </p>

      {/* your existing upload form component */}
      <UploadForm />
    </main>
  );
}