import { Area, Incident, Maintenance, KPI, StatusType } from '@/types/status';
import { ApiKPIs, ApiComponent, ApiIncident, ApiMaintenance } from '@/hooks/useStatusData';
import { calculateStatus } from './statusCalculator';

export const mapApiKPIsToUI = (kpis: ApiKPIs): KPI[] => {
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return [
    {
      label: 'MTTR',
      value: formatMinutes(kpis.mttrMinutes),
      change: 'Tempo médio de resolução',
      trend: 'neutral' as const,
    },
    {
      label: 'MTBF',
      value: `${kpis.mtbfDays.toFixed(1)} dias`,
      change: 'Tempo entre falhas',
      trend: 'neutral' as const,
    },
    {
      label: 'SLA',
      value: `${kpis.slaPct.toFixed(2)}%`,
      change: kpis.slaPct >= 99.9 ? 'Cumprido' : 'Abaixo da meta',
      status: kpis.slaPct >= 99.9 ? 'ok' : 'warn',
    },
    {
      label: 'SLO',
      value: `${kpis.sloPct.toFixed(1)}%`,
      change: `${((100 - kpis.sloPct) * 10).toFixed(1)}% do budget consumido`,
      trend: 'neutral' as const,
    },
  ];
};

export const mapApiComponentsToAreas = (components: ApiComponent[]): Area[] => {
  const areaMap = new Map<string, Area>();

  components.forEach((component) => {
    const areaName = component.product || 'Geral';
    
    if (!areaMap.has(areaName)) {
      areaMap.set(areaName, {
        id: areaName.toLowerCase().replace(/\s+/g, '-'),
        name: areaName,
        icon: 'Box',
        status: 'ok' as StatusType,
        journeys: [],
      });
    }

    const area = areaMap.get(areaName)!;
    
    // Group components into journeys by provider
    let journey = area.journeys.find(j => j.id === component.providerId);
    if (!journey) {
      journey = {
        id: component.providerId,
        name: `Serviços ${component.providerId.slice(0, 8)}`,
        icon: 'Server',
        products: [],
      };
      area.journeys.push(journey);
    }

    const status = mapApiStateToStatusType(component.status);
    journey.products.push({
      id: component.id,
      name: component.name,
      icon: 'Activity',
      status,
      priority: status === 'error' ? 'p1' : null,
      signals: {
        latency: Math.random() * 300,
        traffic: Math.random() * 1000,
        errors: status === 'error' ? 5 : status === 'warn' ? 1 : 0.1,
        saturation: Math.random() * 100,
      },
    });
  });

  // Calculate area status based on products
  areaMap.forEach((area) => {
    const allProducts = area.journeys.flatMap(j => j.products);
    const hasError = allProducts.some(p => p.status === 'error');
    const hasWarn = allProducts.some(p => p.status === 'warn');
    area.status = hasError ? 'error' : hasWarn ? 'warn' : 'ok';
  });

  return Array.from(areaMap.values());
};

export const mapApiIncidentsToUI = (incidents: ApiIncident[]): Incident[] => {
  return incidents.map((incident) => ({
    id: incident.id,
    title: incident.title,
    severity: mapSeverityToStatusType(incident.severity),
    priority: incident.severity === 'P1' ? 'p1' : incident.severity === 'P2' ? 'p2' : null,
    area: 'Sistema',
    journey: 'Geral',
    product: incident.components[0] || 'N/A',
    startTime: new Date(incident.startedAt),
    endTime: incident.resolvedAt ? new Date(incident.resolvedAt) : undefined,
    updates: incident.updates.map((update) => ({
      time: new Date(update.at),
      message: update.text,
      status: incident.state,
    })),
  }));
};

export const mapApiMaintenancesToUI = (maintenances: ApiMaintenance[]): Maintenance[] => {
  return maintenances.map((maintenance) => ({
    id: maintenance.id,
    title: maintenance.title,
    area: 'Sistema',
    journey: 'Geral',
    product: maintenance.components[0] || 'N/A',
    scheduledStart: new Date(maintenance.windowStart),
    scheduledEnd: new Date(maintenance.windowEnd),
    impact: maintenance.expectedImpact || 'Impacto esperado não informado',
    description: maintenance.notes || '',
  }));
};

export const mapApiStateToStatusType = (state: string): StatusType => {
  switch (state) {
    case 'operational':
      return 'ok';
    case 'degraded':
      return 'warn';
    case 'incident':
      return 'error';
    case 'maintenance':
      return 'maint';
    case 'informational':
      return 'info';
    default:
      return 'ok';
  }
};

export const mapSeverityToStatusType = (severity: string): StatusType => {
  switch (severity) {
    case 'P1':
      return 'error';
    case 'P2':
      return 'warn';
    case 'P3':
    case 'P4':
      return 'info';
    default:
      return 'ok';
  }
};

export const mapUptimeDataToUI = (uptime90d: Array<{ day: string; state: string }>) => {
  return uptime90d.map((item) => ({
    date: new Date(item.day),
    status: mapApiStateToStatusType(item.state),
    uptime: item.state === 'operational' ? 0.99 + Math.random() * 0.01 : 0.85 + Math.random() * 0.14,
  }));
};
