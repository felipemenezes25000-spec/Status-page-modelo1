import { CheckCircle2, AlertTriangle, AlertCircle, Info, Wrench } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export const StatusLegend = () => {
  const statuses = [
    {
      icon: CheckCircle2,
      label: 'Operacional',
      description: 'Sistema funcionando normalmente',
      color: 'text-status-ok',
      bgColor: 'bg-status-ok',
    },
    {
      icon: AlertTriangle,
      label: 'Degradado',
      description: 'Desempenho reduzido ou intermitente',
      color: 'text-status-warn',
      bgColor: 'bg-status-warn',
    },
    {
      icon: AlertCircle,
      label: 'Indisponível',
      description: 'Sistema fora do ar ou com falha crítica',
      color: 'text-status-error',
      bgColor: 'bg-status-error',
    },
    {
      icon: Info,
      label: 'Informação',
      description: 'Atualizações ou avisos importantes',
      color: 'text-status-info',
      bgColor: 'bg-status-info',
    },
    {
      icon: Wrench,
      label: 'Manutenção',
      description: 'Manutenção programada em andamento',
      color: 'text-status-maint',
      bgColor: 'bg-status-maint',
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Legenda de Status
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Legenda de Status</h3>
          <div className="space-y-3">
            {statuses.map((status) => {
              const Icon = status.icon;
              return (
                <div key={status.label} className="flex items-start gap-3">
                  <div className={`mt-0.5 ${status.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{status.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {status.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
