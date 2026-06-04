import { formatCurrency } from '../../data/mockData';
import type { Insight } from '../../data/mockData';

interface InsightCardProps {
  insight: Insight;
  index?: number;
}

const prioridadeCor = {
  critica: 'border-danger-500/30 bg-danger-500/5',
  alta: 'border-warning-500/30 bg-warning-500/5',
  media: 'border-accent-500/30 bg-accent-500/5',
};

const prioridadeBadge = {
  critica: 'bg-danger-500/20 text-danger-400',
  alta: 'bg-warning-500/20 text-warning-400',
  media: 'bg-accent-500/20 text-accent-400',
};

export default function InsightCard({ insight, index = 0 }: InsightCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${prioridadeCor[insight.prioridade]} p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary-500/5 blur-3xl transition-all duration-500 group-hover:bg-primary-500/10" />
      
      <div className="relative">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl" role="img">{insight.emoji}</span>
          <div className="flex-1">
            <h3 className="font-semibold text-surface-100 text-sm leading-snug">{insight.titulo}</h3>
          </div>
          <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${prioridadeBadge[insight.prioridade]}`}>
            {insight.prioridade}
          </span>
        </div>
        
        <p className="text-sm text-surface-400 leading-relaxed mb-4">{insight.descricao}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-500">Impacto estimado:</span>
            <span className="font-display font-bold text-primary-300 tabular-nums">{formatCurrency(insight.impacto)}</span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-surface-500 bg-surface-800/50 rounded-full px-2 py-0.5">
            {insight.categoria}
          </span>
        </div>
      </div>
    </div>
  );
}
