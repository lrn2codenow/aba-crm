// components/ClientNotes.tsx

"use client";

import React, { useState, useEffect, act } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Client, Note } from "@/app/types";

interface ClientNotesProps {
  client: Client;
}

export default function ClientNotes({ client }: ClientNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (client) {
      setNotes(client.notes || []);
    }
  }, [client]);

  const handleAddNote = async () => {
    const { data, error } = await supabase
      .from('client_notes')
      .insert([{ note: newNote, client_id: client.id }])
      .select();

    if (error) {
      console.error("Error adding note:", error);
    } else if (data) {
      act(() => {
        setNotes([...notes, data[0]]);
        setNewNote("");
      });
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-2 border rounded-md">
            <p>{note.note}</p>
            <p className="text-xs text-gray-500">{new Date(note.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Textarea
          placeholder="Add a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button onClick={handleAddNote} className="mt-2">Add Note</Button>
      </div>
    </div>
  );
}
