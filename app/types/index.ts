// types/index.ts

export interface Client {
  id: string;
  name: string;
  stage: string;
  assigned_to: string;
  start_date: string;
  notes: Note[];
  contacts: Contact[];
}

export interface Note {
  id: number;
  client_id: string;
  note: string;
  created_at: string;
}

export interface Contact {
  id: number;
  client_id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface KPI {
  [key: string]: number;
}
  