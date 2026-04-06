import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { DocumentBlockers } from '@/components/documents/document-blockers'
import { DocumentProgress } from '@/components/documents/document-progress'
import { DocumentList } from '@/components/documents/document-list'
import { mockActiveCase, getDocumentStats, getCriticalDocuments } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function DocumentsPage() {
  const documents = mockActiveCase.documents
  const stats = getDocumentStats(documents)
  const criticalBlockers = getCriticalDocuments(documents)
  const allReady = stats.verified === stats.total

  return (
    <AppShell title="Документы">
      <div className="px-4 pt-4 pb-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-h2 text-text-high mb-1">Документы</h1>
          <p className="text-body text-text-mid">
            {allReady 
              ? 'Все документы проверены и готовы к подаче'
              : 'Загружайте документы и отслеживайте их статус'
            }
          </p>
        </header>

        <div className="space-y-6">
          {/* Blockers Panel - HIGHEST PRIORITY */}
          {criticalBlockers.length > 0 && (
            <DocumentBlockers documents={criticalBlockers} />
          )}

          {/* Progress Overview */}
          <DocumentProgress 
            total={stats.total}
            verified={stats.verified}
            needsAction={stats.blockers}
            reviewing={stats.reviewing}
          />

          {/* Document List - organized by priority and status */}
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
            Все готово — перейти к оплате
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </AppShell>
  )
}
