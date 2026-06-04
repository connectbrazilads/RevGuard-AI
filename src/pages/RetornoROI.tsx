import { DollarSign, ArrowUpRight, CheckCircle2, Info } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import ChartCard from '../components/ui/ChartCard';
import KpiCard from '../components/ui/KpiCard';
import { roiData, formatCurrency } from '../data/mockData';

export default function RetornoROI() {
  const mesAtual = roiData[roiData.length - 1];
  const totalSalvo = roiData.reduce((sum, d) => sum + d.receitaSalva, 0);
  const totalCusto = roiData.reduce((sum, d) => sum + d.custoSoftware, 0);
  const roiCalculado = ((totalSalvo - totalCusto) / totalCusto) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Retorno sobre Investimento (ROI)</h1>
          <p className="text-sm text-surface-500 mt-1">O impacto financeiro direto da plataforma no seu negócio</p>
        </div>
      </div>

      <div className="bg-primary-500/10 border border-primary-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500/20 blur-[80px] rounded-full" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-surface-300 text-sm font-medium uppercase tracking-wider mb-2">Total Resgatado pela IA (6 meses)</h2>
            <p className="font-display text-5xl font-bold text-surface-50 tabular-nums drop-shadow-md">
              {formatCurrency(totalSalvo)}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-success-400 bg-success-500/10 px-3 py-1 rounded-full text-sm font-bold border border-success-500/20">
                <ArrowUpRight size={16} />
                {roiCalculado.toFixed(0)}% de ROI
              </span>
              <span className="text-surface-400 text-sm flex items-center gap-1.5">
                <Info size={14} />
                Custo total do software: {formatCurrency(totalCusto)}
              </span>
            </div>
          </div>
          <div className="col-span-1 border-l border-surface-700/50 pl-6 flex flex-col justify-center">
            <p className="text-surface-400 text-sm mb-1">Horas Operacionais Poupadas</p>
            <p className="text-3xl font-bold text-surface-200 tabular-nums">455h</p>
            <p className="text-xs text-surface-500 mt-1">Tempo economizado em tarefas manuais</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard titulo="Evolução da Receita Recuperada" subtitulo="Acumulado mês a mês">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={roiData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSalvo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.75 0.16 155)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(0.75 0.16 155)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 275)" vertical={false} />
                <XAxis dataKey="mes" tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis 
                  tickFormatter={(value) => `R$${value/1000}k`}
                  tick={{ fill: 'oklch(0.50 0.02 275)', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', color: 'oklch(0.88 0.01 275)' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Resgatado']}
                />
                <Area 
                  type="monotone" 
                  dataKey="receitaSalva" 
                  stroke="oklch(0.75 0.16 155)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSalvo)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="space-y-4">
          <KpiCard 
            titulo={`Resgate em ${mesAtual.mes}`} 
            valor={mesAtual.receitaSalva} 
            icone={CheckCircle2} 
            cor="success" 
          />
          <KpiCard 
            titulo="Custo Mensal" 
            valor={mesAtual.custoSoftware} 
            icone={DollarSign} 
            cor="primary" 
          />
          <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-surface-200 mb-3">Principais Fontes de Resgate</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-400">Leads Frios (WhatsApp)</span>
                <span className="font-bold text-success-400">42%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-400">Reativação de No-shows</span>
                <span className="font-bold text-success-400">35%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-surface-400">Follow-up de Propostas</span>
                <span className="font-bold text-success-400">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
