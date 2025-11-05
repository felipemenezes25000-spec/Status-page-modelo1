import { StatusType } from '@/types/status';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface UptimeDay {
  date: Date;
  status: StatusType;
  uptime: number;
}
interface UptimeBarProps {
  days: UptimeDay[];
  className?: string;
}
export const UptimeBar = ({
  days,
  className
}: UptimeBarProps) => {
  const getBarColor = (status: StatusType) => {
    switch (status) {
      case 'ok':
        return 'bg-status-ok';
      case 'warn':
        return 'bg-status-warn';
      case 'error':
        return 'bg-status-error';
      case 'info':
        return 'bg-status-info';
      case 'maint':
        return 'bg-status-maint';
      default:
        return 'bg-muted';
    }
  };
  const getStatusLabel = (status: StatusType) => {
    switch (status) {
      case 'ok':
        return 'Operacional';
      case 'warn':
        return 'Degradado';
      case 'error':
        return 'Incidente';
      case 'info':
        return 'Informativo';
      case 'maint':
        return 'Manutenção';
      default:
        return 'Desconhecido';
    }
  };
  return <div className={cn('space-y-4', className)}>
      <TooltipProvider>
        <div className="flex gap-1">
          {days.map((day, index) => <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={cn('flex-1 h-10 rounded-sm transition-all duration-200 cursor-pointer hover:scale-110', getBarColor(day.status), 'border border-glass-border')} style={{
              opacity: 0.4 + day.uptime * 0.6
            }} />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs space-y-1">
                  <p className="font-semibold">
                    {day.date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short'
                })}
                  </p>
                  <p>Status: {getStatusLabel(day.status)}</p>
                  <p>Uptime: {(day.uptime * 100).toFixed(2)}%</p>
                </div>
              </TooltipContent>
            </Tooltip>)}
        </div>
      </TooltipProvider>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>90 dias atrás</span>
        <span>Hoje</span>
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-status-ok" />
          <span className="text-muted-foreground">Operacional</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-status-warn" />
          <span className="text-muted-foreground">Atenção</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-status-error" />
          <span className="text-muted-foreground">Indisponível</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-status-maint" />
          <span className="text-muted-foreground">Manutenção</span>
        </div>
      </div>
    </div>;
};