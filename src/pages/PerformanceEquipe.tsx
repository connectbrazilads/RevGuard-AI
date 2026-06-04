import { Users, TrendingUp, Clock, DollarSign } from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import KpiCard from '../components/ui/KpiCard';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import type { Column } from '../components/ui/DataTable';
import { equipeData, formatCurrency, type MembroEquipe } from '../data/mockData';

const equipeColumns: Column<MembroEquipe>[] = [
  { key: 'nome', label: 'Membro', sortable: true, render: (item) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center font-bold text-xs text-primary-400">
        {item.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
      </div>
      <div>
        <p className="font-medium text-surface-200">{item.nome}</p>
        <p className="text-[11px] text-surface-500">{item.cargo}</p>
      </div>
    </div>
  )},
  { key: 'leadsAtendidos', label: 'Leads Atendidos', sortable: true, className: 'text-right tabular-nums' },
  { key: 'tempoMedio', label: 'Tempo Médio', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className={`font-semibold ${item.status === 'critico' ? 'text-danger-400' : item.status === 'excelente' ? 'text-success-400' : 'text-warning-400'}`}>
      {item.tempoMedio}
    </span>
  )},
  { key: 'conversao', label: 'Conversão', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className="font-semibold text-surface-200">{item.conversao.toFixed(1)}%</span>
  )},
  { key: 'receitaGerada', label: 'Receita Gerada', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className="font-bold text-success-400">{formatCurrency(item.receitaGerada)}</span>
  )},
  { key: 'tendencia', label: 'Ritmo (7 dias)', className: 'w-32', render: (item) => {
    const data = item.tendencia.map((v, i) => ({ value: v, index: i }));
    const color = item.status === 'excelente' ? 'oklch(0.75 0.16 155)' : item.status === 'critico' ? 'oklch(0.62 0.22 20)' : 'oklch(0.75 0.16 80)';
    return (
      <div className="h-8 w-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }},
  { key: 'status', label: 'Performance', sortable: true, render: (item) => {
    let variant: 'success' | 'warning' | 'danger' = 'success';
    let label = 'Excelente';
    if (item.status === 'bom') { variant = 'warning'; label = 'Na Média'; }
    if (item.status === 'critico') { variant = 'danger'; label = 'Abaixo'; }
    return <StatusBadge status={label} variant={variant} />;
  }},
];

export default function PerformanceEquipe() {
  const topConversao = [...equipeData].sort((a, b) => b.conversao - a.conversao)[0];
  const totalLeads = equipeData.reduce((sum, item) => sum + item.leadsAtendidos, 0);
  const totalReceita = equipeData.reduce((sum, item) => sum + item.receitaGerada, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">Mesa de Operações</h1>
        <p className="text-sm text-surface-500 mt-1">Gestão de performance e ranking da equipe</p>
      </div>

      {/* KPIs da Equipe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard titulo="Total de Leads" valor={totalLeads} formato="numero" icone={Users} cor="primary" delay={0} />
        <KpiCard titulo="Receita Fechada" valor={totalReceita} icone={DollarSign} cor="success" delay={100} />
        <KpiCard titulo="Top Conversão" valor={topConversao.nome} formato="texto" icone={TrendingUp} cor="accent" delay={200} />
        <KpiCard titulo="Média de Tempo" valor="15m 20s" formato="texto" icone={Clock} cor="warning" delay={300} />
      </div>

      {/* Tabela de Performance */}
      <div className="bg-surface-900 border border-surface-800/50 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-surface-800/50 flex items-center justify-between">
          <h2 className="font-display font-semibold text-surface-100 text-lg">Ranking de Atendentes</h2>
          <span className="text-xs font-medium bg-surface-800 text-surface-400 px-3 py-1 rounded-full border border-surface-700">
            Últimos 30 dias
          </span>
        </div>
        <div className="p-0">
          <DataTable
            columns={equipeColumns}
            data={equipeData}
          />
        </div>
      </div>
    </div>
  );
}
