export type StatusType = 'ok' | 'warn' | 'error' | 'info' | 'maint';
export type PriorityType = 'p1' | 'p2' | null;

export interface GoldenSignals {
  latency: number; // em ms
  traffic: number; // req/s
  errors: number; // porcentagem
  saturation: number; // porcentagem
}

export interface Product {
  id: string;
  name: string;
  icon: string;
  status: StatusType;
  priority: PriorityType;
  signals: GoldenSignals;
}

export interface Journey {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

export interface Area {
  id: string;
  name: string;
  icon: string;
  status: StatusType;
  journeys: Journey[];
}

export interface Office {
  city: string;
  timezone: string;
  offset: number; // offset em relação a Brasília
}

export interface Incident {
  id: string;
  title: string;
  severity: StatusType;
  priority: PriorityType;
  area: string;
  journey: string;
  product: string;
  startTime: Date;
  endTime?: Date;
  updates: IncidentUpdate[];
}

export interface IncidentUpdate {
  time: Date;
  message: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
}

export interface Maintenance {
  id: string;
  title: string;
  area: string;
  journey: string;
  product: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  impact: string;
  description: string;
}

export interface KPI {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: StatusType;
}
