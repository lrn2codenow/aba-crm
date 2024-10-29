// components/PhasePerformance.tsx

"use client";

import { useClients } from "@/app/context/ClientsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { calculateTimeInPhase } from "@/app/utils";

export default function PhasePerformance() {
  const { clients, kpis } = useClients();

  const getPhasePerformance = (phase: string) => {
    const phaseClients = clients.filter((client) => client.stage === phase);
    const onTrack = phaseClients.filter(
      (client) =>
        calculateTimeInPhase(client.startDate) <= (kpis[phase] || 0)
    ).length;
    return phaseClients.length > 0
      ? (onTrack / phaseClients.length) * 100
      : 100;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.keys(kpis).map((phase) => (
        <Card key={phase}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Phase {phase}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Progress
                value={getPhasePerformance(phase)}
                className="w-2/3"
              />
              <span className="text-sm font-medium">
                {Math.round(getPhasePerformance(phase))}% on track
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
