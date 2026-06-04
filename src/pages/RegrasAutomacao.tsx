import { Bot, Zap, Plus, Settings2, Play } from 'lucide-react';
import { regrasData, type RegraAutomacao } from '../data/mockData';
import { useState } from 'react';

export default function RegrasAutomacao() {
  const [regras, setRegras] = useState<RegraAutomacao[]>(regrasData);

  const toggleRegra = (id: string) => {
    setRegras(regras.map(r => r.id === id ? { ...r, ativa: !r.ativa } : r));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-50">Automações Ativas</h1>
          <p className="text-sm text-surface-500 mt-1">Gatilhos configurados para atuar na recuperação de receita</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
          <Plus size={16} />
          Nova Automação
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {regras.map(regra => (
          <div 
            key={regra.id} 
            className={`bg-surface-900 border rounded-2xl p-5 transition-all duration-300 ${
              regra.ativa ? 'border-primary-500/30 shadow-[0_0_20px_rgba(139,92,246,0.05)]' : 'border-surface-800/50 opacity-70'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Info & Toggles */}
              <div className="flex items-start gap-4 md:w-1/4">
                <button 
                  onClick={() => toggleRegra(regra.id)}
                  className={`flex-shrink-0 w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                    regra.ativa ? 'bg-primary-500' : 'bg-surface-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                    regra.ativa ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
                <div>
                  <h3 className="font-display font-semibold text-surface-100">{regra.nome}</h3>
                  <p className="text-xs text-surface-500 mt-1 flex items-center gap-1.5">
                    <Play size={10} className={regra.ativa ? 'text-success-400' : 'text-surface-600'} />
                    {regra.execucoes} execuções mensais
                  </p>
                </div>
              </div>

              {/* Fluxo Visual */}
              <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
                
                {/* Gatilho */}
                <div className="flex-1 bg-surface-950 border border-surface-800 rounded-xl p-3 flex flex-col gap-1 relative overflow-hidden w-full sm:w-auto">
                  <div className="absolute top-0 left-0 w-1 h-full bg-warning-500/50" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500 ml-2">Quando acontecer:</span>
                  <span className="text-sm font-medium text-surface-300 ml-2">{regra.gatilho}</span>
                </div>

                <Settings2 size={16} className="text-surface-700 rotate-90 sm:rotate-0 flex-shrink-0" />

                {/* Condição */}
                <div className="flex-1 bg-surface-950 border border-surface-800 rounded-xl p-3 flex flex-col gap-1 relative overflow-hidden w-full sm:w-auto">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-500/50" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500 ml-2">E a condição for:</span>
                  <span className="text-sm font-medium text-surface-300 ml-2">{regra.condicao}</span>
                </div>

                <Zap size={16} className={`${regra.ativa ? 'text-primary-400' : 'text-surface-700'} rotate-90 sm:rotate-0 flex-shrink-0`} />

                {/* Ação */}
                <div className={`flex-1 border rounded-xl p-3 flex flex-col gap-1 relative overflow-hidden w-full sm:w-auto ${
                  regra.ativa ? 'bg-primary-500/5 border-primary-500/20' : 'bg-surface-950 border-surface-800'
                }`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${regra.ativa ? 'bg-primary-500' : 'bg-surface-700'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ml-2 ${regra.ativa ? 'text-primary-400' : 'text-surface-500'}`}>A IA executa:</span>
                  <span className={`text-sm font-bold ml-2 ${regra.ativa ? 'text-surface-100' : 'text-surface-400'}`}>{regra.acao}</span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Info */}
      <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 flex items-start gap-4">
        <Bot size={24} className="text-primary-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-sm font-bold text-surface-100">Inteligência Operacional</h4>
          <p className="text-sm text-surface-300 mt-1 leading-relaxed">
            O motor de regras processa as automações em tempo real a cada modificação nos leads. 
            No plano atual, você pode criar até 15 fluxos automatizados complexos utilizando variáveis do CRM.
          </p>
        </div>
      </div>
    </div>
  );
}
