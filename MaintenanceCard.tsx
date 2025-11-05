import { Maintenance } from '@/types/status';
import { Wrench, Clock, AlertCircle, ChevronRight, Calendar, PlayCircle, StopCircle, Timer } from 'lucide-react';
import { format, differenceInMinutes, differenceInHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MaintenanceCardProps {
  maintenance: Maintenance;
}

export const MaintenanceCard = ({ maintenance }: MaintenanceCardProps) => {
  const getDuration = () => {
    const minutes = differenceInMinutes(maintenance.scheduledEnd, maintenance.scheduledStart);
    const hours = differenceInHours(maintenance.scheduledEnd, maintenance.scheduledStart);
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
    } else if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="glass-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Wrench className="h-5 w-5 text-status-info mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-2">{maintenance.title}</h3>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <span>{maintenance.area}</span>
            <ChevronRight className="h-3 w-3" />
            <span>{maintenance.journey}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium">{maintenance.product}</span>
          </div>
          
          {/* Maintenance Timeline */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-xs">
              <PlayCircle className="h-3.5 w-3.5 text-status-info" />
              <span className="text-muted-foreground">Início:</span>
              <span className="font-medium">{format(maintenance.scheduledStart, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <StopCircle className="h-3.5 w-3.5 text-status-info" />
              <span className="text-muted-foreground">Fim:</span>
              <span className="font-medium">{format(maintenance.scheduledEnd, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <Timer className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Duração:</span>
              <span className="font-medium">{getDuration()}</span>
            </div>
          </div>

          {/* Impact Information */}
          <div className="mt-3 p-3 rounded-lg bg-card/40 border border-status-warn/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-status-warn mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-status-warn mb-1">⚠️ Impacto Previsto</p>
                <p className="text-sm font-medium">{maintenance.impact}</p>
                {maintenance.description && (
                  <>
                    <p className="text-xs font-semibold text-muted-foreground mt-2 mb-1">Descrição</p>
                    <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
