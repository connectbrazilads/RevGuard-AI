import { useState, useEffect } from 'react';
import { Bot, ArrowRight, X, Sparkles } from 'lucide-react';

interface ConselhoIA {
  id: string;
  texto: string;
  acao: string;
  prioridade: 'critica' | 'alta' | 'media';
}

interface AdvisorBlockProps {
  conselhos: ConselhoIA[];
}

function useTypewriter(text: string, speed: number = 20, startDelay: number = 300) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsComplete(false);
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

export default function AdvisorBlock({ conselhos }: AdvisorBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visibleConselhos = conselhos.filter(c => !dismissed.has(c.id));
  const current = visibleConselhos[activeIndex % visibleConselhos.length];
  const { displayed, isComplete } = useTypewriter(current?.texto ?? '', 18, 500);

  if (!current) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-600/10 via-surface-900/80 to-accent-600/5 p-6">
      {/* Animated background glow */}
      <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl animate-float" />
      <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-accent-500/8 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25">
              <Bot size={20} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success-400 border-2 border-surface-900 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-surface-100 text-base">Se eu fosse você</h3>
              <Sparkles size={14} className="text-primary-400" />
            </div>
            <p className="text-xs text-surface-500">Conselho de IA • Prioridade {current.prioridade}</p>
          </div>
          <button
            onClick={() => {
              setDismissed(prev => new Set(prev).add(current.id));
              setActiveIndex(0);
            }}
            className="p-1.5 rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800/50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Advice text */}
        <div className="bg-surface-900/40 rounded-xl p-4 mb-4 min-h-[80px]">
          <p className="text-sm text-surface-200 leading-relaxed">
            {displayed}
            {!isComplete && <span className="inline-block w-0.5 h-4 bg-primary-400 ml-0.5 animate-pulse" />}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {visibleConselhos.length > 1 && visibleConselhos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex % visibleConselhos.length
                    ? 'bg-primary-400 w-6'
                    : 'bg-surface-600 hover:bg-surface-500'
                }`}
              />
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500/15 text-primary-300 text-sm font-medium hover:bg-primary-500/25 transition-all duration-200 hover:gap-3">
            {current.acao}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
