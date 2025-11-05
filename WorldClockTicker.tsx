import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Office } from '@/types/status';

const offices: Office[] = [
  { city: 'São Paulo', timezone: 'America/Sao_Paulo', offset: 0 },
  { city: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', offset: 0 },
  { city: 'Belo Horizonte', timezone: 'America/Sao_Paulo', offset: 0 },
  { city: 'Recife', timezone: 'America/Recife', offset: 0 },
  { city: 'Porto Alegre', timezone: 'America/Sao_Paulo', offset: 0 },
  { city: 'Curitiba', timezone: 'America/Sao_Paulo', offset: 0 },
  { city: 'Bogotá', timezone: 'America/Bogota', offset: -2 },
  { city: 'Medellín', timezone: 'America/Bogota', offset: -2 },
  { city: 'Barranquilla', timezone: 'America/Bogota', offset: -2 },
  { city: 'Lima', timezone: 'America/Lima', offset: -2 },
  { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', offset: 0 },
  { city: 'Santiago', timezone: 'America/Santiago', offset: 0 },
  { city: 'Cidade do México', timezone: 'America/Mexico_City', offset: -3 },
  { city: 'Nova Iorque', timezone: 'America/New_York', offset: -2 },
  { city: 'Miami', timezone: 'America/New_York', offset: -2 },
  { city: 'Atlanta', timezone: 'America/New_York', offset: -2 },
  { city: 'Londres', timezone: 'Europe/London', offset: 3 },
  { city: 'Lisboa', timezone: 'Europe/Lisbon', offset: 3 },
  { city: 'Hong Kong', timezone: 'Asia/Hong_Kong', offset: 11 },
  { city: 'Tóquio', timezone: 'Asia/Tokyo', offset: 12 },
  { city: 'Luxemburgo', timezone: 'Europe/Luxembourg', offset: 4 },
];

export const WorldClockTicker = () => {
  const [times, setTimes] = useState<{ city: string; time: string; offset: string }[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = offices.map(office => {
        const time = new Date().toLocaleTimeString('pt-BR', {
          timeZone: office.timezone,
          hour: '2-digit',
          minute: '2-digit',
        });
        
        const offsetStr = office.offset === 0 
          ? '(BRT)' 
          : office.offset > 0 
            ? `(+${office.offset}h)`
            : `(${office.offset}h)`;

        return {
          city: office.city,
          time,
          offset: offsetStr,
        };
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-3 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-primary-foreground" />
        <h3 className="text-xs font-semibold uppercase text-primary-foreground tracking-wider">
          BTG Global Offices
        </h3>
      </div>
      <div className="relative overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {times.concat(times).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary-hover/30 backdrop-blur-sm whitespace-nowrap">
                <span className="text-xs font-medium text-primary-foreground">{item.city}</span>
                <span className="text-xs font-mono text-primary-foreground font-semibold">{item.time}</span>
                <span className="text-[10px] text-primary-foreground/70">{item.offset}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
