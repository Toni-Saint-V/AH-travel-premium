import { FileCheck, Calendar, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickStatsProps {
  stats: {
    documentsReady: number
    documentsTotal: number
    daysUntilTrip: number
    applicationProgress: number
  }
}

export function QuickStats({ stats }: QuickStatsProps) {
  const items = [
    {
      icon: FileCheck,
      label: 'Документы',
      value: `${stats.documentsReady}/${stats.documentsTotal}`,
      color: stats.documentsReady === stats.documentsTotal ? 'text-success' : 'text-accent',
    },
    {
      icon: Calendar,
      label: 'До поездки',
      value: `${stats.daysUntilTrip} дн.`,
      color: stats.daysUntilTrip < 30 ? 'text-warning' : 'text-text-high',
    },
    {
      icon: TrendingUp,
      label: 'Прогресс',
      value: `${stats.applicationProgress}%`,
      color: 'text-accent',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className="surface-1 rounded-xl p-3 border border-border-hairline"
          >
            <Icon className={cn('w-5 h-5 mb-2', item.color)} />
            <div className={cn('text-h3', item.color)}>{item.value}</div>
            <div className="text-caption text-text-low mt-0.5">{item.label}</div>
          </div>
        )
      })}
    </div>
  )
}
