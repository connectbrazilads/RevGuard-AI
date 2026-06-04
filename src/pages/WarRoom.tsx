import { AlertTriangle, ArrowUpRight, Zap, Target, ShieldAlert } from 'lucide-react';
import { warRoomData, formatCurrency } from '../data/mockData';

export default function WarRoom() {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-danger-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger-500"></span>
            </span>
            <span className="text-danger-400 font-bold uppercase tracking-wider text-xs">Atenção Máxima</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-surface-50">Centro de Crise</h1>
          <p className="text-sm text-surface-400 mt-1">Visão emergencial e plano de contingência diário</p>
        </div>
      </div>

      <div className="bg-danger-500/10 border border-danger-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.1)]">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-danger-500/20 blur-[80px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="flex items-center gap-2 text-danger-400 font-bold text-sm uppercase tracking-wider mb-2">
              <AlertTriangle size={18} />
              Receita em Risco Hoje
            </h2>
            <p className="font-display text-6xl font-bold text-white drop-shadow-md tabular-nums tracking-tight">
              {formatCurrency(warRoomData.receitaEmRiscoHoje)}
            </p>
            <p className="text-surface-300 mt-3 text-sm">
              Impacto imediato projetado caso nenhuma ação seja tomada até o fim do expediente.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Principais Causas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="text-surface-400" size={20} />
            <h3 className="font-display text-xl font-bold text-surface-100">Causas Raiz (Gargalos)</h3>
          </div>
          
          <div className="bg-surface-900 border border-surface-800 rounded-2xl p-2 flex flex-col gap-2 shadow-xl">
            {warRoomData.causas.map(causa => (
              <div key={causa.id} className="flex items-center justify-between p-4 bg-surface-950 rounded-xl border border-surface-800/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${causa.prioridade === 'alta' ? 'bg-danger-500' : 'bg-warning-500'}`} />
                  <span className="text-surface-200 font-medium">{causa.descricao}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xl text-surface-50 tabular-nums">{causa.quantidade}</span>
                  <span className="text-xs text-surface-500 uppercase font-bold tracking-wider">Ocorrências</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impacto por Ação */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-primary-400" size={20} />
            <h3 className="font-display text-xl font-bold text-surface-100">Impacto Potencial por Ação</h3>
          </div>

          <div className="space-y-4">
            {warRoomData.acoes.map((acao) => (
              <div key={acao.id} className="group bg-surface-900 hover:bg-surface-800 transition-colors duration-300 border border-surface-800 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-success-500/50 group-hover:bg-success-500 transition-colors" />
                
                <div className="pl-3">
                  <h4 className="font-display font-bold text-surface-100 text-lg">{acao.acao}</h4>
                  <p className="text-xs text-surface-500 uppercase tracking-wider font-bold mt-1">Alavancagem: {acao.risco}</p>
                </div>
                
                <div className="flex items-center gap-4 pl-3 sm:pl-0 border-t sm:border-t-0 border-surface-800 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="flex items-center gap-1 text-success-400 font-bold text-lg tabular-nums">
                      <ArrowUpRight size={18} />
                      {formatCurrency(acao.impactoEstimado)}
                    </span>
                    <span className="text-xs text-surface-500">Recuperação Estimada</span>
                  </div>
                  <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-800 group-hover:bg-primary-500 text-surface-400 group-hover:text-white transition-all shadow-sm">
                    <Zap size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
