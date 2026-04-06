import Link from 'next/link'
import { FileText, CreditCard, BarChart3, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const quickLinks = [
  {
    href: '/app/documents',
    icon: FileText,
    label: 'Документы',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    href: '/app/checkout',
    icon: CreditCard,
    label: 'Оплата',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    href: '/app/result',
    icon: BarChart3,
    label: 'Оценка',
    color: 'text-accent-2',
    bgColor: 'bg-accent-2/10',
  },
  {
    href: '/app/profile',
    icon: HelpCircle,
    label: 'Профиль',
    color: 'text-text-mid',
    bgColor: 'bg-bg-2',
  },
]

export function JourneyQuickLinks() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {quickLinks.map((link) => {
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-xl',
              'surface-1 border border-border-hairline',
              'hover:surface-2 transition-fast',
              'active:scale-[0.97]'
            )}
          >
            <div className={cn(
              'flex items-center justify-center w-10 h-10 rounded-lg',
              link.bgColor
            )}>
              <Icon className={cn('w-5 h-5', link.color)} />
            </div>
            <span className="text-caption text-text-mid">{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
