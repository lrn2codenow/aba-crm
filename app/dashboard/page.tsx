// app/dashboard/page.tsx

"use client";

import DashboardCards from "@/app/components/DashboardCards";
import PhasePerformance from "@/app/components/PhasePerformance";
import AtRiskClients from "@/app/components/AtRiskClients";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ABA Therapy CRM Dashboard</h1>
      <DashboardCards />
      <h2 className="text-xl font-semibold mt-8 mb-4">Phase Performance</h2>
      <PhasePerformance />
      <h2 className="text-xl font-semibold mt-8 mb-4">At-Risk Clients</h2>
      <AtRiskClients />
    </div>
  );
}
