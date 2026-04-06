'use client'

import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { PricingBreakdown } from '@/lib/mock-data'
import { SurfaceCard } from '@/components/ui/surface-card'
import { cn } from '@/lib/utils'

interface PricingBreakdownCardProps {
  pricing: PricingBreakdown
}

function formatPrice(amount: number, currency: string) {
  return `${amount.toLocaleString('ru-RU')} ${currency}`
}

export function PricingBreakdownCard({ pricing }: PricingBreakdownCardProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    new Set(pricing.addOns.filter(a => a.selected).map(a => a.label))
  )

  const toggleAddOn = (label: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  const externalTotal = pricing.externalFees.reduce((sum, fee) => sum + fee.amount, 0)
  const addOnsTotal = pricing.addOns
    .filter(a => selectedAddOns.has(a.label))
    .reduce((sum, a) => sum + a.amount, 0)
  const grandTotal = pricing.serviceFee + externalTotal + addOnsTotal

  return (
    <SurfaceCard padding="none" className="overflow-hidden">
      {/* Section 1: AH Travel Service Fee */}
      <div className="p-4 border-b border-border-hairline">
        <div className="flex items-center justify-between mb-1">
          <span className="text-label text-accent">Сервис AH Travel</span>
          <span className="text-h3 text-text-high">
            {formatPrice(pricing.serviceFee, pricing.currency)}
          </span>
        </div>
        <p className="text-caption text-text-low">
          Оценка, подготовка документов, сопровождение
        </p>
      </div>

      {/* Section 2: Mandatory External Fees */}
      <div className="p-4 border-b border-border-hairline">
        <div className="text-caption text-text-mid mb-3">Обязательные внешние сборы</div>
        <div className="space-y-2">
          {pricing.externalFees.map((fee) => (
            <div key={fee.label} className="flex items-center justify-between">
              <span className="text-body text-text-mid">{fee.label}</span>
              <span className="text-body text-text-high">
                {formatPrice(fee.amount, pricing.currency)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Optional Add-ons */}
      <div className="p-4 border-b border-border-hairline">
        <div className="text-caption text-text-mid mb-3">Дополнительные услуги</div>
        <div className="space-y-2">
          {pricing.addOns.map((addOn) => {
            const isSelected = selectedAddOns.has(addOn.label)
            return (
              <button
                key={addOn.label}
                onClick={() => toggleAddOn(addOn.label)}
                className={cn(
                  'w-full flex items-center justify-between p-3 rounded-lg border transition-fast text-left',
                  isSelected
                    ? 'border-accent/30 bg-accent/5'
                    : 'border-border-hairline hover:border-border-strong'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-5 h-5 rounded-md border flex items-center justify-center transition-fast',
                    isSelected
                      ? 'bg-accent border-accent'
                      : 'border-border-strong'
                  )}>
                    {isSelected ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <Plus className="w-3 h-3 text-text-low" />
                    )}
                  </div>
                  <span className="text-body text-text-high">{addOn.label}</span>
                </div>
                <span className={cn(
                  'text-body',
                  isSelected ? 'text-accent' : 'text-text-mid'
                )}>
                  +{formatPrice(addOn.amount, pricing.currency)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Total */}
      <div className="p-4 surface-2">
        <div className="flex items-center justify-between">
          <span className="text-h3 text-text-high">Итого</span>
          <span className="text-h2 text-accent">
            {formatPrice(grandTotal, pricing.currency)}
          </span>
        </div>
      </div>
    </SurfaceCard>
  )
}
