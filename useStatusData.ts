import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ApiKPIs {
  mttrMinutes: number;
  mtbfDays: number;
  slaPct: number;
  sloPct: number;
  uptime90dPct: number;
}

export interface ApiProvider {
  id: string;
  name: string;
  baseUrl: string;
}

export interface ApiComponent {
  id: string;
  providerId: string;
  name: string;
  product: string;
  status: 'operational' | 'degraded' | 'incident' | 'maintenance' | 'informational';
}

export interface ApiIncident {
  id: string;
  providerId: string;
  title: string;
  severity: 'P1' | 'P2' | 'P3' | 'P4';
  state: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  components: string[];
  startedAt: string;
  updatedAt: string;
  resolvedAt?: string;
  updates: Array<{
    at: string;
    text: string;
    state: string;
  }>;
}

export interface ApiMaintenance {
  id: string;
  providerId: string;
  title: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
  windowStart: string;
  windowEnd: string;
  expectedImpact?: string;
  components: string[];
  notes?: string;
}

export interface StatusOverview {
  providers: ApiProvider[];
  kpis: ApiKPIs;
  uptime90d: Array<{ day: string; state: string }>;
  now: string;
}

export const useStatusData = () => {
  return useQuery({
    queryKey: ['status-overview'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('status-overview', {
        method: 'GET',
      });

      if (error) throw error;
      return data as StatusOverview;
    },
    refetchInterval: 60000, // Refresh every 60 seconds
    retry: 3,
  });
};

export const useIncidents = () => {
  return useQuery({
    queryKey: ['status-incidents'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('status-aggregator', {
        method: 'GET',
        body: { action: 'incidents', status: 'active' },
      });

      if (error) throw error;
      return data as ApiIncident[];
    },
    refetchInterval: 60000,
    retry: 3,
  });
};

export const useMaintenances = () => {
  return useQuery({
    queryKey: ['status-maintenances'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('status-aggregator', {
        method: 'GET',
        body: { action: 'maintenances', status: 'scheduled' },
      });

      if (error) throw error;
      return data as ApiMaintenance[];
    },
    refetchInterval: 60000,
    retry: 3,
  });
};

export const useComponents = () => {
  return useQuery({
    queryKey: ['status-components'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('status-aggregator', {
        method: 'GET',
        body: { action: 'components' },
      });

      if (error) throw error;
      return data as ApiComponent[];
    },
    refetchInterval: 60000,
    retry: 3,
  });
};
