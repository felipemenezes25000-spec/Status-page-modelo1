import { Incident } from '@/types/status';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { Clock, AlertCircle, ChevronRight, PlayCircle, StopCircle, Timer } from 'lucide-react';
import { format, formatDistanceToNow, differenceInMinutes, differenceInHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface IncidentCardProps {
  incident: Incident;
}

export const IncidentCard = ({ incident }: IncidentCardProps) => {
  const isResolved = !!incident.endTime;
  
  // Calculate duration
  const getDuration = () => {
    const endTime = incident.endTime || new Date();
    const minutes = differenceInMinutes(endTime, incident.startTime);
    const hours = differenceInHours(endTime, incident.startTime);
    
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
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="h-5 w-5 text-status-error mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-base mb-1">{incident.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <span>{incident.area}</span>
              <ChevronRight className="h-3 w-3" />
              <span>{incident.journey}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium">{incident.product}</span>
            </div>
            
            {/* Impact Timeline */}
            <div className="space-y-1.5 mt-2">
              <div className="flex items-center gap-2 text-xs">
                <PlayCircle className="h-3.5 w-3.5 text-status-error" />
                <span className="text-muted-foreground">Início:</span>
                <span className="font-medium">{format(incident.startTime, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
              </div>
              
              {isResolved && incident.endTime && (
                <div className="flex items-center gap-2 text-xs">
                  <StopCircle className="h-3.5 w-3.5 text-status-ok" />
                  <span className="text-muted-foreground">Fim:</span>
                  <span className="font-medium">{format(incident.endTime, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs">
                <Timer className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Duração:</span>
                <span className="font-medium">{getDuration()}</span>
                {!isResolved && <span className="text-status-warn">(em andamento)</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={incident.priority} />
          <StatusBadge status={incident.severity} label="" />
        </div>
      </div>

      {incident.updates.length > 0 && (
        <div className="mt-3 pt-3 border-t border-glass-border space-y-2">
          {incident.updates.map((update, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary capitalize">
                    {update.status === 'investigating' && '🔍 Investigando'}
                    {update.status === 'identified' && '✓ Identificado'}
                    {update.status === 'monitoring' && '👁 Monitorando'}
                    {update.status === 'resolved' && '✅ Resolvido'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(update.time, 'HH:mm', { locale: ptBR })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{update.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
