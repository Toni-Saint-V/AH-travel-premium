import { AppShell } from '@/components/layout/app-shell'
import { DocumentProgress } from '@/components/documents/document-progress'
import { DocumentList } from '@/components/documents/document-list'
import { DocumentsAIHint } from '@/components/documents/documents-ai-hint'
import { mockActiveCase } from '@/lib/mock-data'

export default function DocumentsPage() {
  const documents = mockActiveCase.documents
  const verifiedCount = documents.filter(d => d.status === 'verified').length
  const needsActionCount = documents.filter(
    d => d.status === 'missing' || d.status === 'needs_fix'
  ).length

  return (
    <AppShell title="Документы">
      <div className="px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <DocumentProgress 
          total={documents.length}
          verified={verifiedCount}
          needsAction={needsActionCount}
        />

        {/* AI Hint if there are issues */}
        {needsActionCount > 0 && (
          <DocumentsAIHint 
            message={`${needsActionCount} ${needsActionCount === 1 ? 'документ требует' : 'документа требуют'} вашего внимания. Загрузите недостающие файлы или исправьте отмеченные проблемы.`}
          />
        )}

        {/* Document List */}
        <DocumentList documents={documents} />
      </div>
    </AppShell>
  )
}
