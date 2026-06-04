import { Clock, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import KpiCard from '../components/ui/KpiCard';
import DataTable from '../components/ui/DataTable';
import ChartCard from '../components/ui/ChartCard';
import ProgressRing from '../components/ui/ProgressRing';
import StatusBadge from '../components/ui/StatusBadge';
import type { Column } from '../components/ui/DataTable';
import { slaRecords, unidades, slaTrend, formatMinutes, type SLARecord } from '../data/mockData';

const slaCompliance = Math.round((slaRecords.filter(s => !s.estourado).length / slaRecords.length) * 100);
const avgResponse = Math.round(slaRecords.reduce((sum, s) => sum + s.tempoResposta, 0) / slaRecords.length);
const breachesToday = slaRecords.filter(s => s.estourado && s.data >= '2026-06-01').length;
const worstUnit = unidades.reduce((worst, u) => u.slaCompliance < worst.slaCompliance ? u : worst, unidades[0]);

const tipoLabel = (tipo: string) => {
  switch (tipo) {
    case 'primeiro_contato': return 'Primeiro contato';
    case 'retorno': return 'Retorno';
    case 'proposta': return 'Proposta';
    case 'agendamento': return 'Agendamento';
    default: return tipo;
  }
};

const slaColumns: Column<SLARecord>[] = [
  { key: 'cliente', label: 'Cliente', sortable: true },
  { key: 'tipo', label: 'Tipo', sortable: true, render: (item) => (
    <span className="text-surface-300">{tipoLabel(item.tipo)}</span>
  )},
  { key: 'unidade', label: 'Unidade', sortable: true },
  { key: 'tempoResposta', label: 'Tempo', sortable: true, className: 'text-right tabular-nums', render: (item) => (
    <span className={`font-semibold ${item.estourado ? 'text-danger-400' : 'text-success-400'}`}>
      {formatMinutes(item.tempoResposta)}
    </span>
  )},
  { key: 'slaAlvo', label: 'SLA Alvo', className: 'text-right tabular-nums', render: (item) => (
    <span className="text-surface-500">{formatMinutes(item.slaAlvo)}</span>
  )},
  { key: 'estourado', label: 'Status', render: (item) => (
    <StatusBadge
      status={item.estourado ? 'Estourado' : 'No prazo'}
      variant={item.estourado ? 'danger' : 'success'}
    />
  )},
  { key: 'atendente', label: 'Atendente', sortable: true },
  { key: 'data', label: 'Data', sortable: true },
];

const barColors = ['oklch(0.68 0.19 155)', 'oklch(0.62 0.22 20)', 'oklch(0.75 0.16 80)'];

export default function SLA() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">SLA</h1>
        <p className="text-sm text-surface-500 mt-1">Monitoramento de acordos de nível de serviço</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard titulo="Compliance SLA" valor={slaCompliance} formato="percentual" icone={CheckCircle2} cor={slaCompliance >= 70 ? 'success' : 'danger'} delay={0} />
        <KpiCard titulo="Tempo Médio Resposta" valor={avgResponse} formato="numero" icone={Clock} cor="warning" delay={100} />
        <KpiCard titulo="Estouros (últimos 3d)" valor={breachesToday} formato="numero" icone={AlertTriangle} cor="danger" delay={200} />
        <KpiCard titulo="Pior Unidade" valor={worstUnit.slaCompliance} formato="percentual" icone={Building2} cor="danger" delay={300} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Trend */}
        <ChartCard titulo="Tendência SLA" subtitulo="Compliance % nos últimos 8 dias" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={slaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
              <XAxis dataKey="data" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={{ stroke: 'oklch(0.25 0.02 275)' }} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                formatter={(value) => [`${value}%`, 'Compliance']}
              />
              <Line type="monotone" dataKey="valor" stroke="oklch(0.55 0.22 275)" strokeWidth={2} dot={{ fill: 'oklch(0.55 0.22 275)', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* SLA by Unit */}
        <ChartCard titulo="SLA por Unidade" subtitulo="Compliance atual">
          <div className="flex items-center justify-around py-4">
            {unidades.map((u, i) => (
              <ProgressRing
                key={u.nome}
                valor={u.slaCompliance}
                tamanho={90}
                espessura={7}
                cor={barColors[i]}
                label={u.nome}
                delay={i * 200}
              />
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Response Time by Unit */}
      <ChartCard titulo="Comparativo de Unidades" subtitulo="Taxa de conversão e compliance SLA">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={unidades}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" />
            <XAxis dataKey="nome" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={{ stroke: 'oklch(0.25 0.02 275)' }} tickLine={false} />
            <YAxis tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
            />
            <Bar dataKey="conversao" name="Conversão" radius={[8, 8, 0, 0]}>
              {unidades.map((_, i) => (
                <Cell key={i} fill={barColors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* SLA Records Table */}
      <div>
        <h2 className="font-display font-semibold text-surface-100 text-lg mb-4">Registros de SLA</h2>
        <DataTable
          columns={slaColumns}
          data={slaRecords}
        />
      </div>
    </div>
  );
}
