interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

const variantStyles = {
  success: 'bg-success-500/15 text-success-400 border-success-500/20',
  warning: 'bg-warning-500/15 text-warning-400 border-warning-500/20',
  danger: 'bg-danger-500/15 text-danger-400 border-danger-500/20',
  info: 'bg-accent-500/15 text-accent-400 border-accent-500/20',
  neutral: 'bg-surface-700/50 text-surface-400 border-surface-600/30',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

export default function StatusBadge({ status, variant = 'neutral', size = 'sm' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border font-semibold uppercase tracking-wider ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {status}
    </span>
  );
}
