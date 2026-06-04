import { Zap, AlertTriangle, CheckCircle2, Info, BrainCircuit } from 'lucide-react';
import { activityLogData } from '../../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
  '⚡': <Zap size={14} />,
  '🤖': <BrainCircuit size={14} />,
  '⚠️': <AlertTriangle size={14} />,
  '💰': <CheckCircle2 size={14} />,
  '🧠': <BrainCircuit size={14} />,
  '📊': <Info size={14} />,
};

const colorMap = {
  alerta: 'text-warning-400 bg-warning-500/10 border-warning-500/20',
  perigo: 'text-danger-400 bg-danger-500/10 border-danger-500/20',
  sucesso: 'text-success-400 bg-success-500/10 border-success-500/20',
  info: 'text-primary-400 bg-primary-500/10 border-primary-500/20',
};

export default function ActivityLog() {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-surface-700/50 bg-surface-900/50 backdrop-blur-sm overflow-hidden">
      <div className="p-4 border-b border-surface-800/50 flex items-center justify-between bg-surface-950/30">
        <h3 className="font-display font-semibold text-surface-100 text-sm flex items-center gap-2">
          <div className="relative">
            <BrainCircuit size={16} className="text-primary-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-success-400 border border-surface-900 animate-pulse" />
          </div>
          Live Activity Feed
        </h3>
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-success-400 bg-success-500/10 px-2 py-0.5 rounded-full border border-success-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-ping mr-1" />
          Monitorando
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {/* Continuous background line */}
        <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-surface-700 via-surface-700/50 to-transparent" />
        
        {activityLogData.map((log, i) => {
          const colors = colorMap[log.tipo as keyof typeof colorMap];
          
          return (
            <div key={log.id} className="relative flex gap-4 animate-slide-up" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
              <div className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${colors} shadow-sm backdrop-blur-md`}>
                {iconMap[log.icon]}
              </div>
              <div className="flex-1 pt-0.5 pb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-surface-200">{log.titulo}</span>
                  <span className="text-[10px] text-surface-500 font-medium">{log.tempo}</span>
                </div>
                <p className="text-xs text-surface-400 leading-relaxed">{log.descricao}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
