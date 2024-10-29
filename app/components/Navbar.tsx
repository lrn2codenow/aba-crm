// components/Navbar.tsx

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Link href="/dashboard" className="mr-4">
        Dashboard
      </Link>
      <Link href="/clients" className="mr-4">
        Clients
      </Link>
      <Link href="/settings/kpis">KPI Settings</Link>
    </nav>
  );
}
