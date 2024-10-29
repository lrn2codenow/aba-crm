// app/clients/page.tsx

"use client";

import ClientForm from "../components/ClientForm";
import ClientTable from "../components/ClientTable";

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Client Management</h1>
      <ClientForm />
      <ClientTable />
    </div>
  );
}
