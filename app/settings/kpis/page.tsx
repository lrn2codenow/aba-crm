// app/settings/kpis/page.tsx

"use client";

import KPISettings from "@/app/components/KPISettings";

export default function KPISettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">KPI Settings</h1>
      <KPISettings />
    </div>
  );
}
