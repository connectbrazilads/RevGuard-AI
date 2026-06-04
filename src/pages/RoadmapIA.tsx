import { CheckCircle2, Rocket, Zap, MessageSquare, Database, Calendar, BarChart3 } from 'lucide-react';
import { roadmapItems, type RoadmapItem } from '../data/mockData';

const faseConfig = {
  1: { label: 'Fase 1 — Observação', icon: BarChart3, color: 'from-primary-500 to-primary-400', textColor: 'text-primary-400', borderColor: 'border-primary-500/30', bgColor: 'bg-primary-500/10' },
  2: { label: 'Fase 2 — Predição', icon: Rocket, color: 'from-accent-500 to-accent-400', textColor: 'text-accent-400', borderColor: 'border-accent-500/30', bgColor: 'bg-accent-500/10' },
  3: { label: 'Fase 3 — Automação', icon: Zap, color: 'from-warning-500 to-warning-400', textColor: 'text-warning-400', borderColor: 'border-warning-500/30', bgColor: 'bg-warning-500/10' },
  4: { label: 'Fase 4 — Orquestração Autônoma', icon: Rocket, color: 'from-success-500 to-success-400', textColor: 'text-success-400', borderColor: 'border-success-500/30', bgColor: 'bg-success-500/10' },
};

const statusConfig = {
  ativo: { label: 'Ativo', color: 'bg-success-500/15 text-success-400 border-success-500/20', dot: 'bg-success-400' },
  em_breve: { label: 'Em breve', color: 'bg-accent-500/15 text-accent-400 border-accent-500/20', dot: 'bg-accent-400' },
  futuro: { label: 'Futuro', color: 'bg-surface-700/50 text-surface-400 border-surface-600/30', dot: 'bg-surface-500' },
};

const integrationIcons: Record<string, typeof MessageSquare> = {
  WhatsApp: MessageSquare,
  CRM: Database,
  ERP: Database,
  Agenda: Calendar,
};

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
  const status = statusConfig[item.status];
  const fase = faseConfig[item.fase as keyof typeof faseConfig];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${fase.borderColor} ${fase.bgColor} p-5 transition-all duration-300 ${
        item.status === 'ativo' ? 'hover:scale-[1.02] hover:shadow-lg' : 'opacity-75 hover:opacity-100'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {item.status === 'ativo' && (
        <div className="absolute inset-0 shimmer" />
      )}

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-surface-100 text-sm leading-snug flex-1">{item.titulo}</h3>
          <span className={`flex-shrink-0 ml-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <p className="text-sm text-surface-400 leading-relaxed mb-4">{item.descricao}</p>

        {item.integracoes && item.integracoes.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-surface-600 uppercase tracking-wider">Integrações:</span>
            {item.integracoes.map(int => {
              const Icon = integrationIcons[int] || Database;
              return (
                <span key={int} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-800/50 border border-surface-700/50 text-[10px] text-surface-400">
                  <Icon size={10} />
                  {int}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoadmapIA() {
  const fases = [1, 2, 3, 4] as const;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">Roadmap IA</h1>
        <p className="text-sm text-surface-500 mt-1">Evolução da inteligência artificial — do observatório à orquestração autônoma</p>
      </div>

      {/* Timeline visualization */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {fases.map((fase, i) => {
          const config = faseConfig[fase];
          const FaseIcon = config.icon;
          const isActive = fase === 1;
          return (
            <div key={fase} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                isActive
                  ? `bg-gradient-to-r ${config.color} text-white border-transparent shadow-lg`
                  : `${config.bgColor} ${config.borderColor} ${config.textColor}`
              } transition-all duration-300 whitespace-nowrap`}>
                <FaseIcon size={16} />
                <span className="text-xs font-semibold">{config.label}</span>
                {isActive && <CheckCircle2 size={14} />}
              </div>
              {i < fases.length - 1 && (
                <div className="w-8 h-px bg-surface-700" />
              )}
            </div>
          );
        })}
      </div>

      {/* Phase sections */}
      {fases.map(fase => {
        const config = faseConfig[fase];
        const FaseIcon = config.icon;
        const items = roadmapItems.filter(item => item.fase === fase);

        return (
          <div key={fase}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${config.bgColor}`}>
                <FaseIcon size={18} className={config.textColor} />
              </div>
              <div>
                <h2 className={`font-display font-bold text-base ${config.textColor}`}>{config.label}</h2>
                <p className="text-xs text-surface-500">
                  {items.filter(i => i.status === 'ativo').length > 0 ? `${items.filter(i => i.status === 'ativo').length} funcionalidades ativas` :
                   items.filter(i => i.status === 'em_breve').length > 0 ? 'Próxima fase' : 'Fase futura'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <RoadmapCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        );
      })}

      {/* CTA */}
      <div className="rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 via-surface-900/80 to-accent-600/5 p-6 text-center">
        <h3 className="font-display font-bold text-surface-100 text-lg mb-2">Quer acelerar a evolução?</h3>
        <p className="text-sm text-surface-400 mb-4 max-w-xl mx-auto">
          Nossa equipe pode personalizar o roadmap para as necessidades específicas do seu negócio e acelerar a implementação das fases seguintes.
        </p>
        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300">
          Falar com especialista
        </button>
      </div>
    </div>
  );
}
