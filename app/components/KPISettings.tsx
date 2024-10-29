// components/KPISettings.tsx

"use client";

import { useClients } from "@/app/context/ClientsContext";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function KPISettings() {
  const { kpis, setKPIs } = useClients();

  return (
    <Card>
      <CardHeader>
        <CardTitle>KPI Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(kpis).map(([phase, days]) => (
            <div key={phase} className="flex items-center space-x-2">
              <Label htmlFor={`kpi-${phase}`} className="w-20">
                Phase {phase}
              </Label>
              <Input
                id={`kpi-${phase}`}
                type="number"
                value={days}
                onChange={(e) =>
                  setKPIs({ ...kpis, [phase]: parseInt(e.target.value) })
                }
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
