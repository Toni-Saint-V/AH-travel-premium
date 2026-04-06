'use client'

import { useState } from 'react'
import { Check, Plus, Shield, Lock, HelpCircle, MessageCircle, FileText, Clock, ArrowRight, CreditCard } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { SurfaceCard } from '@/components/ui/surface-card'
import { SectionHeader } from '@/components/ui/section-header'
import { mockActiveCase } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function formatPrice(amount: number) {
  return `${amount.toLocaleString('ru-RU')} ₽`
}

export default function CheckoutPage() {
  const { pricing } = mockActiveCase
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

  const payNowFees = pricing.externalFees.filter(f => f.paymentTime === 'now')
  const payLaterFees = pricing.externalFees.filter(f => f.paymentTime === 'later')
  const payLaterTotal = payLaterFees.reduce((sum, fee) => sum + fee.amount, 0)
  const addOnsTotal = pricing.addOns
    .filter(a => selectedAddOns.has(a.id))
    .reduce((sum, a) => sum + a.amount, 0)
  const payNowTotal = pricing.serviceFee + payNowFees.reduce((sum, f) => sum + f.amount, 0) + addOnsTotal

  return (
    <AppShell 
      title="Оформление"
      showBack
      backHref="/app/home"
    >
      <div className="px-4 pt-4 pb-6">
        {/* Case Summary */}
        <SurfaceCard className="mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
            <div>
              <h2 className="text-h3 text-text-high">{mockActiveCase.destination}</h2>
              <p className="text-caption text-text-mid">{mockActiveCase.tripGoal}</p>
            </div>
          </div>
        </SurfaceCard>

        <div className="space-y-6">
          {/* PAY NOW Section */}
          <section>
            <SectionHeader 
              title="К оплате сейчас" 
              className="mb-3"
            />
            
            {/* Service Fee */}
            <SurfaceCard className="border-l-2 border-l-accent mb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-label text-text-high">Сервис AH Travel</p>
                  <p className="text-caption text-text-mid mt-1">
                    AI-оценка, подготовка документов, сопровождение до результата
                  </p>
                </div>
                <span className="text-h3 text-accent flex-shrink-0 ml-4">{formatPrice(pricing.serviceFee)}</span>
              </div>
            </SurfaceCard>

            {/* Add-ons */}
            <div className="space-y-2">
              {pricing.addOns.map((addOn) => {
                const isSelected = selectedAddOns.has(addOn.id)
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn.id)}
                    className={cn(
                      'w-full flex items-start justify-between p-4 rounded-xl border transition-fast text-left',
                      isSelected
                        ? 'surface-2 border-accent/30'
                        : 'surface-1 border-border-hairline hover:surface-2'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-fast flex-shrink-0 mt-0.5',
                        isSelected
                          ? 'bg-accent border-accent'
                          : 'border-border-strong'
                      )}>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Plus className="w-4 h-4 text-text-low" />
                        )}
                      </div>
                      <div>
                        <span className="text-body text-text-high">{addOn.label}</span>
                        <p className="text-caption text-text-mid mt-0.5">{addOn.description}</p>
                      </div>
                    </div>
                    <span className={cn(
                      'text-body flex-shrink-0 ml-4',
                      isSelected ? 'text-accent' : 'text-text-mid'
                    )}>
                      +{formatPrice(addOn.amount)}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* PAY LATER Section */}
          {payLaterFees.length > 0 && (
            <section>
              <SectionHeader 
                title="Оплачивается отдельно" 
                subtitle="В визовом центре при подаче"
                className="mb-3"
              />
              <SurfaceCard>
                <div className="space-y-3">
                  {payLaterFees.map((fee) => (
                    <div key={fee.label} className="flex items-center justify-between">
                      <span className="text-body text-text-mid">{fee.label}</span>
                      <span className="text-body text-text-high">{formatPrice(fee.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-border-hairline flex items-center justify-between">
                    <span className="text-caption text-text-mid">Итого при подаче</span>
                    <span className="text-label text-text-high">{formatPrice(payLaterTotal)}</span>
                  </div>
                </div>
              </SurfaceCard>
            </section>
          )}

          {/* Total Card */}
          <SurfaceCard variant="elevated" className="surface-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-h3 text-text-high">К оплате сейчас</span>
              <span className="text-h2 text-accent">{formatPrice(payNowTotal)}</span>
            </div>
            {payLaterTotal > 0 && (
              <p className="text-caption text-text-low">
                + {formatPrice(payLaterTotal)} при подаче в визовом центре
              </p>
            )}
          </SurfaceCard>

          {/* WHAT HAPPENS AFTER PAYMENT */}
          <section>
            <SectionHeader 
              title="Что будет после оплаты" 
              className="mb-3"
            />
            <SurfaceCard padding="none">
              <div className="divide-y divide-border-hairline">
                <StepItem 
                  icon={<FileText className="w-4 h-4" />}
                  title="Проверка документов"
                  description="Мы проверим все загруженные документы в течение 1 рабочего дня"
                />
                <StepItem 
                  icon={<MessageCircle className="w-4 h-4" />}
                  title="Персональные рекомендации"
                  description="Подскажем, что улучшить для максимального шанса одобрения"
                />
                <StepItem 
                  icon={<Clock className="w-4 h-4" />}
                  title="Запись в визовый центр"
                  description="Поможем выбрать удобную дату и подготовиться к визиту"
                />
              </div>
            </SurfaceCard>
          </section>

          {/* TRUST SIGNALS */}
          <section className="space-y-3">
            <div className="flex items-center gap-4 justify-center py-2">
              <div className="flex items-center gap-1.5 text-caption text-text-low">
                <Shield className="w-4 h-4" />
                <span>Безопасная оплата</span>
              </div>
              <div className="flex items-center gap-1.5 text-caption text-text-low">
                <Lock className="w-4 h-4" />
                <span>Данные защищены</span>
              </div>
            </div>

            <SurfaceCard className="text-center">
              <p className="text-caption text-text-mid mb-2">
                Есть вопросы? Мы на связи
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="text-caption text-accent hover:underline flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </a>
                <a href="#" className="text-caption text-accent hover:underline flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  Поддержка
                </a>
              </div>
            </SurfaceCard>
          </section>
        </div>

        {/* CTA - dominant */}
        <div className="mt-10 space-y-4">
          <button
            className={cn(
              'flex items-center justify-center gap-3 w-full h-16',
              'rounded-2xl bg-accent text-white font-semibold text-base',
              'hover:bg-accent/90 active:scale-[0.98] active:translate-y-px',
              'transition-fast'
            )}
          >
            Оплатить {formatPrice(payNowTotal)}
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-caption text-text-low text-center">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="#" className="text-accent hover:underline">условиями оферты</a>
            {' '}и{' '}
            <a href="#" className="text-accent hover:underline">политикой возврата</a>
          </p>
        </div>
      </div>
    </AppShell>
  )
}

function StepItem({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
        {icon}
      </div>
      <div>
        <p className="text-label text-text-high">{title}</p>
        <p className="text-caption text-text-mid mt-0.5">{description}</p>
      </div>
    </div>
  )
}
