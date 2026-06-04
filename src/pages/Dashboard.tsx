import { Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserX,
  Clock,
  CalendarX,
  AlertTriangle,
  Activity,
  Users,
  UserCheck,
  UserMinus,
  MessageSquare,
  Target,
} from 'lucide-react';
import OperationHealthBadge from '../components/ui/OperationHealthBadge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import KpiCard from '../components/ui/KpiCard';
import AlertBanner from '../components/ui/AlertBanner';
import InsightCard from '../components/ui/InsightCard';
import AdvisorBlock from '../components/ui/AdvisorBlock';
import ChartCard from '../components/ui/ChartCard';
import ActivityLog from '../components/ui/ActivityLog';
import { kpis, insights, conselhosIA, receitaTrend, formatCurrency } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Centro de Comando</h1>
          <p className="text-sm text-surface-500 mt-1">Visão geral da inteligência operacional</p>
        </div>
        <OperationHealthBadge score={82} />
      </div>

      {/* Alert Banner */}
      <AlertBanner valor={kpis.receitaPotencial} />

      {/* Métricas Financeiras */}
      <div>
        <h2 className="font-display font-semibold text-surface-200 text-sm mb-3">Métricas Financeiras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard
            titulo="Receita Potencial"
            valor={kpis.receitaPotencial}
            icone={DollarSign}
            cor="primary"
            tendencia={{ valor: 12.5, positivo: true }}
            delay={0}
          />
          <KpiCard
            titulo="Recuperável"
            valor={kpis.receitaRecuperavel}
            icone={TrendingUp}
            cor="success"
            tendencia={{ valor: 8.3, positivo: true }}
            delay={100}
          />
          <KpiCard
            titulo="Perdida"
            valor={kpis.receitaPerdida}
            icone={TrendingDown}
            cor="danger"
            tendencia={{ valor: 5.1, positivo: false }}
            delay={200}
          />
          <KpiCard
            titulo="Em Risco"
            valor={kpis.receitaEmRisco}
            icone={AlertTriangle}
            cor="warning"
            delay={250}
          />
        </div>
      </div>

      {/* Métricas Operacionais */}
      <div>
        <h2 className="font-display font-semibold text-surface-200 text-sm mb-3 mt-2">Métricas Operacionais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            titulo="Leads do Dia"
            valor={kpis.leadsDoDia}
            formato="numero"
            icone={Users}
            cor="primary"
            delay={300}
          />
          <KpiCard
            titulo="Leads Atendidos"
            valor={kpis.leadsAtendidos}
            formato="numero"
            icone={UserCheck}
            cor="success"
            delay={350}
          />
          <Link to="/leads-em-risco">
            <KpiCard
              titulo="Leads em Risco"
              valor={kpis.leadsEmRisco}
              formato="numero"
              icone={UserX}
              cor="warning"
              tendencia={{ valor: 15.2, positivo: false }}
              delay={400}
            />
          </Link>
          <KpiCard
            titulo="Leads Perdidos"
            valor={kpis.leadsPerdidos}
            formato="numero"
            icone={UserMinus}
            cor="danger"
            delay={450}
          />
          <KpiCard
            titulo="SLA Estourado"
            valor={kpis.slaEstourado}
            formato="numero"
            icone={Clock}
            cor="danger"
            tendencia={{ valor: 22.0, positivo: false }}
            delay={500}
          />
          <KpiCard
            titulo="No-show Previsto"
            valor={kpis.noShowPrevisto}
            formato="numero"
            icone={CalendarX}
            cor="warning"
            delay={550}
          />
          <KpiCard
            titulo="Taxa de Conversão"
            valor={kpis.taxaConversao}
            formato="percentual"
            icone={Target}
            cor="success"
            delay={600}
          />
          <KpiCard
            titulo="Principal Origem"
            valor={kpis.principalOrigem}
            formato="texto"
            icone={MessageSquare}
            cor="accent"
            delay={650}
          />
        </div>
      </div>

      {/* O que mudou hoje */}
      <section>
        <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
          <Activity size={18} className="text-accent-400" />
          O que mudou hoje
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-warning-500/20 bg-warning-500/5 p-4 flex flex-col justify-center">
            <p className="text-2xl font-bold text-warning-400 tabular-nums">+12</p>
            <p className="text-xs text-surface-400 mt-1">leads entraram em risco</p>
          </div>
          <div className="rounded-2xl border border-danger-500/20 bg-danger-500/5 p-4 flex flex-col justify-center">
            <p className="text-2xl font-bold text-danger-400 tabular-nums">+4</p>
            <p className="text-xs text-surface-400 mt-1">SLAs estouraram</p>
          </div>
          <div className="rounded-2xl border border-success-500/20 bg-success-500/5 p-4 flex flex-col justify-center">
            <p className="text-2xl font-bold text-success-400 tabular-nums">-8</p>
            <p className="text-xs text-surface-400 mt-1">pacientes foram recuperados</p>
          </div>
          <div className="rounded-2xl border border-primary-500/20 bg-primary-500/5 p-4 flex flex-col justify-center">
            <p className="text-2xl font-bold text-primary-400 tabular-nums">+R$ 5.200</p>
            <p className="text-xs text-surface-400 mt-1">recuperáveis identificados</p>
          </div>
        </div>
      </section>

      {/* Charts + Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Revenue Trend */}
        <ChartCard
          titulo="Tendência de Receita"
          subtitulo="Últimos 8 dias"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={receitaTrend}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
              <XAxis
                dataKey="data"
                tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }}
                axisLine={{ stroke: 'oklch(0.25 0.02 275)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'oklch(0.20 0.02 275)',
                  border: '1px solid oklch(0.30 0.02 275)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: 'oklch(0.88 0.01 275)',
                }}
                formatter={(value) => [formatCurrency(Number(value)), 'Receita']}
                labelStyle={{ color: 'oklch(0.50 0.02 275)' }}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="oklch(0.55 0.22 275)"
                strokeWidth={2}
                fill="url(#colorReceita)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Insights */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-surface-200 text-sm flex items-center gap-2">
            <span className="text-lg">🧠</span> Descobertas da IA
          </h3>
          {insights.slice(0, 3).map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="h-[312px] xl:h-auto">
          <ActivityLog />
        </div>
      </div>

      {/* AI Advisor */}
      <AdvisorBlock conselhos={conselhosIA} />
    </div>
  );
}
