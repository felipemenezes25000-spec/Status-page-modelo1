import { PriorityType } from '@/types/status';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle } from 'lucide-react';

interface PriorityBadgeProps {
  priority: PriorityType;
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  if (!priority) return null;

  const config = {
    p1: {
      label: 'P1',
      color: 'bg-status-error/20 text-status-error border-status-error/30',
      title: 'P1 – Indisponível',
      description: 'Impacto total: Aplicações/serviços indisponíveis. Possibilidade de perdas financeiras ou dano à imagem.',
    },
    p2: {
      label: 'P2',
      color: 'bg-status-warn/20 text-status-warn border-status-warn/30',
      title: 'P2 – Atenção',
      description: 'Impacto parcial: Instabilidade parcial com impacto limitado aos usuários.',
    },
  };

  const { label, color, title, description } = config[priority];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${color} cursor-help`}
          >
            <AlertTriangle className="h-3 w-3" />
            {label}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div>
            <p className="font-semibold mb-1">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
