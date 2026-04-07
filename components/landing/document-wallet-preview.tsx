import type { ComponentType } from 'react'
import {
  BriefcaseBusiness,
  Camera,
  FileBadge,
  IdCard,
  Landmark,
} from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'
import { documentStatusLabels, mockActiveCase, type DocumentStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const previewDocumentTypes = new Set(['passport', 'photo', 'bank_statement', 'employment'])

const documents = mockActiveCase.documents.filter((document) => previewDocumentTypes.has(document.type))

const statusConfig = {
  verified: {
    summaryLabel: 'Проверено',
    badgeVariant: 'success',
    statusDotColor: 'bg-success',
    hoverGlow: 'bg-success/6',
    summaryValueColor: 'text-success',
  },
  reviewing: {
    summaryLabel: 'В работе',
    badgeVariant: 'info',
    statusDotColor: 'bg-accent-2',
    hoverGlow: 'bg-accent-2/6',
    summaryValueColor: 'text-accent-2',
  },
  uploaded: {
    summaryLabel: 'В работе',
    badgeVariant: 'info',
    statusDotColor: 'bg-accent-2',
    hoverGlow: 'bg-accent-2/6',
    summaryValueColor: 'text-accent-2',
  },
  needs_fix: {
    summaryLabel: 'Требуют внимания',
    badgeVariant: 'warning',
    statusDotColor: 'bg-warning',
    hoverGlow: 'bg-warning/6',
    summaryValueColor: 'text-warning',
  },
  missing: {
    summaryLabel: 'Требуют внимания',
    badgeVariant: 'danger',
    statusDotColor: 'bg-danger',
    hoverGlow: 'bg-danger/6',
    summaryValueColor: 'text-danger',
  },
  expired: {
    summaryLabel: 'Требуют внимания',
    badgeVariant: 'danger',
    statusDotColor: 'bg-danger',
    hoverGlow: 'bg-danger/6',
    summaryValueColor: 'text-danger',
  },
} as const

const documentTypeIcons: Record<string, ComponentType<{ className?: string }>> = {
  passport: IdCard,
  photo: Camera,
  bank_statement: Landmark,
  employment: BriefcaseBusiness,
}

export function DocumentWalletPreview() {
  const activeCount = documents.filter((document) =>
    document.status === 'verified' || document.status === 'uploaded' || document.status === 'reviewing'
  ).length
  const verifiedCount = documents.filter((document) => document.status === 'verified').length
  const inProgressCount = documents.filter((document) =>
    document.status === 'uploaded' || document.status === 'reviewing'
  ).length
  const needsAttentionCount = documents.filter((document) =>
    document.status === 'needs_fix' || document.status === 'missing' || document.status === 'expired'
  ).length
  const progressPercentage =
    documents.length > 0 ? Math.round((activeCount / documents.length) * 100) : 0
  const documentsLabel = formatRussianDocuments(documents.length)

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-64 w-full max-w-4xl blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(44, 212, 255, 0.14) 0%, rgba(108, 99, 255, 0.10) 32%, rgba(11, 13, 16, 0) 72%)',
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-h2 text-text-high">
          Умный кошелёк документов
        </h2>
        <p className="mx-auto mb-8 max-w-md text-center text-body text-text-mid">
          Загрузите документы один раз, чтобы видеть статусы и использовать их повторно
        </p>

        <div className="overflow-hidden rounded-[24px] border border-white/8 surface-1 shadow-[0_28px_80px_rgba(0,0,0,0.45)] sm:rounded-[28px]">
          <div className="h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0)_100%)]" />

          <div className="border-b border-border-hairline px-4 py-4 sm:px-7 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-low">
                  Готовность
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-[34px] font-semibold leading-none tracking-[-0.045em] text-text-high sm:text-[40px]">
                    {progressPercentage}%
                  </span>
                  <span className="hidden rounded-full border border-white/6 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-text-low sm:inline-flex">
                    {activeCount} из {documents.length} в работе
                  </span>
                </div>
              </div>

              <div className="hidden pt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-text-low sm:block">
                {documentsLabel}
              </div>
            </div>

            <div className="mt-4 rounded-full bg-black/25 p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mt-5">
              <div className="h-2 rounded-full bg-bg-2">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#6C63FF_0%,#2CD4FF_100%)] shadow-[0_0_18px_rgba(44,212,255,0.22)]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] text-text-low sm:hidden">
              <span>Проверено {verifiedCount}</span>
              <span className="text-text-low/50">•</span>
              <span>В работе {inProgressCount}</span>
              <span className="text-text-low/50">•</span>
              <span>Внимание {needsAttentionCount}</span>
            </div>

            <div className="mt-5 hidden overflow-hidden rounded-2xl border border-white/5 bg-white/[0.015] sm:grid sm:grid-cols-3">
              <SummaryMetric
                label={statusConfig.verified.summaryLabel}
                value={verifiedCount}
                valueColor={statusConfig.verified.summaryValueColor}
                className="border-r border-white/5"
              />
              <SummaryMetric
                label={statusConfig.uploaded.summaryLabel}
                value={inProgressCount}
                valueColor={statusConfig.uploaded.summaryValueColor}
                className="border-r border-white/5"
              />
              <SummaryMetric
                label={statusConfig.needs_fix.summaryLabel}
                value={needsAttentionCount}
                valueColor={statusConfig.needs_fix.summaryValueColor}
              />
            </div>
          </div>

          <ul className="divide-y divide-white/5">
            {documents.map((doc) => {
              const status = statusConfig[doc.status]
              const DocumentIcon = documentTypeIcons[doc.type] ?? FileBadge
              const isNeedsFix = doc.status === 'needs_fix'

              return (
                <li
                  key={doc.name}
                  className={cn(
                    'group relative flex items-start gap-3 px-4 py-3.5 transition-base hover:bg-white/[0.02] sm:items-center sm:px-7 sm:py-4',
                    isNeedsFix && 'bg-warning/[0.02]'
                  )}
                >
                  {isNeedsFix && (
                    <div
                      aria-hidden="true"
                      className="absolute bottom-3 left-0 top-3 w-px bg-[linear-gradient(180deg,rgba(255,181,71,0)_0%,rgba(255,181,71,0.8)_50%,rgba(255,181,71,0)_100%)]"
                    />
                  )}

                  <div
                    className={cn(
                      'relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border sm:h-11 sm:w-11',
                      'border-white/7 bg-white/[0.02]'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute inset-0 opacity-0 transition-base group-hover:opacity-100',
                        status.hoverGlow
                      )}
                    />
                    <DocumentIcon className="relative h-[18px] w-[18px] text-text-mid transition-base group-hover:text-text-high" />
                    <span
                      className={cn(
                        'absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full shadow-[0_0_0_2px_var(--bg-1)]',
                        status.statusDotColor
                      )}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="min-w-0 whitespace-normal text-[15px] font-medium leading-[1.25] tracking-[-0.01em] text-text-high sm:truncate sm:pr-2 sm:text-[16px]">
                      {doc.name}
                    </div>
                    <StatusBadge
                      variant={status.badgeVariant}
                      dot
                      className={cn(
                        'mt-2 inline-flex rounded-full border-white/7 bg-white/[0.02] px-2.5 py-0.5 text-[10px] tracking-[0.02em] sm:hidden',
                        isNeedsFix && 'border-warning/18 bg-warning/[0.07]'
                      )}
                    >
                      {documentStatusLabels[doc.status as DocumentStatus]}
                    </StatusBadge>
                  </div>

                  <StatusBadge
                    variant={status.badgeVariant}
                    className={cn(
                      'hidden shrink-0 rounded-full border-white/7 bg-white/[0.02] px-2.5 py-0.5 text-[10px] tracking-[0.02em] sm:inline-flex',
                      isNeedsFix && 'border-warning/18 bg-warning/[0.07]'
                    )}
                  >
                    {documentStatusLabels[doc.status as DocumentStatus]}
                  </StatusBadge>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function SummaryMetric({
  label,
  value,
  valueColor,
  className,
}: {
  label: string
  value: number
  valueColor: string
  className?: string
}) {
  return (
    <div className={cn('px-3 py-3 sm:px-4', className)}>
      <div className={cn('text-h3', valueColor)}>{value}</div>
      <div className="mt-1 text-[11px] leading-[1.3] text-text-low sm:text-caption">{label}</div>
    </div>
  )
}

function formatRussianDocuments(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} документ`
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} документа`
  }

  return `${count} документов`
}
