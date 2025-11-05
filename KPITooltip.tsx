import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface KPITooltipProps {
  type: 'mttr' | 'mtbf' | 'sla' | 'slo';
}

export const KPITooltip = ({ type }: KPITooltipProps) => {
  const kpiInfo = {
    mttr: {
      title: 'MTTR - Mean Time To Repair',
      description: 'Tempo médio para reparar um incidente. Quanto menor, melhor a capacidade de resposta da equipe.',
      example: 'Se 3 incidentes levaram 2h, 4h e 6h para serem resolvidos, o MTTR é 4h.',
    },
    mtbf: {
      title: 'MTBF - Mean Time Between Failures',
      description: 'Tempo médio entre falhas consecutivas. Quanto maior, mais confiável é o sistema.',
      example: 'Se ocorreram 3 falhas em 90 dias, o MTBF é 30 dias.',
    },
    sla: {
      title: 'SLA - Service Level Agreement',
      description: 'Acordo de nível de serviço contratual com garantias específicas de disponibilidade e desempenho.',
      example: 'SLA de 99.9% significa no máximo 43 minutos de indisponibilidade por mês.',
    },
    slo: {
      title: 'SLO - Service Level Objective',
      description: 'Objetivo interno de nível de serviço. Meta operacional mais rigorosa que o SLA para garantir margem de segurança.',
      example: 'SLO de 99.95% quando o SLA é 99.9%, garantindo buffer de segurança.',
    },
  };

  const info = kpiInfo[type];

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center">
            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold text-sm">{info.title}</p>
            <p className="text-xs">{info.description}</p>
            <p className="text-xs text-muted-foreground italic">{info.example}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
