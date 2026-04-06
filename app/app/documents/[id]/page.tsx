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
  Info
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
}> = {
  missing: { icon: Upload, variant: 'danger', color: 'text-danger', bgColor: 'bg-danger/10' },
  needs_fix: { icon: AlertTriangle, variant: 'warning', color: 'text-warning', bgColor: 'bg-warning/10' },
  uploaded: { icon: Clock, variant: 'info', color: 'text-accent-2', bgColor: 'bg-accent-2/10' },
  reviewing: { icon: Clock, variant: 'info', color: 'text-accent-2', bgColor: 'bg-accent-2/10' },
  verified: { icon: CheckCircle2, variant: 'success', color: 'text-success', bgColor: 'bg-success/10' },
  expired: { icon: Calendar, variant: 'danger', color: 'text-danger', bgColor: 'bg-danger/10' },
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
            
            {document.isReusable && (
              <p className="text-caption text-accent-2 mt-2">
                Многоразовый документ — можно использовать в других заявках
              </p>
            )}
          </SurfaceCard>

          {/* Issues Section */}
          {hasIssues && (
            <SurfaceCard className="border-l-2 border-l-warning">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-label text-text-high mb-2">Проблемы для исправления</h3>
                  <ul className="space-y-2">
                    {document.issues!.map((issue, index) => (
                      <li key={index} className="text-body text-text-mid flex items-start gap-2">
                        <span className="text-warning">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SurfaceCard>
          )}

          {/* Requirements */}
          <SurfaceCard>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-label text-text-high mb-2">Требования к документу</h3>
                <ul className="space-y-1.5 text-caption text-text-mid">
                  {document.type === 'passport' && (
                    <>
                      <li>• Скан всех страниц с отметками</li>
                      <li>• Срок действия не менее 6 месяцев после поездки</li>
                      <li>• Минимум 2 пустые страницы</li>
                    </>
                  )}
                  {document.type === 'photo' && (
                    <>
                      <li>• Размер 3.5×4.5 см</li>
                      <li>• Белый фон</li>
                      <li>• Сделана не более 6 месяцев назад</li>
                    </>
                  )}
                  {document.type === 'bank_statement' && (
                    <>
                      <li>• Выписка за последние 3 месяца</li>
                      <li>• На фирменном бланке банка</li>
                      <li>• С печатью и подписью</li>
                      <li>• Остаток не менее 70€ на день поездки</li>
                    </>
                  )}
                  {document.type === 'employment' && (
                    <>
                      <li>• На фирменном бланке организации</li>
                      <li>• Указана должность и стаж</li>
                      <li>• Указан размер зарплаты</li>
                      <li>• Подпись руководителя и печать</li>
                    </>
                  )}
                  {document.type === 'insurance' && (
                    <>
                      <li>• Покрытие не менее 30 000€</li>
                      <li>• Действует на все дни поездки</li>
                      <li>• Покрывает все страны Шенгена</li>
                    </>
                  )}
                  {document.type === 'hotel' && (
                    <>
                      <li>• Подтверждение на все даты поездки</li>
                      <li>• Имя совпадает с паспортом</li>
                      <li>• Указан адрес отеля</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </SurfaceCard>

          {/* Document Preview Placeholder */}
          {(document.status === 'uploaded' || document.status === 'reviewing' || document.status === 'verified' || document.status === 'needs_fix') && (
            <SurfaceCard padding="none" className="overflow-hidden">
              <div className="aspect-[3/4] bg-bg-2 flex items-center justify-center">
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
