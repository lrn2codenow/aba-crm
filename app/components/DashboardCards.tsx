// components/DashboardCards.tsx

"use client";

import { useClients } from "@/app/context/ClientsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Users, Clock } from "lucide-react";

export default function DashboardCards() {
  const { clients } = useClients();

  const getStageClients = (stage: string) => {
    return clients.filter((client) => client.stage.startsWith(stage));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clients.length}</div>
        </CardContent>
      </Card>
      {["1", "2", "3"].map((stage) => (
        <Card key={stage}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {stage === "1"
                ? "Evaluation"
                : stage === "2"
                ? "Assessment"
                : "Active Services"}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getStageClients(stage).length}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
