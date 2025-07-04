// components/ClientTable.tsx

"use client";

import React from 'react';
import { useClients } from "@/app/context/ClientsContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import Link from "next/link";
import { calculateTimeInPhase, getClientStatus } from "@/app/utils";
import { Button } from "@/app/components/ui/button";

export default function ClientTable() {
  const { clients } = useClients();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Time in Phase</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.stage}</TableCell>
            <TableCell>{client.assigned_to}</TableCell>
            <TableCell>{calculateTimeInPhase(client.start_date)} days</TableCell>
            <TableCell>{getClientStatus(client)}</TableCell>
            <TableCell>
              <Link href={`/clients/${client.id}`}>
                <Button variant="outline" size="sm">
                  View/Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
