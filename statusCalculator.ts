import { GoldenSignals, StatusType, PriorityType } from '@/types/status';

export const calculateStatus = (signals: GoldenSignals): { status: StatusType; priority: PriorityType } => {
  // P1 - Indisponível
  if (signals.latency > 800 || signals.errors > 1 || signals.saturation > 90) {
    return { status: 'error', priority: 'p1' };
  }
  
  // P2 - Atenção
  if (signals.latency > 400 || signals.errors > 0.5 || signals.saturation > 75) {
    return { status: 'warn', priority: 'p2' };
  }
  
  // Operacional
  return { status: 'ok', priority: null };
};

export const calculateAreaStatus = (journeys: any[]): StatusType => {
  const allProducts = journeys.flatMap(j => j.products);
  
  if (allProducts.some(p => p.status === 'error')) return 'error';
  if (allProducts.some(p => p.status === 'warn')) return 'warn';
  if (allProducts.some(p => p.status === 'maint')) return 'maint';
  if (allProducts.some(p => p.status === 'info')) return 'info';
  
  return 'ok';
};
