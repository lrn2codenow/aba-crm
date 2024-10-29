// types/index.ts

export interface Note {
    phase: string;
    date: string;
    content: string;
  }
  
  export interface Contact {
    name: string;
    relation: string;
    phone: string;
    email: string;
  }
  
  export interface Client {
    id: number;
    name: string;
    stage: string;
    assignedTo: string;
    startDate: string;
    notes: Note[];
    contacts: Contact[];
  }
  
  export interface KPI {
    [key: string]: number;
  }
  