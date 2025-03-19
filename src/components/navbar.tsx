"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      <ThemeToggle />
    </div>
  );
}
