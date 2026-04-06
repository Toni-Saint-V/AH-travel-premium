import { Users, CheckCircle, Clock, Shield } from 'lucide-react'

const stats = [
  { icon: Users, value: '12 000+', label: 'заявок обработано' },
  { icon: CheckCircle, value: '94%', label: 'одобрено' },
  { icon: Clock, value: '< 2 мин', label: 'на оценку' },
]

export function TrustStrip() {
  return (
    <section className="py-8 px-4 border-y border-border-hairline surface-1">
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-h3 text-text-high">{stat.value}</div>
                <div className="text-caption text-text-low">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
