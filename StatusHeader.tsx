import { Moon, Sun, Eye, Palette, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export const StatusHeader = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [colorblindMode, setColorblindMode] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (colorblindMode) {
      document.documentElement.classList.add('colorblind');
    } else {
      document.documentElement.classList.remove('colorblind');
    }
  }, [colorblindMode]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">btg</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Command Center</h1>
            <p className="text-xs text-muted-foreground">Painel Operacional</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setColorblindMode(!colorblindMode)}
            className={`h-9 w-9 ${colorblindMode ? 'bg-accent' : ''}`}
            title="Modo daltônico"
          >
            <Eye className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hidden sm:flex"
            title="Personalizar"
          >
            <Palette className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Última atualização: {new Date().toLocaleString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </p>
    </header>
  );
};
