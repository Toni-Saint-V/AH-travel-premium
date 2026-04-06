import { Sparkles } from 'lucide-react'
import { SurfaceCard } from '@/components/ui/surface-card'

interface AIReasoningCardProps {
  insight: string
}

export function AIReasoningCard({ insight }: AIReasoningCardProps) {
  if (!insight) return null

  return (
    <SurfaceCard className="relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-2 to-accent opacity-50" />
      
      <div className="flex items-start gap-3 pt-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 flex-shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-label text-text-high mb-1">AI-анализ</h3>
          <p className="text-body text-text-mid leading-relaxed">
            {insight}
          </p>
        </div>
      </div>
    </SurfaceCard>
  )
}
