import { ArrowRight, Zap, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { recomendacoes, formatCurrency, type Recomendacao } from '../data/mockData';
import AdvisorBlock from '../components/ui/AdvisorBlock';
import SimulatedActionModal from '../components/ui/SimulatedActionModal';
import { conselhosIA } from '../data/mockData';
import { useState } from 'react';

const categoriaConfig = {
  recuperacao: { label: 'Recuperação', icon: TrendingUp, color: 'text-success-400', bg: 'bg-success-500/10 border-success-500/20' },
  prevencao: { label: 'Prevenção', icon: Shield, color: 'text-accent-400', bg: 'bg-accent-500/10 border-accent-500/20' },
  otimizacao: { label: 'Otimização', icon: Zap, color: 'text-warning-400', bg: 'bg-warning-500/10 border-warning-500/20' },
};

const esforcoConfig = {
  baixo: { label: 'Baixo esforço', color: 'text-success-400 bg-success-500/10' },
  medio: { label: 'Médio esforço', color: 'text-warning-400 bg-warning-500/10' },
  alto: { label: 'Alto esforço', color: 'text-danger-400 bg-danger-500/10' },
};

function RecomendacaoCard({ rec, index, onApply }: { rec: Recomendacao; index: number; onApply: (rec: Recomendacao) => void }) {
  const cat = categoriaConfig[rec.categoria];
  const esf = esforcoConfig[rec.esforco];
  const CatIcon = cat.icon;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${cat.bg} p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary-500/5 blur-3xl transition-all duration-500 group-hover:bg-primary-500/10" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 p-2 rounded-xl ${cat.bg}`}>
            <CatIcon size={18} className={cat.color} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-surface-100 text-sm leading-snug">{rec.titulo}</h3>
            <p className="text-xs text-surface-500 mt-0.5">{cat.label}</p>
          </div>
          <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${esf.color}`}>
            {esf.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-surface-400 leading-relaxed mb-3">{rec.descricao}</p>

        {/* Rationale */}
        <div className="bg-surface-900/40 rounded-xl p-3 mb-4">
          <p className="text-xs text-surface-500 leading-relaxed">
            <span className="font-semibold text-surface-400">Racional: </span>
            {rec.racional}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-surface-500">Impacto estimado: </span>
            <span className="font-display font-bold text-primary-300 tabular-nums">{formatCurrency(rec.impactoEstimado)}</span>
          </div>
          <button 
            onClick={() => onApply(rec)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/15 text-primary-300 text-xs font-medium hover:bg-primary-500/25 transition-all duration-200 hover:gap-3"
          >
            Executar Automação
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecomendacoesIA() {
  const [selectedRec, setSelectedRec] = useState<Recomendacao | null>(null);
  const totalImpacto = recomendacoes.reduce((s, r) => s + r.impactoEstimado, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50 flex items-center gap-3">
          Recomendações IA
          <Sparkles size={20} className="text-primary-400" />
        </h1>
        <p className="text-sm text-surface-500 mt-1">Ações sugeridas pela inteligência artificial para maximizar receita</p>
      </div>

      {/* Impact summary */}
      <div className="rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-accent-600/5 p-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/15 animate-pulse-glow">
            <Sparkles size={24} className="text-primary-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-surface-400">Impacto total estimado se todas as recomendações forem aplicadas:</p>
            <p className="font-display text-2xl font-bold text-gradient">{formatCurrency(totalImpacto)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-surface-500">{recomendacoes.length} recomendações</p>
            <p className="text-xs text-surface-500">{recomendacoes.filter(r => r.esforco === 'baixo').length} de baixo esforço</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      {(['recuperacao', 'otimizacao', 'prevencao'] as const).map(cat => {
        const catRecs = recomendacoes.filter(r => r.categoria === cat);
        if (catRecs.length === 0) return null;
        const config = categoriaConfig[cat];
        return (
          <div key={cat}>
            <h2 className="font-display font-semibold text-surface-200 text-base mb-4 flex items-center gap-2">
              <config.icon size={16} className={config.color} />
              {config.label}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {catRecs.map((rec, i) => (
                <RecomendacaoCard key={rec.id} rec={rec} index={i} onApply={setSelectedRec} />
              ))}
            </div>
          </div>
        );
      })}

      {/* AI Advisor */}
      <AdvisorBlock conselhos={conselhosIA} />

      {/* Simulated Action Modal */}
      {selectedRec && (
        <SimulatedActionModal
          recomendacao={selectedRec}
          onClose={() => setSelectedRec(null)}
        />
      )}
    </div>
  );
}
