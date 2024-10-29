// components/ClientContacts.tsx

"use client";

import { useState } from "react";
import { Client, Contact } from "@/app/types";
import { useClients } from "@/app/context/ClientsContext";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Trash2 } from "lucide-react";

interface ClientContactsProps {
  client: Client;
}

export default function ClientContacts({ client }: ClientContactsProps) {
  const { clients, setClients } = useClients();
  const [newContact, setNewContact] = useState<Contact>({
    name: "",
    relation: "",
    phone: "",
    email: "",
  });

  const addContact = () => {
    if (newContact.name && newContact.relation) {
      const updatedClients = clients.map((c) =>
        c.id === client.id
          ? { ...c, contacts: [...c.contacts, { ...newContact }] }
          : c
      );
      setClients(updatedClients);
      setNewContact({ name: "", relation: "", phone: "", email: "" });
    }
  };

  const removeContact = (index: number) => {
    const updatedClients = clients.map((c) =>
      c.id === client.id
        ? {
            ...c,
            contacts: c.contacts.filter((_, i) => i !== index),
          }
        : c
    );
    setClients(updatedClients);
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Contacts</h2>
      <div className="space-y-2">
        {client.contacts.map((contact, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-grow bg-gray-100 p-2 rounded text-sm">
              <p>
                <strong>{contact.name}</strong> ({contact.relation})
              </p>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeContact(index)}
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
          placeholder="Relation"
          value={newContact.relation}
          onChange={(e) =>
            setNewContact({ ...newContact, relation: e.target.value })
          }
        />
        <Input
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
      </div>
      <Button onClick={addContact}>Add Contact</Button>
    </div>
  );
}
