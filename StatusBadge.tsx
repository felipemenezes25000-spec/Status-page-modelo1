import { StatusType } from '@/types/status';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge = ({ status, label, size = 'md' }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'ok':
        return { defaultLabel: 'Operacional', className: 'status-pill status-pill-ok' };
      case 'warn':
        return { defaultLabel: 'Intermitência', className: 'status-pill status-pill-warn' };
      case 'error':
        return { defaultLabel: 'Indisponível', className: 'status-pill status-pill-error' };
      case 'info':
        return { defaultLabel: 'Informativo', className: 'status-pill status-pill-info' };
      case 'maint':
        return { defaultLabel: 'Manutenção', className: 'status-pill status-pill-maint' };
      default:
        return { defaultLabel: 'Desconhecido', className: 'status-pill bg-muted text-muted-foreground' };
    }
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-3.5 py-1.5',
  };

  const { defaultLabel, className } = getStatusConfig();
  const displayLabel = label !== undefined ? label : defaultLabel;

  return (
    <span className={cn(className, sizeClasses[size])}>
      {displayLabel}
    </span>
  );
};
