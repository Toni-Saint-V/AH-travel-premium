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
    new Set(pricing.addOns.filter(a => a.selected).map(a => a.id))
  )

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const externalTotal = pricing.externalFees.reduce((sum, fee) => sum + fee.amount, 0)
  const addOnsTotal = pricing.addOns
    .filter(a => selectedAddOns.has(a.id))
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
              <div>
                <span className="text-body text-text-mid">{fee.label}</span>
                {fee.paymentTime === 'later' && (
                  <span className="text-caption text-text-low ml-2">(при подаче)</span>
                )}
              </div>
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
            const isSelected = selectedAddOns.has(addOn.id)
            return (
              <button
                key={addOn.id}
                onClick={() => toggleAddOn(addOn.id)}
                className={cn(
                  'w-full flex items-start justify-between p-3 rounded-lg border transition-fast text-left',
                  isSelected
                    ? 'border-accent/30 bg-accent/5'
                    : 'border-border-hairline hover:border-border-strong'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-5 h-5 rounded-md border flex items-center justify-center transition-fast flex-shrink-0 mt-0.5',
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
                  <div>
                    <span className="text-body text-text-high">{addOn.label}</span>
                    <p className="text-caption text-text-mid mt-0.5">{addOn.description}</p>
                  </div>
                </div>
                <span className={cn(
                  'text-body flex-shrink-0 ml-3',
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
