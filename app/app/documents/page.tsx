import Link from 'next/link'
import { ArrowRight, AlertOctagon, CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { DocumentList } from '@/components/documents/document-list'
import { mockActiveCase, getDocumentStats, getCriticalDocuments } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function DocumentsPage() {
  const documents = mockActiveCase.documents
  const stats = getDocumentStats(documents)
  const criticalBlockers = getCriticalDocuments(documents)
  const allReady = stats.verified === stats.total
  const percentage = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0

  return (
    <AppShell title="Документы">
      <div className="px-4 pt-6 pb-6">
        
        {/* HERO: Progress or Status - THE focal point */}
        <section className="mb-8">
          {criticalBlockers.length > 0 ? (
            // BLOCKERS - dramatic, stops you
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertOctagon className="w-5 h-5 text-danger" />
                <span className="text-caption text-danger uppercase tracking-widest">Блокирует подачу</span>
              </div>
              <h1 className="text-[36px] font-semibold text-danger leading-none mb-4">
                {criticalBlockers.length} {criticalBlockers.length === 1 ? 'документ' : 'документа'}
              </h1>
              <div className="space-y-1">
                {criticalBlockers.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/app/documents/${doc.id}`}
                    className="flex items-center justify-between py-3 border-b border-border-hairline last:border-0 hover:bg-bg-1 -mx-2 px-2 rounded transition-fast"
                  >
                    <span className="text-body text-text-high">{doc.name}</span>
                    <ArrowRight className="w-4 h-4 text-danger" />
                  </Link>
                ))}
              </div>
            </div>
          ) : allReady ? (
            // ALL READY - success, calm
            <div className="py-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-caption text-success uppercase tracking-widest">Готово к подаче</span>
              </div>
              <h1 className="text-[36px] font-semibold text-success leading-none">
                Все документы
              </h1>
            </div>
          ) : (
            // IN PROGRESS - the number dominates
            <div className="py-4">
              <p className="text-caption text-text-low uppercase tracking-widest mb-2">Готовность документов</p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[56px] font-semibold text-text-high leading-none tabular-nums">{percentage}</span>
                <span className="text-h2 text-text-low">%</span>
              </div>
              {/* Progress bar - minimal */}
              <div className="h-1 rounded-full bg-bg-2 overflow-hidden mb-3">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-caption text-text-low">
                {stats.verified} из {stats.total} проверено
              </p>
            </div>
          )}
        </section>

        {/* Document List - flows below */}
        <DocumentList documents={documents} />
      </div>

      {/* Sticky CTA when all ready */}
      {allReady && (
        <div className="sticky bottom-[calc(56px+max(16px,var(--safe-bottom,0px)))] left-0 right-0 px-4 py-4 surface-0">
          <Link
            href="/app/checkout"
            className={cn(
              'flex items-center justify-center gap-3 w-full h-16',
              'rounded-2xl bg-success text-white font-semibold',
              'hover:bg-success/90 active:scale-[0.98]',
              'transition-fast shadow-[0_0_40px_rgba(59,214,113,0.25)]'
            )}
          >
            Перейти к оплате
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </AppShell>
  )
}
