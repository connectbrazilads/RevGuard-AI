import { TrendingDown, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import KpiCard from '../components/ui/KpiCard';
import DataTable from '../components/ui/DataTable';
import ChartCard from '../components/ui/ChartCard';
import StatusBadge from '../components/ui/StatusBadge';
import type { Column } from '../components/ui/DataTable';
import { oportunidades, motivosPerda, formatCurrency, type Oportunidade } from '../data/mockData';

const totalPerdido = oportunidades.reduce((s, o) => s + o.receita, 0);
const avgDealValue = Math.round(totalPerdido / oportunidades.length);
const topReason = 'Sem retorno';
const recuperaveis = oportunidades.filter(o => o.recuperavel);
const totalRecuperavel = recuperaveis.reduce((s, o) => s + o.receita, 0);

const pieColors = ['oklch(0.75 0.16 80)', 'oklch(0.62 0.22 20)', 'oklch(0.65 0.20 220)', 'oklch(0.50 0.02 275)'];

const perdasPorMes = [
  { mes: 'Jan', valor: 18200 },
  { mes: 'Fev', valor: 15400 },
  { mes: 'Mar', valor: 22800 },
  { mes: 'Abr', valor: 19600 },
  { mes: 'Mai', valor: 28400 },
  { mes: 'Jun', valor: 42800 },
];

const oportunidadeColumns: Column<Oportunidade>[] = [
  { key: 'cliente', label: 'Cliente', sortable: true, render: (item) => (
    <span className="font-medium text-surface-200">{item.cliente}</span>
  )},
  { key: 'motivo', label: 'Motivo', sortable: true, render: (item) => (
    <StatusBadge
      status={item.motivo}
      variant={
        item.motivo === 'Sem retorno' ? 'warning' :
        item.motivo === 'SLA estourado' ? 'danger' :
        item.motivo === 'Follow-up ausente' ? 'info' : 'neutral'
      }
      size="md"
    />
  )},
  { key: 'receita', label: 'Receita', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className="font-bold text-danger-400">{formatCurrency(item.receita)}</span>
  )},
  { key: 'unidade', label: 'Unidade', sortable: true },
  { key: 'data', label: 'Data', sortable: true },
  { key: 'status', label: 'Status', render: (item) => (
    <StatusBadge
      status={item.status === 'recuperavel' ? 'Recuperável' : item.status === 'em_recuperacao' ? 'Em recuperação' : 'Perdida'}
      variant={item.status === 'recuperavel' ? 'success' : item.status === 'em_recuperacao' ? 'info' : 'danger'}
      size="md"
    />
  )},
];

export default function OportunidadesPerdidas() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">Oportunidades Perdidas</h1>
        <p className="text-sm text-surface-500 mt-1">Detalhamento da receita perdida e oportunidades de recuperação</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard titulo="Total Perdido" valor={totalPerdido} icone={TrendingDown} cor="danger" tendencia={{ valor: 32.5, positivo: false }} delay={0} />
        <KpiCard titulo="Ticket Médio" valor={avgDealValue} icone={DollarSign} cor="warning" delay={100} />
        <KpiCard titulo="Recuperáveis" valor={totalRecuperavel} icone={RefreshCw} cor="success" delay={200} />
        <KpiCard titulo="Top Motivo" valor={oportunidades.filter(o => o.motivo === topReason).length} formato="numero" icone={AlertCircle} cor="danger" delay={300} />
      </div>

      {/* Recoverable highlight */}
      <div className="rounded-2xl border border-success-500/20 bg-gradient-to-r from-success-600/10 to-success-500/5 p-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success-500/15">
            <RefreshCw size={24} className="text-success-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-success-300 text-lg">{formatCurrency(totalRecuperavel)} em receita recuperável</h3>
            <p className="text-sm text-surface-400 mt-0.5">
              {recuperaveis.length} oportunidades podem ser recuperadas com ações imediatas de follow-up e recontato.
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-success-500/15 text-success-300 text-sm font-medium hover:bg-success-500/25 transition-colors">
            Ver plano de ação
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loss Reasons */}
        <ChartCard titulo="Motivos de Perda" subtitulo="Distribuição por categoria">
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={motivosPerda}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="valor"
                  strokeWidth={0}
                >
                  {motivosPerda.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                  formatter={(value) => [formatCurrency(Number(value)), 'Perdido']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {motivosPerda.map((item, i) => (
                <div key={item.data} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                  <span className="text-sm text-surface-300 w-32">{item.label}</span>
                  <span className="text-sm font-bold text-surface-200 tabular-nums">{formatCurrency(item.valor)}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Loss by Month */}
        <ChartCard titulo="Perda por Mês" subtitulo="Evolução da receita perdida">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={perdasPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
              <XAxis dataKey="mes" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={{ stroke: 'oklch(0.25 0.02 275)' }} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                formatter={(value) => [formatCurrency(Number(value)), 'Perdido']}
              />
              <Bar dataKey="valor" radius={[8, 8, 0, 0]} fill="oklch(0.62 0.22 20)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Table */}
      <div>
        <h2 className="font-display font-semibold text-surface-100 text-lg mb-4">Todas as Oportunidades</h2>
        <DataTable
          columns={oportunidadeColumns}
          data={oportunidades}
        />
      </div>
    </div>
  );
}
