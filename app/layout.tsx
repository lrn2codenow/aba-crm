// app/layout.tsx

'use client';

import React from 'react';
import "./globals.css";
import { ClientsProvider } from "@/app/context/ClientsContext";
import Navbar from "@/app/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientsProvider>
          <Navbar />
          {children}
        </ClientsProvider>
      </body>
    </html>
  );
}