import { StatusHeader } from '@/components/StatusHeader';
import { OverallStatus } from '@/components/OverallStatus';
import { StatusLegend } from '@/components/StatusLegend';
import { KPICard } from '@/components/KPICard';
import { AreaCard } from '@/components/AreaCard';
import { IncidentCard } from '@/components/IncidentCard';
import { MaintenanceCard } from '@/components/MaintenanceCard';
import { UptimeBar } from '@/components/UptimeBar';
import { WorldClockTicker } from '@/components/WorldClockTicker';
import { AllProductsTicker } from '@/components/AllProductsTicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Rss, Bell, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useStatusData, useIncidents, useMaintenances, useComponents } from '@/hooks/useStatusData';
import { mapApiKPIsToUI, mapApiComponentsToAreas, mapApiIncidentsToUI, mapApiMaintenancesToUI, mapUptimeDataToUI } from '@/utils/statusMapper';
import { mockKPIs, mockAreas, mockIncidents, mockMaintenances, generateUptimeData } from '@/data/mockData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch data from edge functions
  const { data: overviewData, isLoading: overviewLoading } = useStatusData();
  const { data: incidentsData, isLoading: incidentsLoading } = useIncidents();
  const { data: maintenancesData, isLoading: maintenancesLoading } = useMaintenances();
  const { data: componentsData, isLoading: componentsLoading } = useComponents();

  // Map API data to UI format or fallback to mock data
  const kpis = useMemo(() => 
    overviewData?.kpis ? mapApiKPIsToUI(overviewData.kpis) : mockKPIs,
    [overviewData]
  );

  const areas = useMemo(() => 
    componentsData ? mapApiComponentsToAreas(componentsData) : mockAreas,
    [componentsData]
  );

  const incidents = useMemo(() => 
    incidentsData ? mapApiIncidentsToUI(incidentsData) : mockIncidents,
    [incidentsData]
  );

  const maintenances = useMemo(() => 
    maintenancesData ? mapApiMaintenancesToUI(maintenancesData) : mockMaintenances,
    [maintenancesData]
  );

  const uptimeData = useMemo(() => 
    overviewData?.uptime90d ? mapUptimeDataToUI(overviewData.uptime90d) : generateUptimeData(),
    [overviewData]
  );

  const hasErrors = areas.some(area => area.status === 'error');
  const hasWarnings = areas.some(area => area.status === 'warn');
  const overallStatus = hasErrors ? 'error' : hasWarnings ? 'warn' : 'ok';
  const affectedCount = areas.filter(a => a.status !== 'ok').length;

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.journeys.some(j =>
      j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const isLoading = overviewLoading || incidentsLoading || maintenancesLoading || componentsLoading;
  return <div className="min-h-screen bg-background">
      {/* Top Tickers Section */}
      <div className="bg-primary border-b border-primary-hover shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <WorldClockTicker />
        </div>
      </div>
      
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <AllProductsTicker areas={areas} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <StatusHeader />
        
        {/* Overall Status */}
        <OverallStatus
          status={overallStatus}
          message={
            overallStatus === 'ok'
              ? 'Todos os sistemas estão funcionando normalmente. Nenhum incidente ativo no momento.'
              : overallStatus === 'error'
              ? 'Há incidentes críticos em andamento. Nossas equipes estão trabalhando na resolução.'
              : 'Alguns sistemas apresentam degradação. Acompanhe os detalhes abaixo.'
          }
          affectedSystems={affectedCount}
        />

        {/* KPIs Section */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <KPICard kpi={kpis[0]} type="mttr" />
              <KPICard kpi={kpis[1]} type="mtbf" />
              <KPICard kpi={kpis[2]} type="sla" />
              <KPICard kpi={kpis[3]} type="slo" />
            </div>
          )}
        </section>

        {/* Uptime Timeline */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card-lg">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold mb-1">Linha do Tempo</h2>
                <p className="text-sm text-muted-foreground">Últimos 90 dias de uptime consolidado</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Uptime médio</p>
                <p className="text-2xl font-bold text-status-ok">99.95%</p>
              </div>
            </div>
            <UptimeBar days={uptimeData} />
          </div>
        </section>

        {/* Search */}
        <section className="mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Filtrar por área, jornada ou produto..." 
              className="pl-10 h-11 glass-card" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
          </div>
        </section>

        {/* Systems Section */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="glass-card-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold mb-1">Áreas, Jornadas e Produtos</h2>
                <p className="text-sm text-muted-foreground">Estrutura hierárquica completa com 4 Golden Signals</p>
              </div>
              <StatusLegend />
            </div>
            <div className="space-y-3">
              {filteredAreas.map((area, index) => (
                <div key={area.id} style={{ animationDelay: `${0.5 + index * 0.03}s` }} className="animate-fade-in">
                  <AreaCard area={area} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Incidents and Maintenances */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Incidents */}
          <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="glass-card-lg h-full">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Incidentes Recentes</h2>
                  <p className="text-sm text-muted-foreground">Histórico de ocorrências e resoluções</p>
                </div>
                <Button variant="link" size="sm" className="text-primary text-sm h-auto p-0">
                  Ver Histórico
                </Button>
              </div>
              <div className="space-y-4">
                {incidents.length > 0 ? (
                  incidents.map(incident => <IncidentCard key={incident.id} incident={incident} />)
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum incidente ativo no momento.</p>
                )}
              </div>
            </div>
          </section>

          {/* Maintenances */}
          <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="glass-card-lg h-full">
              <div className="mb-5">
                <h2 className="text-xl font-semibold mb-1">Manutenções Programadas</h2>
                <p className="text-sm text-muted-foreground">Janelas de manutenção planejadas</p>
              </div>
              <div className="space-y-4">
                {maintenances.length > 0 ? (
                  maintenances.map(maintenance => <MaintenanceCard key={maintenance.id} maintenance={maintenance} />)
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma manutenção programada no momento.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Subscription Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="glass-card-lg">
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-1">Notificações e Integrações</h2>
              <p className="text-sm text-muted-foreground">Receba alertas em tempo real sobre mudanças de status</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Input type="email" placeholder="seu@email.com" className="flex-1 h-11 glass-card" />
              <Input type="url" placeholder="https://webhook.site/... (opcional)" className="flex-1 h-11 glass-card" />
              <Button className="h-11 px-6 bg-primary hover:bg-primary-hover">
                <Bell className="h-4 w-4 mr-2" />
                Assinar
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 text-sm">
              <Button variant="link" className="p-0 h-auto text-primary">
                <Rss className="h-4 w-4 mr-1.5" />
                RSS Feed
              </Button>
              <Button variant="link" className="p-0 h-auto text-primary">
                API Docs
              </Button>
              <Button variant="link" className="p-0 h-auto text-primary">
                Changelog
              </Button>
              <Button variant="link" className="p-0 h-auto text-primary">
                Suporte
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="font-medium">© 2025 BTG Pactual • Command Center & Status Operacional</p>
          <p className="mt-2 text-xs">Todos os dados são simulados para demonstração</p>
        </footer>
      </div>
    </div>;
};
export default Index;