// components/ClientContacts.tsx

"use client";

import React, { useState, useEffect, act } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Trash2 } from "lucide-react";
import { Client, Contact } from "@/app/types";

interface ClientContactsProps {
  client: Client;
}

export default function ClientContacts({ client }: ClientContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (client) {
      setContacts(client.contacts || []);
    }
  }, [client]);

  const handleAddContact = async () => {
    const { data, error } = await supabase
      .from('client_contacts')
      .insert([{ ...newContact, client_id: client.id }])
      .select();

    if (error) {
      console.error("Error adding contact:", error);
    } else if (data) {
      act(() => {
        setContacts([...contacts, data[0]]);
        setNewContact({ name: "", email: "", phone: "" });
      });
    }
  };

  const removeContact = async (contactId: number) => {
    const { error } = await supabase
      .from('client_contacts')
      .delete()
      .eq('id', contactId);

    if (error) {
      console.error("Error deleting contact:", error);
    } else {
      act(() => {
        setContacts(contacts.filter((c) => c.id !== contactId));
      });
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Contacts</h2>
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center space-x-2">
            <div className="flex-grow bg-gray-100 p-2 rounded text-sm">
              <p>
                <strong>{contact.name}</strong>
              </p>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeContact(contact.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <Input
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value })
          }
        />
      </div>
      <Button onClick={handleAddContact}>Add Contact</Button>
    </div>
  );
}
