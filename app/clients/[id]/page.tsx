// app/clients/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { Client } from "@/app/types"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import ClientForm from "@/app/components/ClientForm";
import ClientNotes from "@/app/components/ClientNotes";
import ClientContacts from "@/app/components/ClientContacts";
import { useClients } from "@/app/context/ClientsContext";

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
  const { clients } = useClients();
  const [client, setClient] = useState<Client | null>(null);
  const router = useRouter();

  useEffect(() => {
    const foundClient = clients.find((c) => c.id === parseInt(params.id));
    if (foundClient) {
      setClient(foundClient);
    } else {
      router.push("/clients");
    }
  }, [params.id, clients]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Client Details</h1>
      <ClientForm client={client} />
      <ClientContacts client={client} />
      <ClientNotes client={client} />
    </div>
  );
}
