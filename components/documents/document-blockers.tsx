import Link from 'next/link'
import { AlertTriangle, ChevronRight } from 'lucide-react'
import { Document, documentStatusLabels } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface DocumentBlockersProps {
  documents: Document[]
}

export function DocumentBlockers({ documents }: DocumentBlockersProps) {
  if (documents.length === 0) return null

  return (
    <div className="surface-1 rounded-xl border border-danger/20 bg-danger/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-danger/10">
        <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-danger" />
        </div>
        <div>
          <p className="text-label text-danger">Что мешает подаче прямо сейчас</p>
          <p className="text-caption text-text-mid">{documents.length} обязательных документов требуют внимания</p>
        </div>
      </div>

      {/* Document list */}
      <div className="divide-y divide-border-hairline">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/app/documents/${doc.id}`}
            className="flex items-center justify-between px-4 py-3 hover:surface-2 transition-fast"
          >
            <div className="flex-1 min-w-0">
              <p className="text-body text-text-high">{doc.name}</p>
              <p className="text-caption text-danger mt-0.5">
                {doc.status === 'missing' ? 'Не загружен' : doc.issues?.[0] || 'Требуется исправление'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0 ml-3" />
          </Link>
        ))}
      </div>
    </div>
  )
}
