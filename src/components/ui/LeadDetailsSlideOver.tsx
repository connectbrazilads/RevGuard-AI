import { X, MessageCircle, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import type { Lead } from '../../data/mockData';
import { formatCurrency } from '../../data/mockData';
import { createPortal } from 'react-dom';

interface LeadDetailsSlideOverProps {
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadDetailsSlideOver({ lead, onClose }: LeadDetailsSlideOverProps) {
  if (!lead) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-surface-950/40 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface-900 border-l border-surface-700/50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-800/50 bg-surface-950/30">
          <div>
            <h2 className="font-display font-bold text-lg text-surface-50">{lead.nome}</h2>
            <p className="text-sm text-surface-400 mt-1">{lead.interesse}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Top Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-surface-700/50 bg-surface-800/30">
              <p className="text-xs text-surface-500 font-medium">Valor Potencial</p>
              <p className="text-lg font-bold text-surface-200 mt-1">{formatCurrency(lead.valor)}</p>
            </div>
            <div className="p-4 rounded-xl border border-danger-500/20 bg-danger-500/5">
              <p className="text-xs text-danger-400 font-medium">Status de Risco</p>
              <div className="flex items-center gap-1.5 mt-1">
                <AlertCircle size={14} className="text-danger-400" />
                <p className="text-sm font-bold text-danger-400 uppercase tracking-wider">Alto Risco</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <section>
            <h3 className="font-display font-semibold text-surface-200 mb-6 flex items-center gap-2">
              <Clock size={16} className="text-primary-400" />
              Raio-X da Jornada
            </h3>
            
            <div className="relative pl-6 border-l border-surface-700/50 space-y-8 ml-3">
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] bg-surface-900 border border-surface-700 w-6 h-6 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-success-400" />
                </div>
                <p className="text-xs text-surface-500 mb-1">Há 14 dias</p>
                <div className="bg-surface-800/30 border border-surface-700/50 rounded-xl p-3">
                  <p className="text-sm text-surface-200 font-medium">Lead capturado</p>
                  <p className="text-xs text-surface-400 mt-1">Origem: {lead.origem}. Custo de aquisição estimado: R$ 45,00.</p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] bg-surface-900 border border-surface-700 w-6 h-6 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-success-400" />
                </div>
                <p className="text-xs text-surface-500 mb-1">Há 13 dias</p>
                <div className="bg-surface-800/30 border border-surface-700/50 rounded-xl p-3">
                  <p className="text-sm text-surface-200 font-medium">Contato inicial realizado</p>
                  <p className="text-xs text-surface-400 mt-1">Atendimento via WhatsApp. Paciente demonstrou interesse em {lead.interesse}.</p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] bg-surface-900 border border-warning-500/50 w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                  <Clock size={12} className="text-warning-400" />
                </div>
                <p className="text-xs text-warning-400 font-medium mb-1">Há {lead.diasSemContato} dias</p>
                <div className="bg-warning-500/5 border border-warning-500/20 rounded-xl p-3">
                  <p className="text-sm text-warning-400 font-medium">Última interação</p>
                  <p className="text-xs text-surface-400 mt-1">Paciente solicitou proposta de valores, mas a equipe não enviou retorno formal.</p>
                </div>
              </div>

              {/* Event 4 (Current) */}
              <div className="relative">
                <div className="absolute -left-[31px] bg-danger-500 w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
                  <AlertCircle size={12} className="text-white" />
                </div>
                <p className="text-xs text-danger-400 font-bold uppercase tracking-wider mb-1">Hoje</p>
                <div className="bg-danger-500/10 border border-danger-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-danger-500/10 rounded-bl-full blur-xl" />
                  <p className="text-sm text-danger-300 font-semibold flex items-center gap-2">
                    <SparklesIcon />
                    Alerta da IA
                  </p>
                  <p className="text-xs text-surface-300 mt-2 leading-relaxed">
                    Lead marcado como risco alto devido ao tempo sem contato ({lead.diasSemContato} dias). 
                    Probabilidade de perda subiu para 82%. Recomenda-se resgate imediato via WhatsApp.
                  </p>
                </div>
              </div>

            </div>
          </section>
        </div>
        
        {/* Footer Actions */}
        <div className="p-6 border-t border-surface-800/50 bg-surface-950/50 flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl bg-surface-800 text-surface-300 text-sm font-medium hover:bg-surface-700 transition-colors">
            Ignorar
          </button>
          <button className="flex-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
            <MessageCircle size={16} />
            Resgatar Lead
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
