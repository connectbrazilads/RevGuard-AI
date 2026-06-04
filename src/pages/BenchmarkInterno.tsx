import { Building2, Trophy } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import ChartCard from '../components/ui/ChartCard';
import { benchmarkData, formatCurrency } from '../data/mockData';

export default function BenchmarkInterno() {
  const topUnit = [...benchmarkData].sort((a, b) => b.conversao - a.conversao)[0];
  const lowestUnit = [...benchmarkData].sort((a, b) => a.conversao - b.conversao)[0];
  
  // Calculate potential revenue if lowest unit matched top unit conversion
  const potentialExtraRevenue = (lowestUnit.leadsProcessados * (topUnit.conversao / 100) * (lowestUnit.receitaGerada / (lowestUnit.leadsProcessados * (lowestUnit.conversao / 100)))) - lowestUnit.receitaGerada;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Benchmark Interno</h1>
          <p className="text-sm text-surface-500 mt-1">Comparativo de performance entre filiais/equipes</p>
        </div>
      </div>

      <div className="bg-primary-500/10 border border-primary-500/20 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center">
        <div className="p-4 bg-primary-500/20 rounded-full text-primary-400">
          <Trophy size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg font-display font-bold text-surface-100 mb-1">Oportunidade Oculta Identificada</h2>
          <p className="text-sm text-surface-300 leading-relaxed">
            Se a <strong className="text-surface-100">{lowestUnit.nome}</strong> performasse com a mesma taxa de conversão da <strong className="text-surface-100">{topUnit.nome} ({topUnit.conversao}%)</strong>, 
            a receita aumentaria em <strong className="text-success-400 font-bold">{formatCurrency(potentialExtraRevenue)}/mês</strong>.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <button className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-500/25">
            Gerar Plano de Nivelamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard titulo="Taxa de Conversão por Unidade" subtitulo="Qual unidade fecha mais negócios?">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={benchmarkData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" vertical={false} />
              <XAxis dataKey="nome" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(val) => `${val}%`} tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'oklch(0.25 0.02 275 / 0.5)' }}
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', color: 'oklch(0.88 0.01 275)' }}
                formatter={(value: any) => [`${value}%`, 'Conversão']}
              />
              <Bar dataKey="conversao" radius={[6, 6, 0, 0]}>
                {benchmarkData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.id === topUnit.id ? 'oklch(0.65 0.20 220)' : 'oklch(0.35 0.05 275)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Aderência ao SLA" subtitulo="Quem atende mais rápido?">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={benchmarkData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" vertical={false} />
              <XAxis dataKey="nome" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(val) => `${val}%`} tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'oklch(0.25 0.02 275 / 0.5)' }}
                contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', color: 'oklch(0.88 0.01 275)' }}
                formatter={(value: any) => [`${value}%`, 'SLA Cumprido']}
              />
              <Bar dataKey="sla" radius={[6, 6, 0, 0]}>
                {benchmarkData.map((entry, index) => {
                  let color = 'oklch(0.75 0.16 155)'; // success
                  if (entry.sla < 60) color = 'oklch(0.62 0.22 20)'; // danger
                  else if (entry.sla < 80) color = 'oklch(0.75 0.16 80)'; // warning
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      <div className="bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-surface-800 flex items-center justify-between">
          <h2 className="font-display font-semibold text-surface-100 text-lg">Tabela Comparativa Geral</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-800/50 text-surface-400 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Unidade</th>
                <th className="px-6 py-4 text-right">Leads Processados</th>
                <th className="px-6 py-4 text-right">SLA</th>
                <th className="px-6 py-4 text-right">Conversão</th>
                <th className="px-6 py-4 text-right">Receita Gerada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800">
              {benchmarkData.map(unidade => (
                <tr key={unidade.id} className="hover:bg-surface-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-surface-200 flex items-center gap-2">
                    <Building2 size={16} className="text-surface-500" />
                    {unidade.nome}
                    {unidade.id === topUnit.id && <span className="ml-2 text-[10px] bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Top 1</span>}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums">{unidade.leadsProcessados}</td>
                  <td className="px-6 py-4 text-right tabular-nums">
                    <span className={unidade.sla >= 80 ? 'text-success-400' : unidade.sla < 60 ? 'text-danger-400' : 'text-warning-400'}>
                      {unidade.sla}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums font-semibold">{unidade.conversao}%</td>
                  <td className="px-6 py-4 text-right tabular-nums font-bold text-surface-100">{formatCurrency(unidade.receitaGerada)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
