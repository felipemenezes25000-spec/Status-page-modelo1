import { Area } from '@/types/status';
import { AlertTriangle } from 'lucide-react';

interface AffectedProductsTickerProps {
  areas: Area[];
}

export const AffectedProductsTicker = ({ areas }: AffectedProductsTickerProps) => {
  const affectedProducts = areas.flatMap(area =>
    area.journeys.flatMap(journey =>
      journey.products
        .filter(p => p.status !== 'ok')
        .map(product => ({
          name: product.name,
          status: product.status,
          priority: product.priority,
          area: area.name,
        }))
    )
  );

  // Ordenar por prioridade: P1 > P2 > maint > info
  affectedProducts.sort((a, b) => {
    const priorityOrder = { p1: 0, p2: 1, null: 2 };
    const statusOrder = { error: 0, warn: 1, maint: 2, info: 3, ok: 4 };
    
    const aPriority = priorityOrder[a.priority || 'null'];
    const bPriority = priorityOrder[b.priority || 'null'];
    
    if (aPriority !== bPriority) return aPriority - bPriority;
    return statusOrder[a.status] - statusOrder[b.status];
  });

  if (affectedProducts.length === 0) {
    return (
      <div className="glass-card-lg mb-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-status-ok" />
          <h3 className="text-sm font-semibold">Status dos Produtos</h3>
        </div>
        <div className="flex items-center gap-2 text-status-ok">
          <div className="status-dot-ok"></div>
          <span className="font-medium">Todos os produtos estão operacionais</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string, priority: string | null) => {
    if (priority === 'p1') return 'text-status-error';
    if (priority === 'p2') return 'text-status-warn';
    if (status === 'maint') return 'text-status-info';
    return 'text-status-ok';
  };

  const getStatusDot = (status: string, priority: string | null) => {
    if (priority === 'p1') return 'status-dot-error';
    if (priority === 'p2') return 'status-dot-warn';
    if (status === 'maint') return 'status-dot-info';
    return 'status-dot-ok';
  };

  const getStatusText = (status: string, priority: string | null) => {
    if (priority === 'p1') return 'Indisponível (P1)';
    if (priority === 'p2') return 'Atenção (P2)';
    if (status === 'maint') return 'Em Manutenção';
    return 'Operacional';
  };

  return (
    <div className="glass-card-lg overflow-hidden mb-8">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-5 w-5 text-status-warn" />
        <h3 className="text-sm font-semibold">Produtos Afetados</h3>
      </div>
      <div className="relative overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {affectedProducts.concat(affectedProducts).map((item, idx) => (
              <div key={idx} className="ticker-item">
                <div className={getStatusDot(item.status, item.priority)}></div>
                <span className="font-medium">{item.name}</span>
                <span className={`text-sm ${getStatusColor(item.status, item.priority)}`}>
                  {getStatusText(item.status, item.priority)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
