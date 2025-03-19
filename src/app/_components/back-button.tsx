"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BackButton() {
  const searchParams = useSearchParams();
  const fromArchive = searchParams.get("from") === "archive";

  return (
    <div className="absolute top-4 left-4 z-20">
      <Link href={fromArchive ? "/archive" : "/"}>
        <button className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors transform hover:-rotate-1">
          ← Back to {fromArchive ? "Archive" : "Home"}
        </button>
      </Link>
    </div>
  );
}
