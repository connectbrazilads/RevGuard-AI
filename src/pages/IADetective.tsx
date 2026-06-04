import { Search, ArrowDownRight, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { detectiveData, formatCurrency } from '../data/mockData';

export default function IADetective() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Detetive IA</h1>
          <p className="text-sm text-surface-500 mt-1">O que mudou nos últimos 7 dias? Análise de anomalias em tempo real.</p>
        </div>
        <div className="flex items-center gap-2 text-primary-400 bg-primary-500/10 px-4 py-2 rounded-xl border border-primary-500/20">
          <Search size={18} className="animate-pulse" />
          <span className="text-sm font-semibold">Monitorando</span>
        </div>
      </div>

      <div className="space-y-4">
        {detectiveData.map((anomaly) => (
          <div key={anomaly.id} className="bg-surface-900 border border-surface-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
            {/* Linha colorida lateral */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${anomaly.isNegative ? 'bg-danger-500' : 'bg-success-500'}`} />
            
            <div className="pl-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">{anomaly.data}</span>
                  <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    anomaly.isNegative ? 'bg-danger-500/10 text-danger-400' : 'bg-success-500/10 text-success-400'
                  }`}>
                    {anomaly.isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                    {anomaly.metricVariation}
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-surface-100 mb-1">{anomaly.ocorrencia}</h3>
                
                <div className="flex items-start gap-2 mt-4 bg-surface-950 p-3 rounded-xl border border-surface-800/50">
                  <Sparkles size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-surface-400 uppercase tracking-wider block mb-1">Motivo Provável</span>
                    <p className="text-sm text-surface-200">{anomaly.motivoProvavel}</p>
                  </div>
                </div>
              </div>

              <div className="md:w-64 flex flex-col items-start md:items-end md:text-right border-t md:border-t-0 md:border-l border-surface-800 pt-4 md:pt-0 md:pl-6">
                <span className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">Impacto Estimado</span>
                <p className={`font-display text-2xl font-bold tabular-nums ${anomaly.isNegative ? 'text-danger-400' : 'text-success-400'}`}>
                  {anomaly.isNegative ? '-' : '+'}{formatCurrency(anomaly.impactoEstimado)}
                </p>
                <button className="mt-4 w-full md:w-auto px-4 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-semibold rounded-xl transition-colors border border-surface-700">
                  {anomaly.isNegative ? 'Ver Plano de Ação' : 'Replicar Estratégia'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-surface-800/30 border border-surface-700/50 rounded-2xl p-6 text-center">
        <ShieldAlert size={32} className="text-surface-500 mx-auto mb-3" />
        <h4 className="text-surface-200 font-medium mb-1">Nenhuma outra anomalia detectada</h4>
        <p className="text-sm text-surface-500">A IA está monitorando ativamente 42 indicadores operacionais.</p>
      </div>
    </div>
  );
}
