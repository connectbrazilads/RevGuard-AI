import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserX,
  Clock,
  CalendarX,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import KpiCard from '../components/ui/KpiCard';
import AlertBanner from '../components/ui/AlertBanner';
import InsightCard from '../components/ui/InsightCard';
import AdvisorBlock from '../components/ui/AdvisorBlock';
import ChartCard from '../components/ui/ChartCard';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import type { Column } from '../components/ui/DataTable';
import {
  kpis,
  insights,
  conselhosIA,
  oportunidades,
  unidades,
  receitaTrend,
  formatCurrency,
  type Oportunidade,
} from '../data/mockData';

const oportunidadeColumns: Column<Oportunidade>[] = [
  { key: 'cliente', label: 'Cliente', sortable: true },
  { key: 'motivo', label: 'Motivo', sortable: true, render: (item) => (
    <StatusBadge
      status={item.motivo}
      variant={
        item.motivo === 'Sem retorno' ? 'warning' :
        item.motivo === 'SLA estourado' ? 'danger' :
        item.motivo === 'Follow-up ausente' ? 'info' : 'neutral'
      }
    />
  )},
  { key: 'receita', label: 'Receita', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className="font-semibold text-surface-200">{formatCurrency(item.receita)}</span>
  )},
  { key: 'unidade', label: 'Unidade', sortable: true },
  { key: 'status', label: 'Status', render: (item) => (
    <StatusBadge
      status={item.status === 'recuperavel' ? 'Recuperável' : item.status === 'em_recuperacao' ? 'Em recuperação' : 'Perdida'}
      variant={item.status === 'recuperavel' ? 'success' : item.status === 'em_recuperacao' ? 'info' : 'danger'}
    />
  )},
];

const barColors = ['oklch(0.55 0.22 275)', 'oklch(0.62 0.22 20)', 'oklch(0.68 0.19 155)'];

export default function RevenueObserver() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">Observador de Receita</h1>
        <p className="text-sm text-surface-500 mt-1">Análise detalhada de oportunidades e perdas</p>
      </div>

      {/* Alert Banner */}
      <AlertBanner valor={kpis.receitaPotencial} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard titulo="Receita Potencial" valor={kpis.receitaPotencial} icone={DollarSign} cor="primary" tendencia={{ valor: 12.5, positivo: true }} delay={0} />
        <KpiCard titulo="Recuperável" valor={kpis.receitaRecuperavel} icone={TrendingUp} cor="success" tendencia={{ valor: 8.3, positivo: true }} delay={100} />
        <KpiCard
          titulo="Receita Perdida"
          valor={kpis.receitaPerdida}
          icone={TrendingDown}
          cor="danger"
          tendencia={{ valor: 5.1, positivo: false }}
          delay={200}
        />
        <KpiCard
          titulo="Receita em Risco"
          valor={kpis.receitaEmRisco}
          icone={AlertTriangle}
          cor="warning"
          delay={250}
        /><KpiCard titulo="Leads em Risco" valor={kpis.leadsEmRisco} formato="numero" icone={UserX} cor="warning" tendencia={{ valor: 15.2, positivo: false }} delay={300} />
        <KpiCard titulo="SLA Estourado" valor={kpis.slaEstourado} formato="numero" icone={Clock} cor="danger" delay={400} />
        <KpiCard titulo="No-show Previsto" valor={kpis.noShowPrevisto} formato="numero" icone={CalendarX} cor="warning" delay={500} />
      </div>

      {/* Insights Section */}
      <div>
        <h2 className="font-display font-semibold text-surface-100 text-lg mb-4 flex items-center gap-2">
          <span className="text-xl">🧠</span> Descobertas da IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {insights.map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <ChartCard titulo="Receita Potencial" subtitulo="Tendência dos últimos 8 dias">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={receitaTrend}>
              <defs>
                <linearGradient id="colorReceitaRO" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
              <XAxis dataKey="data" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={{ stroke: 'oklch(0.25 0.02 275)' }} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                formatter={(value) => [formatCurrency(Number(value)), 'Receita']}
              />
              <Area type="monotone" dataKey="valor" stroke="oklch(0.55 0.22 275)" strokeWidth={2} fill="url(#colorReceitaRO)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue by Unit */}
        <ChartCard titulo="Receita por Unidade" subtitulo="Comparativo mensal">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={unidades}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
              <XAxis dataKey="nome" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={{ stroke: 'oklch(0.25 0.02 275)' }} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                formatter={(value) => [formatCurrency(Number(value)), 'Receita']}
              />
              <Bar dataKey="receita" radius={[8, 8, 0, 0]}>
                {unidades.map((_, i) => (
                  <Cell key={i} fill={barColors[i % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Opportunities Table */}
      <div>
        <h2 className="font-display font-semibold text-surface-100 text-lg mb-4">Oportunidades Perdidas</h2>
        <DataTable
          columns={oportunidadeColumns}
          data={oportunidades}
          maxRows={10}
        />
      </div>

      {/* AI Advisor */}
      <AdvisorBlock conselhos={conselhosIA} />
    </div>
  );
}
