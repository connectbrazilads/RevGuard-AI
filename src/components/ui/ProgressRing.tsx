import { useEffect, useRef, useState } from 'react';

interface ProgressRingProps {
  valor: number; // 0-100
  tamanho?: number;
  espessura?: number;
  cor?: string;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export default function ProgressRing({
  valor,
  tamanho = 100,
  espessura = 8,
  cor = 'var(--color-primary-400)',
  label,
  sublabel,
  delay = 0,
}: ProgressRingProps) {
  const [animated, setAnimated] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  const raio = (tamanho - espessura) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia - (animated / 100) * circunferencia;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1200;
      const startTime = Date.now();
      const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimated(eased * valor);
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
  }, [valor, delay]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: tamanho, height: tamanho }}>
        <svg className="transform -rotate-90" width={tamanho} height={tamanho}>
          {/* Background circle */}
          <circle
            cx={tamanho / 2}
            cy={tamanho / 2}
            r={raio}
            fill="none"
            stroke="oklch(0.25 0.02 275)"
            strokeWidth={espessura}
          />
          {/* Progress circle */}
          <circle
            cx={tamanho / 2}
            cy={tamanho / 2}
            r={raio}
            fill="none"
            stroke={cor}
            strokeWidth={espessura}
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
            className="transition-all duration-100"
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-surface-100 tabular-nums" style={{ fontSize: tamanho * 0.22 }}>
            {Math.round(animated)}%
          </span>
        </div>
      </div>
      {label && <p className="text-xs font-medium text-surface-300 text-center">{label}</p>}
      {sublabel && <p className="text-[10px] text-surface-500 text-center">{sublabel}</p>}
    </div>
  );
}
