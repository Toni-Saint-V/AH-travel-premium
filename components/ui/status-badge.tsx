import { cn } from '@/lib/utils'

type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

interface StatusBadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-bg-2 text-text-mid border-border-hairline',
  accent: 'bg-accent/15 text-accent border-accent/30',
  success: 'bg-success/15 text-success border-success/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  danger: 'bg-danger/15 text-danger border-danger/30',
  info: 'bg-accent-2/15 text-accent-2 border-accent-2/30',
}

const dotStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-text-mid',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-accent-2',
}

export function StatusBadge({ 
  variant = 'neutral', 
  children, 
  className,
  dot = false,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border',
        'text-caption font-medium',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotStyles[variant])} />
      )}
      {children}
    </span>
  )
}

export function StatusDot({ variant = 'neutral' }: { variant?: BadgeVariant }) {
  return (
    <span 
      className={cn(
        'w-2 h-2 rounded-full',
        dotStyles[variant]
      )} 
    />
  )
}
