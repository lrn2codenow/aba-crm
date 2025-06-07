// components/ClientTable.tsx

"use client";

import { useClients } from "@/app/context/ClientsContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import Link from "next/link";
import { calculateTimeInPhase, getClientStatus } from "@/app/utils";
import { Button } from "@/app/components/ui/button";

export default function ClientTable() {
  const { clients, kpis } = useClients();

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
            <TableCell>{client.assignedTo}</TableCell>
            <TableCell>{calculateTimeInPhase(client.startDate)} days</TableCell>
            <TableCell>{getClientStatus(client, kpis)}</TableCell>
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
