import { AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';

interface AlertBannerProps {
  valor: number;
  mensagem?: string;
}

export default function AlertBanner({ valor, mensagem }: AlertBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-danger-500/20 bg-gradient-to-r from-danger-600/15 via-danger-500/10 to-warning-500/10 p-5">
      {/* Animated shimmer */}
      <div className="absolute inset-0 shimmer" />
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 h-full w-1/2 bg-danger-500/5 blur-3xl" />
      
      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-danger-500/20 animate-pulse">
            <AlertTriangle size={24} className="text-danger-400" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-danger-400 bg-danger-500/15 rounded-full px-2.5 py-0.5">
              Alerta Executivo
            </span>
          </div>
          <p className="text-surface-200 text-sm leading-relaxed">
            {mensagem || (
              <>
                A empresa possui{' '}
                <span className="font-display font-bold text-danger-300 tabular-nums">{formatCurrency(valor)}</span>
                {' '}em receita potencial não trabalhada.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
