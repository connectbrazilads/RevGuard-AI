import { useEffect, useRef, useState } from 'react';
import { type LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';

interface KpiCardProps {
  titulo: string;
  valor: number | string;
  formato?: 'moeda' | 'numero' | 'percentual' | 'texto';
  icone: LucideIcon;
  tendencia?: { valor: number; positivo: boolean };
  cor?: 'primary' | 'success' | 'warning' | 'danger' | 'accent';
  delay?: number;
}

function useCountUp(end: number, duration: number = 1200, delay: number = 0) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.floor(eased * end));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        }
      };
      frameRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, delay]);

  return count;
}

const corMap = {
  primary: {
    bg: 'from-primary-600/20 to-primary-500/5',
    icon: 'text-primary-400 bg-primary-500/15',
    border: 'border-primary-500/20',
  },
  success: {
    bg: 'from-success-600/20 to-success-500/5',
    icon: 'text-success-400 bg-success-500/15',
    border: 'border-success-500/20',
  },
  warning: {
    bg: 'from-warning-600/20 to-warning-500/5',
    icon: 'text-warning-400 bg-warning-500/15',
    border: 'border-warning-500/20',
  },
  danger: {
    bg: 'from-danger-600/20 to-danger-500/5',
    icon: 'text-danger-400 bg-danger-500/15',
    border: 'border-danger-500/20',
  },
  accent: {
    bg: 'from-accent-600/20 to-accent-500/5',
    icon: 'text-accent-400 bg-accent-500/15',
    border: 'border-accent-500/20',
  },
};

export default function KpiCard({ titulo, valor, formato = 'moeda', icone: Icone, tendencia, cor = 'primary', delay = 0 }: KpiCardProps) {
  const numericValue = typeof valor === 'number' ? valor : 0;
  const animatedValue = useCountUp(numericValue, 1200, delay);
  const cores = corMap[cor];

  const formatarValor = (v: number | string) => {
    if (formato === 'texto') return String(valor);
    const num = v as number;
    switch (formato) {
      case 'moeda': return formatCurrency(num);
      case 'percentual': return `${num.toFixed(1)}%`;
      case 'numero': return num.toLocaleString('pt-BR');
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl border ${cores.border} bg-gradient-to-br ${cores.bg} p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/5`}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-surface-400 mb-2">{titulo}</p>
          <p className="text-2xl font-bold font-display tabular-nums text-surface-50">
            {formato === 'texto' ? formatarValor(valor) : formatarValor(animatedValue)}
          </p>
          {tendencia && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-xs font-semibold ${tendencia.positivo ? 'text-success-400' : 'text-danger-400'}`}>
                {tendencia.positivo ? '↑' : '↓'} {Math.abs(tendencia.valor)}%
              </span>
              <span className="text-xs text-surface-500">vs. semana anterior</span>
            </div>
          )}
        </div>
        <div className={`flex-shrink-0 rounded-xl p-2.5 ${cores.icon}`}>
          <Icone size={20} />
        </div>
      </div>
    </div>
  );
}
