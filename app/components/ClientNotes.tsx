// components/ClientNotes.tsx

"use client";

import { useState } from "react";
import { Client, Note } from "@/app/types";
import { useClients } from "@/app/context/ClientsContext";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface ClientNotesProps {
  client: Client;
}

export default function ClientNotes({ client }: ClientNotesProps) {
  const { clients, setClients } = useClients();
  const [newNote, setNewNote] = useState<Note>({
    phase: "",
    date: "",
    content: "",
  });

  const addNote = () => {
    if (newNote.phase && newNote.date && newNote.content) {
      const updatedClients = clients.map((c) =>
        c.id === client.id
          ? { ...c, notes: [...c.notes, { ...newNote }] }
          : c
      );
      setClients(updatedClients);
      setNewNote({ phase: "", date: "", content: "" });
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Notes</h2>
      <div className="space-y-2">
        {client.notes.map((note, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <p className="text-sm font-medium">
              {note.phase} - {note.date}
            </p>
            <p className="text-sm">{note.content}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="note-phase">Phase</Label>
          <Select
            value={newNote.phase}
            onValueChange={(value) => setNewNote({ ...newNote, phase: value })}
          >
            <SelectTrigger id="note-phase">
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              {/* Replace with your actual phases */}
              <SelectItem value="1.1">1.1 - Waitlist</SelectItem>
              <SelectItem value="2.1">2.1 - Assessment Waitlist</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="note-date">Date</Label>
          <Input
            id="note-date"
            type="date"
            value={newNote.date}
            onChange={(e) =>
              setNewNote({ ...newNote, date: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="note-content">Content</Label>
          <Textarea
            id="note-content"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          />
        </div>
      </div>
      <Button onClick={addNote}>Add Note</Button>
    </div>
  );
}
