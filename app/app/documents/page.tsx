import { AppShell } from '@/components/layout/app-shell'
import { DocumentProgress } from '@/components/documents/document-progress'
import { DocumentList } from '@/components/documents/document-list'
import { DocumentsAIHint } from '@/components/documents/documents-ai-hint'
import { SectionHeader } from '@/components/ui/section-header'
import { mockActiveCase } from '@/lib/mock-data'

export default function DocumentsPage() {
  const documents = mockActiveCase.documents
  const verifiedCount = documents.filter(d => d.status === 'verified').length
  const needsActionCount = documents.filter(
    d => d.status === 'missing' || d.status === 'needs_fix'
  ).length

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
    </AppShell>
  )
}
