// components/ClientForm.tsx

"use client";

import React, { useState, act } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Client } from "@/app/types";
import { useClients } from "@/app/context/ClientsContext";
import { supabase } from "@/lib/supabase";

interface ClientFormProps {
  client?: Client | null;
}

export default function ClientForm({ client = null }: ClientFormProps) {
  const { fetchClients } = useClients();
  const [formData, setFormData] = useState<Partial<Client>>(
    client || {
      name: "",
      stage: "1.1",
      assigned_to: "",
      start_date: "",
    }
  );

  const handleSubmit = async () => {
    if (client) {
      // Update existing client
      const { error } = await supabase
        .from('clients')
        .update(formData)
        .eq('id', client.id);
      if (error) console.error('Error updating client:', error);
    } else {
      // Add new client
      const { error } = await supabase.from('clients').insert([formData]);
      if (error) console.error('Error adding client:', error);
      act(() => {
        setFormData({
          name: "",
          stage: "1.1",
          assignedTo: "",
          startDate: "",
        });
      });
    }
    fetchClients(); // Refresh the client list
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="stage">Stage</Label>
          <Select
            value={formData.stage}
            onValueChange={(value) => setFormData({ ...formData, stage: value })}
          >
            <SelectTrigger id="stage">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {/* Replace with your actual stages */}
              <SelectItem value="1.1">1.1 - Waitlist</SelectItem>
              <SelectItem value="1.2">1.2 - Evaluation Scheduled</SelectItem>
              <SelectItem value="1.3">1.3 - Evaluation Completed</SelectItem>
              <SelectItem value="2.1">2.1 - Assessment Waitlist</SelectItem>
              <SelectItem value="2.2">2.2 - Assessment Scheduled</SelectItem>
              <SelectItem value="2.3">2.3 - Assessment Completed</SelectItem>
              <SelectItem value="3.1">3.1 - Waitlist for Services</SelectItem>
              <SelectItem value="3.2">3.2 - On Hold</SelectItem>
              <SelectItem value="3.3">3.3 - Active Services</SelectItem>

          
              {/* Add more stages as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            value={formData.assigned_to || ''}
            onChange={(e) =>
              setFormData({ ...formData, assigned_to: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.start_date || ''}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleSubmit}>
            {client ? "Save Changes" : "Add Client"}
          </Button>
        </div>
      </div>
    </div>
  );
}
