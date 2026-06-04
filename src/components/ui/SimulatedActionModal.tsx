import { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Loader2, X } from 'lucide-react';
import type { Recomendacao } from '../../data/mockData';
import { createPortal } from 'react-dom';

interface SimulatedActionModalProps {
  recomendacao: Recomendacao;
  onClose: () => void;
}

export default function SimulatedActionModal({ recomendacao, onClose }: SimulatedActionModalProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence of animations
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-surface-900 border border-surface-700/50 rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Glow effect */}
        {step === 2 && (
          <div className="absolute inset-0 bg-success-500/10 animate-pulse-glow" />
        )}
        
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${step === 2 ? 'bg-success-500/20 text-success-400' : 'bg-primary-500/20 text-primary-400'}`}>
                {step === 2 ? <CheckCircle2 size={24} /> : <Bot size={24} />}
              </div>
              <div>
                <h3 className="font-display font-semibold text-surface-100">Assistente IA</h3>
                <p className="text-xs text-surface-500">Execução de Automação</p>
              </div>
            </div>
            {step === 2 && (
              <button onClick={onClose} className="p-2 text-surface-500 hover:text-surface-300 transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-medium text-surface-200">{recomendacao.titulo}</h4>
            
            <div className="space-y-4">
              {/* Step 1 */}
              <div className={`flex items-center gap-3 transition-opacity duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                {step > 0 ? (
                  <CheckCircle2 size={16} className="text-success-400" />
                ) : (
                  <Loader2 size={16} className="text-primary-400 animate-spin" />
                )}
                <span className={`text-sm ${step > 0 ? 'text-surface-300' : 'text-primary-400 font-medium'}`}>
                  Conectando com CRM e WhatsApp...
                </span>
              </div>

              {/* Step 2 */}
              <div className={`flex items-center gap-3 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                {step > 1 ? (
                  <CheckCircle2 size={16} className="text-success-400" />
                ) : step === 1 ? (
                  <Loader2 size={16} className="text-primary-400 animate-spin" />
                ) : (
                  <div className="w-4" />
                )}
                <span className={`text-sm ${step > 1 ? 'text-surface-300' : step === 1 ? 'text-primary-400 font-medium' : 'text-surface-600'}`}>
                  Preparando mensagens personalizadas...
                </span>
              </div>

              {/* Step 3 */}
              <div className={`flex items-center gap-3 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                {step === 2 && <CheckCircle2 size={16} className="text-success-400" />}
                <span className={`text-sm ${step === 2 ? 'text-success-400 font-medium' : 'text-surface-600'}`}>
                  Automação disparada com sucesso!
                </span>
              </div>
            </div>

            {step === 2 && (
              <div className="mt-8 pt-6 border-t border-surface-800/50 animate-slide-up">
                <p className="text-xs text-center text-surface-400 mb-4">
                  Acompanhe os resultados pelo dashboard nas próximas 24h.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-success-500/20 text-success-400 font-semibold hover:bg-success-500/30 transition-colors"
                >
                  Concluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
