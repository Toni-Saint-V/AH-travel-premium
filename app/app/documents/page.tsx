import Link from 'next/link'
import { ArrowRight, AlertOctagon, CheckCircle2, Clock } from 'lucide-react'
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
      <div className="px-4 pt-4 pb-6">
        
        {/* HERO: The dominant element - either blockers or progress */}
        {criticalBlockers.length > 0 ? (
          // BLOCKERS - Urgent, dominant when present
          <section className="mb-6">
            <div className="rounded-2xl border-2 border-danger/30 bg-danger/5 p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center flex-shrink-0">
                  <AlertOctagon className="w-6 h-6 text-danger" />
                </div>
                <div>
                  <h1 className="text-h2 text-danger mb-1">Подача невозможна</h1>
                  <p className="text-body text-text-mid">
                    {criticalBlockers.length} обязательных {criticalBlockers.length === 1 ? 'документ требует' : 'документа требуют'} вашего внимания
                  </p>
                </div>
              </div>

              {/* Blocker list - inline, not separate component */}
              <div className="space-y-2">
                {criticalBlockers.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/app/documents/${doc.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-bg-1 border border-border-hairline hover:surface-2 transition-fast"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-label text-text-high">{doc.name}</p>
                      <p className="text-caption text-danger">
                        {doc.status === 'missing' ? 'Не загружен' : doc.issues?.[0] || 'Требует исправления'}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-danger flex-shrink-0 ml-3" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : allReady ? (
          // ALL READY - Success state
          <section className="mb-6">
            <div className="rounded-2xl border-2 border-success/30 bg-success/5 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h1 className="text-h2 text-success mb-1">Все готово</h1>
                  <p className="text-body text-text-mid">
                    Документы проверены и готовы к подаче
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // IN PROGRESS - Neutral but clear
          <section className="mb-6">
            <div className="rounded-2xl border border-border-strong bg-bg-1 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-h2 text-text-high mb-1">Документы</h1>
                  <p className="text-body text-text-mid">
                    Загружайте и отслеживайте статус
                  </p>
                </div>
                {/* THE NUMBER - must stand out */}
                <div className="text-right">
                  <div className="text-display text-accent">{percentage}%</div>
                  <p className="text-caption text-text-mid">готовность</p>
                </div>
              </div>

              {/* Progress bar - larger, more impactful */}
              <div className="h-3 rounded-full bg-bg-2 overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Stats - compact row */}
              <div className="flex items-center gap-4 mt-3 text-caption">
                <span className="text-success">{stats.verified} проверено</span>
                {stats.reviewing > 0 && (
                  <span className="text-accent-2">{stats.reviewing} на проверке</span>
                )}
                {stats.blockers > 0 && (
                  <span className="text-warning">{stats.blockers} требуют действий</span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Document List - secondary */}
        <DocumentList documents={documents} />
      </div>

      {/* Sticky CTA when all ready */}
      {allReady && (
        <div className="sticky bottom-[calc(56px+max(16px,var(--safe-bottom,0px)))] left-0 right-0 px-4 py-4 surface-0 border-t border-border-hairline">
          <Link
            href="/app/checkout"
            className={cn(
              'flex items-center justify-center gap-2 w-full h-14',
              'rounded-xl bg-success text-white font-semibold',
              'hover:bg-success/90 active:scale-[0.98] active:translate-y-px',
              'transition-fast'
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
