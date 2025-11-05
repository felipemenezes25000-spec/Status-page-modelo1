import { Product } from '@/types/status';
import { StatusBadge } from './StatusBadge';
import { ChevronDown, Activity } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GoldenSignalsDisplay } from './GoldenSignalsDisplay';
import { PriorityBadge } from './PriorityBadge';

interface ProductCardProps {
  product: Product;
  areaName: string;
  journeyName: string;
}

export const ProductCard = ({ product, areaName, journeyName }: ProductCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-accent/5 transition-colors"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-medium text-sm">{product.name}</h4>
              <StatusBadge status={product.status} size="sm" />
              {product.priority && <PriorityBadge priority={product.priority} />}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {areaName}
              </span>
              <span>•</span>
              <span>{journeyName}</span>
            </div>
          </div>
        </div>

        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-2',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className="px-3 pb-3 border-t border-border/50 animate-fade-in">
          <div className="pt-3">
            <GoldenSignalsDisplay signals={product.signals} />
          </div>
        </div>
      )}
    </div>
  );
};
