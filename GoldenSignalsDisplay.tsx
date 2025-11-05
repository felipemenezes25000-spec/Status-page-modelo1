import { GoldenSignals } from '@/types/status';
import { Timer, GitBranch, TriangleAlert, Gauge } from 'lucide-react';

interface GoldenSignalsDisplayProps {
  signals: GoldenSignals;
}

export const GoldenSignalsDisplay = ({ signals }: GoldenSignalsDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <div className="flex items-center gap-2 p-2 rounded-md bg-accent/20">
        <Timer className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase font-medium">Latência p95</p>
          <p className="font-mono font-semibold text-xs">{signals.latency} ms</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-2 rounded-md bg-accent/20">
        <GitBranch className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase font-medium">Tráfego</p>
          <p className="font-mono font-semibold text-xs">{signals.traffic} req/s</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-2 rounded-md bg-accent/20">
        <TriangleAlert className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase font-medium">Erros</p>
          <p className="font-mono font-semibold text-xs">{signals.errors.toFixed(2)} %</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-2 rounded-md bg-accent/20">
        <Gauge className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase font-medium">Saturação</p>
          <p className="font-mono font-semibold text-xs">{signals.saturation} %</p>
        </div>
      </div>
    </div>
  );
};
