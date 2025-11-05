import { Area } from '@/types/status';
import { StatusBadge } from './StatusBadge';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { JourneyCard } from './JourneyCard';
import * as LucideIcons from 'lucide-react';

interface AreaCardProps {
  area: Area;
}

export const AreaCard = ({ area }: AreaCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const IconComponent = (LucideIcons as any)[area.icon] || LucideIcons.Activity;

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base font-semibold">{area.name}</h3>
              <StatusBadge status={area.status} size="sm" />
            </div>
            <p className="text-xs text-muted-foreground">
              {area.journeys.length} {area.journeys.length === 1 ? 'jornada' : 'jornadas'} •{' '}
              {area.journeys.reduce((acc, j) => acc + j.products.length, 0)} produtos
            </p>
          </div>
        </div>

        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-3',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && area.journeys.length > 0 && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in border-t border-border/50">
          <div className="pt-3">
            {area.journeys.map((journey) => (
              <JourneyCard key={journey.id} journey={journey} areaName={area.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
