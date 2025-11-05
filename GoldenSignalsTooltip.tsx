import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

export const GoldenSignalsTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center">
            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-md">
          <div className="space-y-3">
            <p className="font-semibold">4 Golden Signals do Google SRE</p>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-medium">Latência:</span> Tempo de resposta das requisições
              </div>
              <div>
                <span className="font-medium">Tráfego:</span> Volume de requisições por segundo
              </div>
              <div>
                <span className="font-medium">Erros:</span> Taxa de requisições com falha
              </div>
              <div>
                <span className="font-medium">Saturação:</span> Uso de recursos (CPU, memória, disco)
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
