import { TrendingUp, AlertTriangle, Crosshair, BarChart3 } from 'lucide-react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import ChartCard from '../components/ui/ChartCard';
import KpiCard from '../components/ui/KpiCard';
import { forecastData, forecastMetrics, formatCurrency } from '../data/mockData';

export default function RevenueForecast() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Previsão de Receita</h1>
          <p className="text-sm text-surface-500 mt-1">Previsibilidade de receita para os próximos 30 dias</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          titulo="Oportunidade (Cenário Otimista)"
          valor={forecastMetrics.oportunidade}
          icone={TrendingUp}
          cor="success"
          delay={0}
        />
        <KpiCard
          titulo="Meta Provável (Base)"
          valor={forecastMetrics.metaProvavel}
          icone={Crosshair}
          cor="primary"
          delay={100}
        />
        <KpiCard
          titulo="Risco (Cenário Pessimista)"
          valor={forecastMetrics.risco}
          icone={AlertTriangle}
          cor="danger"
          delay={200}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard titulo="Projeção de Receita Mensal" subtitulo="Realizado (Sólido) vs Projetado (Tracejado)">
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={forecastData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOtimista" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.75 0.16 155)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="oklch(0.75 0.16 155)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" vertical={false} />
                <XAxis 
                  dataKey="data" 
                  tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(val) => val.replace('Dia ', '')}
                />
                <YAxis 
                  tickFormatter={(value) => `R$${value/1000}k`}
                  tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                  formatter={(value: any, name: any) => [
                    formatCurrency(Number(value)), 
                    name === 'realizado' ? 'Realizado' : name === 'projetadoBase' ? 'Projeção Base' : name === 'projetadoOtimista' ? 'Otimista' : 'Pessimista'
                  ]}
                  labelStyle={{ color: 'oklch(0.60 0.02 275)', marginBottom: '4px' }}
                />
                {/* Linha do Realizado (Passado) */}
                <Line 
                  type="monotone" 
                  dataKey="realizado" 
                  stroke="oklch(0.65 0.20 220)" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: 'oklch(0.65 0.20 220)' }}
                />
                
                {/* Área Otimista (Futuro) */}
                <Area 
                  type="monotone" 
                  dataKey="projetadoOtimista" 
                  stroke="none" 
                  fill="url(#colorOtimista)" 
                />
                
                {/* Linha Projeção Base (Futuro tracejado) */}
                <Line 
                  type="monotone" 
                  dataKey="projetadoBase" 
                  stroke="oklch(0.65 0.20 220)" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                  dot={false}
                />
                
                {/* Linha Pessimista */}
                <Line 
                  type="monotone" 
                  dataKey="projetadoPessimista" 
                  stroke="oklch(0.62 0.22 20)" 
                  strokeWidth={1} 
                  strokeDasharray="3 3"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Insight Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
              <BarChart3 size={24} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-surface-100">Leitura da IA</h3>
              <p className="text-xs text-surface-500">Análise de Tendência</p>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            <p className="text-sm text-surface-300 leading-relaxed">
              O ritmo atual de conversão (22%) aponta para um fechamento em <strong className="text-surface-100">{formatCurrency(forecastMetrics.metaProvavel)}</strong>.
            </p>
            <div className="p-4 rounded-xl border border-success-500/20 bg-success-500/5">
              <h4 className="text-xs font-bold text-success-400 uppercase tracking-wider mb-2">Para bater o Otimista:</h4>
              <ul className="text-sm text-surface-300 space-y-2 list-disc list-inside">
                <li>Reduzir o tempo de resposta médio para abaixo de 10 min.</li>
                <li>Recuperar 30% dos leads marcados como "Em Risco" esta semana.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-danger-500/20 bg-danger-500/5">
              <h4 className="text-xs font-bold text-danger-400 uppercase tracking-wider mb-2">Risco Iminente:</h4>
              <p className="text-sm text-surface-300">
                A queda recente no envio de propostas (Pipeline Leakage) pode empurrar o faturamento para o cenário de {formatCurrency(forecastMetrics.risco)}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
