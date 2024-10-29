// utils/index.ts

import { Client } from "@/app/types";
import { useClients } from "@/app/context/ClientsContext";

export const calculateTimeInPhase = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getClientStatus = (client: Client) => {
  const { kpis } = useClients();
  const daysInPhase = calculateTimeInPhase(client.startDate);
  const kpi = kpis[client.stage];
  if (daysInPhase > kpi * 1.5) return "high-risk";
  if (daysInPhase > kpi) return "at-risk";
  return "on-track";
};
