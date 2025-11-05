import { Area } from '@/types/status';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import * as LucideIcons from 'lucide-react';

interface AllProductsTickerProps {
  areas: Area[];
}

export const AllProductsTicker = ({ areas }: AllProductsTickerProps) => {
  // Flatten all products from all areas and journeys
  const allProducts = areas.flatMap(area =>
    area.journeys.flatMap(journey =>
      journey.products.map(product => ({
        ...product,
        areaName: area.name,
        journeyName: journey.name,
      }))
    )
  );

  // Duplicate the array for seamless loop
  const tickerItems = [...allProducts, ...allProducts];

  return (
    <div className="py-3 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          Systems & Infrastructure
        </h3>
      </div>
      <div className="relative overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {tickerItems.map((product, index) => {
              const IconComponent = (LucideIcons as any)[product.icon] || LucideIcons.Activity;
              
              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded bg-background/50 backdrop-blur-sm whitespace-nowrap"
                >
                  <IconComponent className="h-3.5 w-3.5 text-primary/70" />
                  <span className="text-xs font-medium">{product.name}</span>
                  <div className="flex items-center gap-1">
                    {product.priority && <PriorityBadge priority={product.priority} />}
                    <StatusBadge status={product.status} label="" size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
