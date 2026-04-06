'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar,
  FileText,
  RefreshCw,
  Trash2,
  Info,
  Check
} from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { SurfaceCard } from '@/components/ui/surface-card'
import { StatusBadge } from '@/components/ui/status-badge'
import { mockActiveCase, documentStatusLabels, DocumentStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

const statusConfig: Record<DocumentStatus, {
  icon: React.ComponentType<{ className?: string }>
  variant: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
  color: string
  bgColor: string
  nextActionText: string
}> = {
  missing: { 
    icon: Upload, 
    variant: 'danger', 
    color: 'text-danger', 
    bgColor: 'bg-danger/10',
    nextActionText: 'Загрузите документ, чтобы продолжить оформление'
  },
  needs_fix: { 
    icon: AlertTriangle, 
    variant: 'warning', 
    color: 'text-warning', 
    bgColor: 'bg-warning/10',
    nextActionText: 'Исправьте отмеченные проблемы и загрузите повторно'
  },
  uploaded: { 
    icon: Clock, 
    variant: 'info', 
    color: 'text-accent-2', 
    bgColor: 'bg-accent-2/10',
    nextActionText: 'Документ ожидает проверки'
  },
  reviewing: { 
    icon: Clock, 
    variant: 'info', 
    color: 'text-accent-2', 
    bgColor: 'bg-accent-2/10',
    nextActionText: 'Проверка обычно занимает 1-2 рабочих дня'
  },
  verified: { 
    icon: CheckCircle2, 
    variant: 'success', 
    color: 'text-success', 
    bgColor: 'bg-success/10',
    nextActionText: 'Документ принят и готов к подаче'
  },
  expired: { 
    icon: Calendar, 
    variant: 'danger', 
    color: 'text-danger', 
    bgColor: 'bg-danger/10',
    nextActionText: 'Срок действия истёк — загрузите актуальный документ'
  },
}

export default function DocumentDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const document = mockActiveCase.documents.find(d => d.id === id)

  if (!document) {
    notFound()
  }

  const config = statusConfig[document.status]
  const StatusIcon = config.icon
  const hasIssues = document.issues && document.issues.length > 0
  const hasRequirements = document.requirements && document.requirements.length > 0
  const canUpload = document.status === 'missing' || document.status === 'needs_fix' || document.status === 'expired'
  const canReplace = document.status === 'uploaded' || document.status === 'verified'

  return (
    <AppShell 
      title={document.name}
      showBack
      backHref="/app/documents"
    >
      <div className="px-4 pt-4 pb-6">
        <div className="space-y-6">
          {/* Status Card */}
          <SurfaceCard className="text-center">
            <div className={cn(
              'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4',
              config.bgColor
            )}>
              <StatusIcon className={cn('w-8 h-8', config.color)} />
            </div>
            <h2 className="text-h2 text-text-high mb-2">{document.name}</h2>
            <StatusBadge variant={config.variant} dot className="mb-3">
              {documentStatusLabels[document.status]}
            </StatusBadge>
            
            <p className="text-caption text-text-mid mt-3">{config.nextActionText}</p>
            
            {document.isReusable && (
              <p className="text-caption text-accent-2 mt-2">
                Многоразовый — можно использовать в других заявках
              </p>
            )}
          </SurfaceCard>

          {/* Issues Section - BLOCKER */}
          {hasIssues && (
            <SurfaceCard className="border-l-2 border-l-danger bg-danger/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-label text-danger mb-2">Что нужно исправить</h3>
                  <ul className="space-y-2">
                    {document.issues!.map((issue, index) => (
                      <li key={index} className="text-body text-text-mid flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0 text-caption text-danger">
                          {index + 1}
                        </span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SurfaceCard>
          )}

          {/* Requirements */}
          {hasRequirements && (
            <SurfaceCard>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-label text-text-high mb-3">Требования к документу</h3>
                  <ul className="space-y-2">
                    {document.requirements!.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-text-low flex-shrink-0 mt-0.5" />
                        <span className="text-body text-text-mid">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SurfaceCard>
          )}

          {/* Document Preview Placeholder */}
          {(document.status === 'uploaded' || document.status === 'reviewing' || document.status === 'verified' || document.status === 'needs_fix') && (
            <SurfaceCard padding="none" className="overflow-hidden">
              <div className="aspect-[3/4] surface-2 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-text-low mx-auto mb-2" />
                  <p className="text-caption text-text-low">Предпросмотр документа</p>
                </div>
              </div>
              {document.uploadedAt && (
                <div className="p-3 border-t border-border-hairline">
                  <p className="text-caption text-text-low text-center">
                    Загружен {new Date(document.uploadedAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </SurfaceCard>
          )}

          {/* Expiry Info */}
          {document.expiryDate && (
            <SurfaceCard>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-text-mid" />
                <div>
                  <p className="text-label text-text-high">Срок действия</p>
                  <p className="text-caption text-text-mid">
                    до {new Date(document.expiryDate).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </SurfaceCard>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          {canUpload && (
            <button
              className={cn(
                'flex items-center justify-center gap-2 w-full h-12',
                'rounded-xl bg-accent text-white font-medium',
                'hover:bg-accent/90 active:scale-[0.98]',
                'transition-fast touch-target'
              )}
            >
              <Upload className="w-5 h-5" />
              {document.status === 'missing' ? 'Загрузить документ' : 'Загрузить исправленный'}
            </button>
          )}

          {canReplace && (
            <>
              <button
                className={cn(
                  'flex items-center justify-center gap-2 w-full h-12',
                  'rounded-xl surface-2 border border-border-strong text-text-high font-medium',
                  'hover:surface-1 active:scale-[0.98]',
                  'transition-fast touch-target'
                )}
              >
                <RefreshCw className="w-5 h-5" />
                Заменить документ
              </button>
              
              <button
                className={cn(
                  'flex items-center justify-center gap-2 w-full h-12',
                  'rounded-xl text-danger font-medium',
                  'hover:bg-danger/10 active:scale-[0.98]',
                  'transition-fast touch-target'
                )}
              >
                <Trash2 className="w-5 h-5" />
                Удалить
              </button>
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}
