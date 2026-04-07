import type { ComponentType } from 'react'
import {
  AlertTriangle,
  BriefcaseBusiness,
  Camera,
  Check,
  Clock3,
  FileBadge,
  IdCard,
  Landmark,
  X,
} from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'
import { documentStatusLabels, mockActiveCase, type DocumentStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const previewDocumentTypes = new Set(['passport', 'photo', 'bank_statement', 'employment'])

const documents = mockActiveCase.documents.filter((document) => previewDocumentTypes.has(document.type))

const statusConfig = {
  verified: {
    badgeVariant: 'success',
    statusDotColor: 'bg-success',
    hoverGlow: 'bg-success/6',
  },
  reviewing: {
    badgeVariant: 'info',
    statusDotColor: 'bg-accent-2',
    hoverGlow: 'bg-accent-2/6',
  },
  uploaded: {
    badgeVariant: 'info',
    statusDotColor: 'bg-accent-2',
    hoverGlow: 'bg-accent-2/6',
  },
  needs_fix: {
    badgeVariant: 'warning',
    statusDotColor: 'bg-warning',
    hoverGlow: 'bg-warning/6',
  },
  missing: {
    badgeVariant: 'danger',
    statusDotColor: 'bg-danger',
    hoverGlow: 'bg-danger/6',
  },
  expired: {
    badgeVariant: 'danger',
    statusDotColor: 'bg-danger',
    hoverGlow: 'bg-danger/6',
  },
} as const

const documentTypeIcons: Record<string, ComponentType<{ className?: string }>> = {
  passport: IdCard,
  photo: Camera,
  bank_statement: Landmark,
  employment: BriefcaseBusiness,
}

const statusIcons: Record<DocumentStatus, ComponentType<{ className?: string }>> = {
  verified: Check,
  reviewing: Clock3,
  uploaded: Clock3,
  needs_fix: AlertTriangle,
  missing: X,
  expired: X,
}

function getDocumentTitle(document: (typeof documents)[number]) {
  if (document.type === 'photo') {
    return {
      primary: 'Фотография',
      secondary: '3,5 × 4,5 см',
    }
  }

  return {
    primary: document.name,
    secondary: null,
  }
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
            <div className="flex items-baseline gap-2">
              <span className="text-[24px] font-semibold leading-none tracking-[-0.035em] text-text-high sm:text-[28px]">
                {activeCount} из {documents.length}
              </span>
              <span className="text-[13px] leading-5 text-text-mid sm:text-[14px]">
                документов загружены
              </span>
            </div>

            <div
              className="mt-4 grid grid-cols-4 gap-2 sm:mt-5"
              role="img"
              aria-label={`${activeCount} из ${documents.length} документов загружены`}
            >
              {documents.map((document, index) => (
                <div
                  key={document.name}
                  className="h-2 overflow-hidden rounded-full bg-bg-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      'h-full rounded-full transition-base',
                      index < activeCount
                        ? 'bg-[linear-gradient(90deg,#6C63FF_0%,#2CD4FF_100%)] shadow-[0_0_18px_rgba(44,212,255,0.18)]'
                        : 'bg-transparent'
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.015]">
              <SummaryMetric
                label="Проверено"
                value={verifiedCount}
                valueColor="text-success"
                className="border-r border-white/5"
              />
              <SummaryMetric
                label="В работе"
                value={inProgressCount}
                valueColor="text-accent-2"
                className="border-r border-white/5"
              />
              <SummaryMetric
                label="Требуют внимания"
                value={needsAttentionCount}
                valueColor="text-warning"
              />
            </div>
          </div>

          <ul className="divide-y divide-white/5">
            {documents.map((doc) => {
              const status = statusConfig[doc.status]
              const DocumentIcon = documentTypeIcons[doc.type] ?? FileBadge
              const StatusIcon = statusIcons[doc.status]
              const title = getDocumentTitle(doc)

              return (
                <li
                  key={doc.name}
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 transition-base hover:bg-white/[0.02] sm:px-7 sm:py-4"
                >
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

                  <div className="min-w-0 pr-2">
                    <div className="flex min-w-0 items-baseline gap-1.5">
                      <div className="truncate text-[15px] font-medium leading-[1.25] tracking-[-0.01em] text-text-high sm:text-[16px]">
                        {title.primary}
                      </div>
                      {title.secondary ? (
                        <span className="shrink-0 whitespace-nowrap text-[10px] font-medium leading-none tracking-[0.02em] text-text-low sm:text-[11px]">
                          {title.secondary}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full border border-white/7 bg-white/[0.02] sm:hidden',
                      doc.status === 'needs_fix' && 'border-warning/18 bg-warning/[0.07]',
                      (doc.status === 'missing' || doc.status === 'expired') &&
                        'border-danger/18 bg-danger/[0.07]'
                    )}
                    aria-label={documentStatusLabels[doc.status as DocumentStatus]}
                  >
                    <StatusIcon
                      className={cn(
                        'h-4 w-4',
                        doc.status === 'verified' && 'text-success',
                        (doc.status === 'uploaded' || doc.status === 'reviewing') &&
                          'text-accent-2',
                        doc.status === 'needs_fix' && 'text-warning',
                        (doc.status === 'missing' || doc.status === 'expired') &&
                          'text-danger'
                      )}
                    />
                  </div>

                  <StatusBadge
                    variant={status.badgeVariant}
                    className={cn(
                      'hidden shrink-0 rounded-full border-white/7 bg-white/[0.02] px-2.5 py-0.5 text-[10px] tracking-[0.02em] sm:inline-flex',
                      doc.status === 'needs_fix' && 'border-warning/18 bg-warning/[0.07]'
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
    <div
      className={cn(
        'grid min-h-[74px] grid-rows-[auto_auto] place-items-center px-3 py-3 text-center sm:min-h-[88px] sm:px-4 sm:py-4',
        className
      )}
    >
      <div
        className={cn(
          'w-full text-center text-[22px] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[24px]',
          valueColor
        )}
      >
        {value}
      </div>
      <div className="mt-2 min-h-[28px] max-w-[94px] text-center text-[11px] leading-[1.15] text-text-low sm:min-h-[30px] sm:max-w-[110px] sm:text-[12px]">
        {label}
      </div>
    </div>
  )
}
