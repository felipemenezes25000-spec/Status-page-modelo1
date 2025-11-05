import { StatusType } from '@/types/status';
import { StatusBadge } from './StatusBadge';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface OverallStatusProps {
  status: StatusType;
  message: string;
  affectedSystems?: number;
}

export const OverallStatus = ({ status, message, affectedSystems = 0 }: OverallStatusProps) => {
  const getIcon = () => {
    switch (status) {
      case 'ok':
        return <CheckCircle2 className="h-5 w-5 text-status-ok" />;
      case 'warn':
        return <AlertTriangle className="h-5 w-5 text-status-warn" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-status-error" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-status-ok" />;
    }
  };

  const getBgColor = () => {
    switch (status) {
      case 'ok':
        return 'bg-status-ok-bg/50';
      case 'warn':
        return 'bg-status-warn-bg/50';
      case 'error':
        return 'bg-status-error-bg/50';
      default:
        return 'bg-status-ok-bg/50';
    }
  };

  return (
    <div className={`glass-card p-5 mb-6 ${getBgColor()} animate-fade-in`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h2 className="text-lg font-semibold">Status Geral dos Sistemas</h2>
            <StatusBadge status={status} label="" size="md" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">{message}</p>
          {affectedSystems > 0 && (
            <p className="text-xs font-medium text-muted-foreground">
              Sistemas afetados: <span className="text-foreground">{affectedSystems}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
