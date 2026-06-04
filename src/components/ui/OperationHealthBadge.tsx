import { Activity } from 'lucide-react';

export default function OperationHealthBadge({ score = 82 }: { score?: number }) {
  // Configuração de cores baseada no score
  let strokeColor = 'oklch(0.75 0.16 155)'; // Verde (success)
  let textColor = 'text-success-400';
  let label = 'Excelente';

  if (score < 60) {
    strokeColor = 'oklch(0.62 0.22 20)'; // Vermelho (danger)
    textColor = 'text-danger-400';
    label = 'Crítico';
  } else if (score < 80) {
    strokeColor = 'oklch(0.75 0.16 80)'; // Amarelo (warning)
    textColor = 'text-warning-400';
    label = 'Atenção';
  }

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4 bg-surface-900 border border-surface-800 rounded-2xl p-3 shadow-lg group relative cursor-help">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Fundo do anel */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="oklch(0.25 0.02 275)"
            strokeWidth="4"
            fill="none"
          />
          {/* Anel de progresso */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={strokeColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className={`absolute text-sm font-bold ${textColor}`}>{score}</span>
      </div>

      <div className="pr-2">
        <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-0.5">Operation Health</p>
        <div className="flex items-center gap-1.5">
          <Activity size={14} className={textColor} />
          <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
        </div>
      </div>

      {/* Tooltip de Detalhamento */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-surface-800 border border-surface-700 rounded-xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <h4 className="text-sm font-bold text-surface-100 mb-3 border-b border-surface-700 pb-2">Critérios do Score</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-surface-400">Conversão Global</span>
            <span className="text-success-400 font-bold">28% (+3pts)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-surface-400">Tempo de Resposta</span>
            <span className="text-warning-400 font-bold">14m (-5pts)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-surface-400">Leads sem Ação (&gt;24h)</span>
            <span className="text-danger-400 font-bold">142 (-12pts)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-surface-400">No-shows previstos</span>
            <span className="text-success-400 font-bold">Baixo (+2pts)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
