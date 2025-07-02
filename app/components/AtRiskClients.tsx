// components/AtRiskClients.tsx

"use client";

import React from 'react';

import { useClients } from "@/app/context/ClientsContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { calculateTimeInPhase, getClientStatus } from "@/app/utils";
import { AlertCircle, Clock } from "lucide-react";

export default function AtRiskClients() {
  const { clients } = useClients();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Days in Phase</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients
          .filter((client) => getClientStatus(client) !== "on-track")
          .map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.stage}</TableCell>
              <TableCell>{calculateTimeInPhase(client.start_date)}</TableCell>
              <TableCell>
                {getClientStatus(client) === "high-risk" ? (
                  <span className="flex items-center text-red-500">
                    <AlertCircle className="mr-1 h-4 w-4" /> High Risk
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-500">
                    <Clock className="mr-1 h-4 w-4" /> At Risk
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
