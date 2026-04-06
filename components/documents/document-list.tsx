'use client'

import Link from 'next/link'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { Document, DocumentStatus, documentStatusLabels } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface DocumentListProps {
  documents: Document[]
}

const statusConfig: Record<DocumentStatus, { color: string; dotColor: string }> = {
  missing: { color: 'text-danger', dotColor: 'bg-danger' },
  needs_fix: { color: 'text-warning', dotColor: 'bg-warning' },
  expired: { color: 'text-danger', dotColor: 'bg-danger' },
  uploaded: { color: 'text-accent-2', dotColor: 'bg-accent-2' },
  reviewing: { color: 'text-accent-2', dotColor: 'bg-accent-2' },
  verified: { color: 'text-success', dotColor: 'bg-success' },
}

export function DocumentList({ documents }: DocumentListProps) {
  // Group: needs action, in progress, complete
  const needsAction = documents.filter(d => d.status === 'missing' || d.status === 'needs_fix' || d.status === 'expired')
  const inProgress = documents.filter(d => d.status === 'uploaded' || d.status === 'reviewing')
  const complete = documents.filter(d => d.status === 'verified')

  return (
    <div className="space-y-8">
      {/* Needs Action */}
      {needsAction.length > 0 && (
        <section>
          <p className="text-caption text-text-low uppercase tracking-widest mb-4">Требуют действий</p>
          <div className="space-y-1">
            {needsAction.map(doc => <DocumentRow key={doc.id} document={doc} />)}
          </div>
        </section>
      )}

      {/* In Progress */}
      {inProgress.length > 0 && (
        <section>
          <p className="text-caption text-text-low uppercase tracking-widest mb-4">На проверке</p>
          <div className="space-y-1">
            {inProgress.map(doc => <DocumentRow key={doc.id} document={doc} />)}
          </div>
        </section>
      )}

      {/* Complete - quietest */}
      {complete.length > 0 && (
        <section>
          <p className="text-caption text-text-low/60 uppercase tracking-widest mb-4">Проверены</p>
          <div className="space-y-1">
            {complete.map(doc => <DocumentRow key={doc.id} document={doc} muted />)}
          </div>
        </section>
      )}
    </div>
  )
}

function DocumentRow({ document, muted = false }: { document: Document; muted?: boolean }) {
  const config = statusConfig[document.status]
  const isComplete = document.status === 'verified'

  return (
    <Link
      href={`/app/documents/${document.id}`}
      className={cn(
        'flex items-center gap-3 py-3 -mx-2 px-2 rounded-lg transition-fast',
        'hover:bg-bg-1 active:bg-bg-2'
      )}
    >
      {/* Status indicator */}
      {isComplete ? (
        <CheckCircle2 className={cn('w-5 h-5 flex-shrink-0', muted ? 'text-success/40' : 'text-success')} />
      ) : (
        <div className={cn('w-5 h-5 flex items-center justify-center flex-shrink-0')}>
          <div className={cn('w-2 h-2 rounded-full', config.dotColor)} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-body truncate', muted ? 'text-text-mid' : 'text-text-high')}>
          {document.name}
        </p>
        {!isComplete && (
          <p className={cn('text-caption', config.color)}>
            {documentStatusLabels[document.status]}
          </p>
        )}
      </div>

      <ChevronRight className={cn('w-4 h-4 flex-shrink-0', muted ? 'text-text-low/30' : 'text-text-low')} />
    </Link>
  )
}
