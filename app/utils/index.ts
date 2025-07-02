// utils/index.ts

import { Client } from "@/app/types";

export const calculateTimeInPhase = (startDate: string) => {
  if (!startDate) return 0;
  const start = new Date(startDate);
  if (isNaN(start.getTime())) return 0;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

import { KPI } from "@/app/types";

export const getClientStatus = (client: Client, kpis: KPI) => {
  const daysInPhase = calculateTimeInPhase(client.startDate);
  const kpi = kpis[client.stage];
  if (daysInPhase > kpi * 1.5) return "high-risk";
  if (daysInPhase > kpi) return "at-risk";
  return "on-track";
};
