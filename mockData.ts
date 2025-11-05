import { Area, Incident, Maintenance, KPI } from '@/types/status';
import { calculateStatus, calculateAreaStatus } from '@/utils/statusCalculator';

export const mockKPIs: KPI[] = [
  {
    label: 'MTTR',
    value: '1h 43m',
    change: '-12m vs mês anterior',
    trend: 'up',
  },
  {
    label: 'MTBF',
    value: '22 dias',
    change: '+3 dias vs mês anterior',
    trend: 'up',
  },
  {
    label: 'SLA',
    value: '99.9%',
    change: 'Cumprido',
    status: 'ok',
  },
  {
    label: 'SLO',
    value: '99.95%',
    change: '23% do budget consumido',
    trend: 'neutral',
  },
];

// BTG Empresas
const btgEmpresasJourneys = [
  {
    id: 'portal-corporativo',
    name: 'Portal Corporativo',
    icon: 'Browser',
    products: [
      {
        id: 'portal',
        name: 'Portal',
        icon: 'LayoutDashboard',
        ...calculateStatus({ latency: 850, traffic: 32, errors: 1.2, saturation: 85 }),
        signals: { latency: 850, traffic: 32, errors: 1.2, saturation: 85 },
      },
    ],
  },
  {
    id: 'upload-notas',
    name: 'Gestão de Notas Fiscais',
    icon: 'FileStack',
    products: [
      {
        id: 'upload-notas',
        name: 'Upload de Notas',
        icon: 'UploadCloud',
        ...calculateStatus({ latency: 320, traffic: 15, errors: 0.1, saturation: 42 }),
        signals: { latency: 320, traffic: 15, errors: 0.1, saturation: 42 },
      },
    ],
  },
];

// BTG Banking
const btgBankingJourneys = [
  {
    id: 'gestao-contas',
    name: 'Gestão de Contas',
    icon: 'UserCog',
    products: [
      {
        id: 'contas',
        name: 'Contas',
        icon: 'CreditCard',
        ...calculateStatus({ latency: 110, traffic: 220, errors: 0.01, saturation: 45 }),
        signals: { latency: 110, traffic: 220, errors: 0.01, saturation: 45 },
      },
      {
        id: 'cartoes',
        name: 'Cartões',
        icon: 'CreditCard',
        ...calculateStatus({ latency: 150, traffic: 180, errors: 0.03, saturation: 38 }),
        signals: { latency: 150, traffic: 180, errors: 0.03, saturation: 38 },
      },
    ],
  },
];

// BTG Investimentos
const btgInvestimentosJourneys = [
  {
    id: 'plataforma-assessor',
    name: 'Plataforma do Assessor',
    icon: 'ShieldCheck',
    products: [
      {
        id: 'login-portal-assessor',
        name: 'Login no Portal do Assessor',
        icon: 'LogIn',
        ...calculateStatus({ latency: 95, traffic: 180, errors: 0.02, saturation: 35 }),
        signals: { latency: 95, traffic: 180, errors: 0.02, saturation: 35 },
      },
    ],
  },
  {
    id: 'home-broker',
    name: 'Home Broker',
    icon: 'CandlestickChart',
    products: [
      {
        id: 'negociacao',
        name: 'Negociação de Ativos',
        icon: 'SwapHorizontal',
        ...calculateStatus({ latency: 180, traffic: 890, errors: 0.05, saturation: 58 }),
        signals: { latency: 180, traffic: 890, errors: 0.05, saturation: 58 },
      },
      {
        id: 'cotacoes',
        name: 'Cotações em Tempo Real',
        icon: 'Activity',
        ...calculateStatus({ latency: 85, traffic: 1240, errors: 0.01, saturation: 52 }),
        signals: { latency: 85, traffic: 1240, errors: 0.01, saturation: 52 },
      },
    ],
  },
  {
    id: 'analise-investimentos',
    name: 'Análise de Investimentos',
    icon: 'ChartPie',
    products: [
      {
        id: 'portfolio',
        name: 'Portfólio',
        icon: 'ChartPie',
        ...calculateStatus({ latency: 210, traffic: 145, errors: 0.08, saturation: 48 }),
        signals: { latency: 210, traffic: 145, errors: 0.08, saturation: 48 },
      },
    ],
  },
];

export const mockAreas: Area[] = [
  {
    id: 'btg-empresas',
    name: 'BTG Empresas',
    icon: 'Building2',
    status: calculateAreaStatus(btgEmpresasJourneys),
    journeys: btgEmpresasJourneys,
  },
  {
    id: 'btg-banking',
    name: 'BTG Banking',
    icon: 'CreditCard',
    status: calculateAreaStatus(btgBankingJourneys),
    journeys: btgBankingJourneys,
  },
  {
    id: 'btg-investimentos',
    name: 'BTG Investimentos',
    icon: 'LineChart',
    status: calculateAreaStatus(btgInvestimentosJourneys),
    journeys: btgInvestimentosJourneys,
  },
];

export const mockIncidents: Incident[] = [
  {
    id: 'inc-001',
    title: 'Falha no Login do Portal do Assessor',
    severity: 'error',
    priority: 'p1',
    area: 'BTG Investimentos',
    journey: 'Plataforma do Assessor',
    product: 'Login no Portal do Assessor',
    startTime: new Date('2025-11-02T22:05:00-03:00'),
    endTime: new Date('2025-11-02T22:45:00-03:00'),
    updates: [
      {
        time: new Date('2025-11-02T22:05:00-03:00'),
        message: 'Identificando falha no serviço de autenticação.',
        status: 'investigating',
      },
      {
        time: new Date('2025-11-02T22:12:00-03:00'),
        message: 'Investigando gateway de autenticação OAuth.',
        status: 'investigating',
      },
      {
        time: new Date('2025-11-02T22:25:00-03:00'),
        message: 'Correção aplicada. Validando estabilidade.',
        status: 'identified',
      },
      {
        time: new Date('2025-11-02T22:45:00-03:00'),
        message: 'Resolvido. Serviço totalmente restabelecido.',
        status: 'resolved',
      },
    ],
  },
  {
    id: 'inc-002',
    title: 'Lentidão no Portal Corporativo',
    severity: 'warn',
    priority: 'p2',
    area: 'BTG Empresas',
    journey: 'Portal Corporativo',
    product: 'Portal',
    startTime: new Date('2025-11-02T21:30:00-03:00'),
    updates: [
      {
        time: new Date('2025-11-02T21:30:00-03:00'),
        message: 'Detectada latência alta no portal corporativo.',
        status: 'investigating',
      },
      {
        time: new Date('2025-11-02T21:40:00-03:00'),
        message: 'Investigando APIs de backend e cache.',
        status: 'investigating',
      },
      {
        time: new Date('2025-11-02T22:10:00-03:00'),
        message: 'Aplicada otimização de queries. Monitorando métricas.',
        status: 'monitoring',
      },
    ],
  },
];

export const mockMaintenances: Maintenance[] = [
  {
    id: 'maint-001',
    title: 'Atualização de Infraestrutura — Home Broker',
    area: 'BTG Investimentos',
    journey: 'Home Broker',
    product: 'Negociação de Ativos',
    scheduledStart: new Date('2025-11-03T02:00:00-03:00'),
    scheduledEnd: new Date('2025-11-03T03:30:00-03:00'),
    impact: 'Possível intermitência durante janela de manutenção',
    description: 'Atualização de servidores e otimização de latência.',
  },
  {
    id: 'maint-002',
    title: 'Manutenção Programada — Portal Corporativo',
    area: 'BTG Empresas',
    journey: 'Portal Corporativo',
    product: 'Portal',
    scheduledStart: new Date('2025-11-04T01:00:00-03:00'),
    scheduledEnd: new Date('2025-11-04T02:30:00-03:00'),
    impact: 'Sistema pode ficar indisponível por até 10 minutos',
    description: 'Aplicação de patches de segurança e migração de banco.',
  },
];

// Generate 90 days of uptime data
export const generateUptimeData = () => {
  const days = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const random = Math.random();
    let status: 'ok' | 'warn' | 'error' | 'info' | 'maint';
    
    if (random < 0.92) status = 'ok';
    else if (random < 0.96) status = 'info';
    else if (random < 0.98) status = 'warn';
    else if (random < 0.99) status = 'maint';
    else status = 'error';
    
    const uptime = status === 'ok' ? 0.99 + Math.random() * 0.01 : 0.85 + Math.random() * 0.14;
    
    days.push({ date, status, uptime });
  }
  
  return days;
};
