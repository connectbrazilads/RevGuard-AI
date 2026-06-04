import { useState } from 'react';
import { UserX, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import KpiCard from '../components/ui/KpiCard';
import DataTable from '../components/ui/DataTable';
import ChartCard from '../components/ui/ChartCard';
import StatusBadge from '../components/ui/StatusBadge';
import LeadDetailsSlideOver from '../components/ui/LeadDetailsSlideOver';
import type { Column } from '../components/ui/DataTable';
import { leads, formatCurrency, type Lead } from '../data/mockData';

const leadsEmRisco = leads.filter(l => l.risco === 'alto' || l.risco === 'medio');
const totalValorRisco = leadsEmRisco.reduce((sum, l) => sum + l.valor, 0);
const mediaDiasSemContato = Math.round(leadsEmRisco.reduce((sum, l) => sum + l.diasSemContato, 0) / leadsEmRisco.length);

const riskDistribution = [
  { name: 'Alto', value: leads.filter(l => l.risco === 'alto').length, color: 'oklch(0.62 0.22 20)' },
  { name: 'Médio', value: leads.filter(l => l.risco === 'medio').length, color: 'oklch(0.75 0.16 80)' },
  { name: 'Baixo', value: leads.filter(l => l.risco === 'baixo').length, color: 'oklch(0.68 0.19 155)' },
];

const diasDistribution = [
  { faixa: '0-3 dias', quantidade: leads.filter(l => l.diasSemContato <= 3).length },
  { faixa: '4-7 dias', quantidade: leads.filter(l => l.diasSemContato >= 4 && l.diasSemContato <= 7).length },
  { faixa: '8-14 dias', quantidade: leads.filter(l => l.diasSemContato >= 8 && l.diasSemContato <= 14).length },
  { faixa: '15+ dias', quantidade: leads.filter(l => l.diasSemContato >= 15).length },
];

const riscoVariant = (risco: string) => {
  switch (risco) {
    case 'alto': return 'danger';
    case 'medio': return 'warning';
    default: return 'success';
  }
};

const statusVariant = (status: string) => {
  switch (status) {
    case 'novo': return 'info';
    case 'em_contato': return 'success';
    case 'sem_retorno': return 'warning';
    case 'abandonado': return 'danger';
    case 'convertido': return 'success';
    case 'perdido': return 'danger';
    default: return 'neutral';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'novo': return 'Novo';
    case 'em_contato': return 'Em contato';
    case 'sem_retorno': return 'Sem retorno';
    case 'abandonado': return 'Abandonado';
    case 'convertido': return 'Convertido';
    case 'perdido': return 'Perdido';
    default: return status;
  }
};

const leadsColumns: Column<Lead>[] = [
  { key: 'nome', label: 'Lead', sortable: true, render: (item) => (
    <div>
      <p className="font-medium text-surface-200">{item.nome}</p>
      <p className="text-[11px] text-surface-500">{item.interesse}</p>
    </div>
  )},
  { key: 'unidade', label: 'Unidade', sortable: true },
  { key: 'origem', label: 'Origem', sortable: true },
  { key: 'valor', label: 'Valor', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className="font-semibold text-surface-200">{formatCurrency(item.valor)}</span>
  )},
  { key: 'status', label: 'Status', render: (item) => (
    <StatusBadge status={statusLabel(item.status)} variant={statusVariant(item.status)} />
  )},
  { key: 'risco', label: 'Risco', sortable: true, render: (item) => (
    <StatusBadge status={item.risco.charAt(0).toUpperCase() + item.risco.slice(1)} variant={riscoVariant(item.risco)} />
  )},
  { key: 'diasSemContato', label: 'Dias s/ contato', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className={`font-semibold ${item.diasSemContato > 7 ? 'text-danger-400' : item.diasSemContato > 3 ? 'text-warning-400' : 'text-surface-400'}`}>
      {item.diasSemContato}d
    </span>
  )},
];

export default function LeadsEmRisco() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">Leads em Risco</h1>
        <p className="text-sm text-surface-500 mt-1">Leads abandonados ou sem acompanhamento adequado</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard titulo="Total em Risco" valor={leadsEmRisco.length} formato="numero" icone={UserX} cor="danger" delay={0} />
        <KpiCard titulo="Valor Potencial" valor={totalValorRisco} icone={DollarSign} cor="warning" delay={100} />
        <KpiCard titulo="Média Dias s/ Contato" valor={mediaDiasSemContato} formato="numero" icone={Clock} cor="danger" delay={200} />
        <KpiCard titulo="Risco Alto" valor={leads.filter(l => l.risco === 'alto').length} formato="numero" icone={AlertTriangle} cor="danger" delay={300} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <ChartCard titulo="Distribuição por Risco" subtitulo="Classificação dos leads ativos">
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {riskDistribution.map(item => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-surface-300">{item.name}</span>
                  <span className="text-sm font-bold text-surface-200 tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Days Without Contact */}
        <ChartCard titulo="Tempo sem Contato" subtitulo="Distribuição dos leads por dias inativos">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={diasDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
              <XAxis dataKey="faixa" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={{ stroke: 'oklch(0.25 0.02 275)' }} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
              />
              <Bar dataKey="quantidade" radius={[8, 8, 0, 0]} fill="oklch(0.75 0.16 80)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Leads Table */}
      <div>
        <h2 className="font-display font-semibold text-surface-100 text-lg mb-4">Todos os Leads</h2>
        <DataTable
          columns={leadsColumns}
          data={leads}
          onRowClick={(lead) => setSelectedLead(lead as Lead)}
        />
      </div>

      <LeadDetailsSlideOver 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}
