import { useState, useEffect } from 'react';
import { X, Copy, CheckCircle2, FileText, Send } from 'lucide-react';
import { formatCurrency, kpis } from '../../data/mockData';
import { createPortal } from 'react-dom';

interface ExecutiveBriefingModalProps {
  onClose: () => void;
}

function useTypewriter(text: string, speed: number = 10, startDelay: number = 300) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, isComplete };
}

export default function ExecutiveBriefingModal({ onClose }: ExecutiveBriefingModalProps) {
  const [copied, setCopied] = useState(false);

  const briefingText = `*Resumo Executivo Diário - Operations Intelligence* 📊

*Receita em Risco Hoje:* ${formatCurrency(kpis.receitaEmRisco)}
*Potencial Recuperável:* ${formatCurrency(kpis.receitaRecuperavel)}

⚠️ *Fogo Crítico:*
• ${kpis.slaEstourado} SLAs estouraram nas últimas 24h
• ${kpis.leadsEmRisco} leads de alto valor sem nenhum follow-up

🤖 *Ação Recomendada pela IA:*
"Se eu fosse você, começaria recuperando os 37 leads de alto valor sem follow-up na Unidade Norte. O impacto imediato estimado é de R$ 32.400."

Deseja que eu ative a automação de resgate via WhatsApp para esses leads?`;

  const { displayed, isComplete } = useTypewriter(briefingText, 15, 500);

  const handleCopy = () => {
    navigator.clipboard.writeText(briefingText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface-950/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-surface-900 border border-surface-700/50 rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-800/50 bg-gradient-to-r from-primary-600/10 to-accent-600/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg text-surface-50">Briefing Executivo</h2>
              <p className="text-xs text-surface-400">Pronto para envio ao CEO</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800/50 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content (Terminal / Chat style) */}
        <div className="p-6 bg-surface-950 flex-1 min-h-[300px]">
          <div className="bg-surface-900 border border-surface-800/50 rounded-xl p-5 relative font-mono text-sm leading-relaxed text-surface-300 whitespace-pre-wrap">
            {displayed}
            {!isComplete && <span className="inline-block w-2 h-4 bg-primary-400 ml-1 animate-pulse" />}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-surface-800/50 bg-surface-900 flex items-center gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-surface-400 hover:text-surface-200 transition-colors">
            Cancelar
          </button>
          
          <button 
            disabled={!isComplete}
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isComplete 
                ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25' 
                : 'bg-surface-800 text-surface-500 cursor-not-allowed'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle2 size={16} />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copiar p/ WhatsApp
              </>
            )}
          </button>
          
          {isComplete && (
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-success-500 text-white text-sm font-semibold hover:bg-success-600 transition-all duration-300 shadow-lg shadow-success-500/25">
              <Send size={16} />
              Enviar Direto
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
