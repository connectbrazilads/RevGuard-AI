import type { ReactNode } from 'react';

interface ChartCardProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export default function ChartCard({ titulo, subtitulo, children, className = '', action }: ChartCardProps) {
  return (
    <div className={`rounded-2xl border border-surface-700/50 bg-surface-900/50 backdrop-blur-sm p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-surface-100 text-sm">{titulo}</h3>
          {subtitulo && <p className="text-xs text-surface-500 mt-0.5">{subtitulo}</p>}
        </div>
        {action}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
