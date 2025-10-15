"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const path = usePathname();
  const active = "bg-blue-500 text-black font-semibold";
  const inactive = "bg-gray-700 text-white hover:bg-gray-600";

  return (
    <nav className="flex justify-center gap-3 my-4">
      <Link
        href="/send"
        className={`px-5 py-2 rounded ${path === "/send" ? active : inactive}`}
      >
        Send
      </Link>
      <Link
        href="/view"
        className={`px-5 py-2 rounded ${path === "/view" ? active : inactive}`}
      >
        View
      </Link>
    </nav>
  );
}