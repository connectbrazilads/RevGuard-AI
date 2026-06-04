import { Filter, TrendingDown, DollarSign } from 'lucide-react';
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import ChartCard from '../components/ui/ChartCard';
import KpiCard from '../components/ui/KpiCard';
import { funilData, formatCurrency } from '../data/mockData';

export default function PipelineLeakage() {
  const totalLeads = funilData[0].quantidade;
  const convertedLeads = funilData[funilData.length - 1].quantidade;
  const conversaoGeral = (convertedLeads / totalLeads) * 100;
  
  const totalPerdido = funilData.reduce((sum, f) => sum + f.valorPerdido, 0);

  const colors = [
    'oklch(0.52 0.20 20)',   // danger-600
    'oklch(0.62 0.22 20)',   // danger-500
    'oklch(0.65 0.20 220)',  // primary-500
    'oklch(0.70 0.18 150)',  // success-600
    'oklch(0.75 0.16 155)',  // success-500
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Vazamento do Funil</h1>
          <p className="text-sm text-surface-500 mt-1">Diagnóstico visual do funil de vendas</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-800 text-surface-200 text-sm font-medium rounded-xl border border-surface-700 hover:bg-surface-700 transition-colors shadow-sm">
          <Filter size={16} />
          Filtrar Período
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard titulo="Total Entrantes" valor={totalLeads} formato="numero" icone={Filter} cor="primary" delay={0} />
        <KpiCard titulo="Conversão Global" valor={conversaoGeral} formato="percentual" icone={TrendingDown} cor="warning" delay={100} />
        <KpiCard titulo="Receita Perdida no Funil" valor={totalPerdido} icone={DollarSign} cor="danger" delay={200} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico do Funil */}
        <div className="lg:col-span-2">
          <ChartCard titulo="Diagrama de Vazamento" subtitulo="Onde as oportunidades estão se perdendo">
            <ResponsiveContainer width="100%" height={380}>
              <FunnelChart>
                <Tooltip 
                  contentStyle={{ background: 'oklch(0.20 0.02 275)', border: '1px solid oklch(0.30 0.02 275)', borderRadius: '12px', fontSize: '12px', color: 'oklch(0.88 0.01 275)' }}
                  formatter={(value: any) => [`${value} leads`, 'Quantidade']}
                />
                <Funnel
                  dataKey="quantidade"
                  data={funilData}
                  isAnimationActive
                >
                  <LabelList position="right" fill="oklch(0.88 0.01 275)" stroke="none" dataKey="etapa" fontSize={12} fontWeight={600} />
                  <LabelList position="center" fill="#ffffff" stroke="none" dataKey="quantidade" fontSize={14} fontWeight="bold" />
                  {funilData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Breakdown de Perdas */}
        <div className="bg-surface-900 border border-surface-800/50 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="font-display font-semibold text-surface-200 mb-6">Gargalos Críticos</h3>
          
          <div className="space-y-6 flex-1">
            {funilData.map((stage, i) => {
              if (stage.taxaQueda === 0) return null; // pula a primeira etapa se não houver queda anterior
              
              const isGargalo = stage.taxaQueda > 40;
              
              return (
                <div key={i} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-surface-300">{stage.etapa}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isGargalo ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30' : 'bg-surface-800 text-surface-400'}`}>
                      Drop: {stage.taxaQueda}%
                    </span>
                  </div>
                  
                  <div className="h-2 w-full bg-surface-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isGargalo ? 'bg-danger-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-surface-600'}`} 
                      style={{ width: `${stage.taxaQueda}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-surface-500 mt-2 text-right">
                    Prejuízo: <strong className={isGargalo ? 'text-danger-400' : 'text-surface-300'}>{formatCurrency(stage.valorPerdido)}</strong>
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <h4 className="text-sm font-bold text-primary-400 mb-1">Insight da IA</h4>
            <p className="text-xs text-surface-300 leading-relaxed">
              O maior gargalo ocorre na etapa de <strong>Proposta Enviada (53% de perda)</strong>. Isso indica que as propostas estão esfriando. Recomendamos ativar a automação de Follow-up de Proposta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
