// context/ClientsContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, act } from "react";
import { Client, KPI } from "@/app/types";
import { supabase } from "@/lib/supabase";

const initialKPIs: KPI = {
  '1.1': 14, // 14 days for Waitlist
  '1.2': 7,  // 7 days for Scheduled Evaluation
  '1.3': 10, // 10 days for Evaluation Report
  '2.1': 21, // 21 days for Assessment Waitlist
  '2.2': 14, // 14 days for BCBA Assessment
  '2.3': 10, // 10 days for Assessment Report
  '3.1': 30, // 30 days for Service Waitlist
  '3.2': 14, // 14 days for On Hold
  '3.3': 180 // 180 days (6 months) for Active Services before review
};

interface ClientsContextProps {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  kpis: KPI;
  setKPIs: (kpis: KPI) => void;
  fetchClients: () => void;
}

const ClientsContext = createContext<ClientsContextProps | null>(null);

export function ClientsProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [kpis, setKPIs] = useState<KPI>(initialKPIs);

  const fetchClients = async () => {
    const { data, error } = await supabase.from('clients').select('*');
    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      act(() => {
        setClients(data || []);
      });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, setClients, kpis, setKPIs, fetchClients }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
}

