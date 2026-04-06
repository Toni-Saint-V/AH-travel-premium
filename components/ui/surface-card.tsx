'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  href?: string
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(
  ({ variant = 'default', padding = 'md', href, className, children, ...props }, ref) => {
    const baseStyles = cn(
      'rounded-xl border border-border-hairline',
      variant === 'default' && 'surface-1',
      variant === 'elevated' && 'surface-2 shadow-[var(--shadow-elev-1)]',
      variant === 'interactive' && 'surface-1 hover:surface-2 transition-fast cursor-pointer active:scale-[0.99]',
      paddingStyles[padding],
      className
    )

    if (href) {
      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      )
    }

    return (
      <div ref={ref} className={baseStyles} {...props}>
        {children}
      </div>
    )
  }
)

SurfaceCard.displayName = 'SurfaceCard'

// Specialized cards
interface ActionCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  href?: string
  onClick?: () => void
  rightElement?: React.ReactNode
  urgency?: 'normal' | 'high'
  className?: string
}

export function ActionCard({
  icon,
  title,
  description,
  href,
  onClick,
  rightElement,
  urgency = 'normal',
  className,
}: ActionCardProps) {
  const Wrapper = href ? Link : 'button'
  const wrapperProps = href ? { href } : { onClick, type: 'button' as const }

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'w-full flex items-center gap-3 p-4 rounded-xl border transition-fast',
        'surface-1 border-border-hairline hover:surface-2',
        'active:scale-[0.99] text-left',
        urgency === 'high' && 'border-accent/30 glow-accent',
        className
      )}
    >
      {icon && (
        <div className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg',
          urgency === 'high' ? 'bg-accent/15 text-accent' : 'bg-bg-2 text-text-mid'
        )}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-label text-text-high truncate">{title}</div>
        {description && (
          <div className="text-caption text-text-mid mt-0.5 line-clamp-2">{description}</div>
        )}
      </div>
      {rightElement}
    </Wrapper>
  )
}
