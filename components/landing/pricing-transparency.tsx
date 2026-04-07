import { Building2, Plus, Sparkles, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type PricingRow = {
  label: string
  amount: string
}

const mandatoryFees: PricingRow[] = [
  { label: 'Консульский сбор', amount: '8 000 ₽' },
  { label: 'Сервисный сбор ВЦ', amount: '2 500 ₽' },
]

const addOns: PricingRow[] = [
  { label: 'VIP-сопровождение', amount: '+3 500 ₽' },
  { label: 'Страховой полис', amount: '+1 200 ₽' },
]

function SectionHeader({
  icon: Icon,
  title,
  accent = false,
  framed = false,
}: {
  icon: LucideIcon
  title: string
  accent?: boolean
  framed?: boolean
}) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-start gap-3.5',
        framed &&
          'rounded-[20px] border-[1.5px] border-white/8 bg-white/[0.02] pl-0 pr-3.5 py-3'
      )}
    >
      <div
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
          accent
            ? 'border-accent/18 bg-accent/[0.09] text-accent'
            : 'border-white/7 bg-white/[0.03] text-text-mid'
        )}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </div>

      <h3
        className={cn(
          'min-w-0 font-semibold tracking-[-0.02em] text-text-high',
          framed
            ? 'whitespace-nowrap text-[15px] leading-none sm:text-[17px]'
            : 'flex-1 text-[17px] leading-[1.18] sm:text-[20px]'
        )}
      >
        {title}
      </h3>
    </div>
  )
}

function PricingRows({
  rows,
  mutedAmounts = false,
}: {
  rows: PricingRow[]
  mutedAmounts?: boolean
}) {
  return (
    <div className="mt-4 space-y-3.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-4">
          <span className="min-w-0 pr-2 text-[15px] leading-6 text-text-mid">
            {row.label}
          </span>
          <span
            className={cn(
              'shrink-0 whitespace-nowrap text-right text-[15px] font-medium leading-6 tracking-[-0.01em] tabular-nums',
              mutedAmounts ? 'text-text-low' : 'text-text-high'
            )}
          >
            {row.amount}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PricingTransparency() {
  return (
    <section id="pricing" className="scroll-mt-16 px-4 py-16 surface-1 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-h2 text-text-high">Прозрачное ценообразование</h2>
          <p className="mx-auto mt-3 max-w-md text-body text-text-mid">
            Всегда три отдельных слоя: наш сервис, внешние сборы, опции
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,19,23,0.98)_0%,rgba(11,13,16,0.98)_100%)] shadow-[0_26px_72px_rgba(0,0,0,0.44)]">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

          <div className="p-3 sm:p-4">
            <div className="rounded-[24px] border border-accent/16 bg-[linear-gradient(135deg,rgba(108,99,255,0.14),rgba(108,99,255,0.04)_46%,rgba(255,255,255,0.02)_100%)] px-5 py-5 sm:px-6 sm:py-6">
              <SectionHeader icon={Sparkles} title="Сервис AH Travel" accent />

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[30rem] text-[15px] leading-6 text-text-mid">
                  AI-оценка, подготовка документов, сопровождение
                </p>

                <div className="shrink-0 inline-flex items-end gap-2 whitespace-nowrap text-text-high tabular-nums">
                  <span className="pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-low">
                    от
                  </span>
                  <span className="inline-flex items-end gap-1.5">
                    <span className="text-[24px] font-semibold leading-none tracking-[-0.03em] sm:text-[28px]">
                      4 900
                    </span>
                    <span className="pb-0.5 text-[17px] font-medium leading-none tracking-[-0.01em] text-text-mid sm:text-[19px]">
                      ₽
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <SectionHeader icon={Building2} title="Обязательные внешние сборы" framed />
            <PricingRows rows={mandatoryFees} />
          </div>

          <div className="border-t border-white/6 px-5 py-5 sm:px-6 sm:py-6">
            <SectionHeader icon={Plus} title="Дополнительно" framed />
            <PricingRows rows={addOns} mutedAmounts />
          </div>

          <div className="border-t border-white/6 bg-white/[0.03] px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-end justify-between gap-4">
              <div className="text-[17px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-high sm:text-[20px]">
                Пример итога
              </div>
              <div className="shrink-0 inline-flex items-end gap-2 whitespace-nowrap text-right text-text-high tabular-nums">
                <span className="pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-low">
                  от
                </span>
                <span className="inline-flex items-end gap-1.5">
                  <span className="text-[25px] font-semibold leading-none tracking-[-0.03em] sm:text-[30px]">
                    15 400
                  </span>
                  <span className="pb-0.5 text-[18px] font-medium leading-none tracking-[-0.01em] text-text-mid sm:text-[20px]">
                    ₽
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
