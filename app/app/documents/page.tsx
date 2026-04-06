import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { DocumentProgress } from '@/components/documents/document-progress'
import { DocumentList } from '@/components/documents/document-list'
import { DocumentsAIHint } from '@/components/documents/documents-ai-hint'
import { mockActiveCase } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function DocumentsPage() {
  const documents = mockActiveCase.documents
  const verifiedCount = documents.filter(d => d.status === 'verified').length
  const needsActionCount = documents.filter(
    d => d.status === 'missing' || d.status === 'needs_fix'
  ).length
  const allReady = verifiedCount === documents.length

  return (
    <AppShell title="Документы">
      <div className="px-4 pt-4 pb-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-h2 text-text-high mb-1">Ваш кошелёк документов</h1>
          <p className="text-body text-text-mid">
            Загружайте, отслеживайте статусы и переиспользуйте документы
          </p>
        </header>

        <div className="space-y-6">
          {/* Progress Overview - high visual weight */}
          <DocumentProgress 
            total={documents.length}
            verified={verifiedCount}
            needsAction={needsActionCount}
          />

          {/* AI Hint if there are issues - actionable guidance */}
          {needsActionCount > 0 && (
            <DocumentsAIHint 
              message={`${needsActionCount} ${needsActionCount === 1 ? 'документ требует' : 'документа требуют'} вашего внимания. Загрузите недостающие файлы или исправьте отмеченные проблемы для продолжения.`}
            />
          )}

          {/* Document List - organized by status */}
          <DocumentList documents={documents} />
        </div>
      </div>

      {/* Sticky CTA when all ready */}
      {allReady && (
        <div className="sticky bottom-[calc(56px+max(16px,var(--safe-bottom,0px)))] left-0 right-0 px-4 py-4 surface-0 border-t border-border-hairline">
          <Link
            href="/app/checkout"
            className={cn(
              'flex items-center justify-center gap-2 w-full h-12',
              'rounded-xl bg-success text-white font-medium',
              'hover:bg-success/90 active:scale-[0.98]',
              'transition-fast touch-target'
            )}
          >
            Все документы готовы — перейти к оплате
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </AppShell>
  )
}
