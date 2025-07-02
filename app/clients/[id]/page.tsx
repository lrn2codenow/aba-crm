// app/clients/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ClientForm from "@/app/components/ClientForm";
import ClientNotes from "@/app/components/ClientNotes";
import ClientContacts from "@/app/components/ClientContacts";
import { Client } from "@/app/types";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*, client_notes(*), client_contacts(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching client:', error);
      } else {
        setClient(data);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

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
