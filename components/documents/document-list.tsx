'use client'

import Link from 'next/link'
import { 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight,
  Calendar
} from 'lucide-react'
import { Document, DocumentStatus, documentStatusLabels } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface DocumentListProps {
  documents: Document[]
}

const statusConfig: Record<DocumentStatus, {
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  sortOrder: number
}> = {
  missing: { icon: Upload, color: 'text-danger', bg: 'bg-danger/10', sortOrder: 0 },
  needs_fix: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', sortOrder: 1 },
  expired: { icon: Calendar, color: 'text-danger', bg: 'bg-danger/10', sortOrder: 2 },
  uploaded: { icon: Clock, color: 'text-accent-2', bg: 'bg-accent-2/10', sortOrder: 3 },
  reviewing: { icon: Clock, color: 'text-accent-2', bg: 'bg-accent-2/10', sortOrder: 4 },
  verified: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', sortOrder: 5 },
}

export function DocumentList({ documents }: DocumentListProps) {
  // Group: needs action, in progress, complete
  const needsAction = documents
    .filter(d => d.status === 'missing' || d.status === 'needs_fix' || d.status === 'expired')
    .sort((a, b) => statusConfig[a.status].sortOrder - statusConfig[b.status].sortOrder)
  
  const inProgress = documents
    .filter(d => d.status === 'uploaded' || d.status === 'reviewing')
  
  const complete = documents
    .filter(d => d.status === 'verified')

  return (
    <div className="space-y-6">
      {/* Needs Action - highest priority section */}
      {needsAction.length > 0 && (
        <section>
          <h2 className="text-label text-text-mid uppercase tracking-wider mb-3">
            Требуют действий ({needsAction.length})
          </h2>
          <div className="space-y-2">
            {needsAction.map(doc => (
              <DocumentRow key={doc.id} document={doc} priority="high" />
            ))}
          </div>
        </section>
      )}

      {/* In Progress */}
      {inProgress.length > 0 && (
        <section>
          <h2 className="text-label text-text-mid uppercase tracking-wider mb-3">
            На проверке ({inProgress.length})
          </h2>
          <div className="space-y-2">
            {inProgress.map(doc => (
              <DocumentRow key={doc.id} document={doc} priority="medium" />
            ))}
          </div>
        </section>
      )}

      {/* Complete - quietest */}
      {complete.length > 0 && (
        <section>
          <h2 className="text-label text-text-low uppercase tracking-wider mb-3">
            Проверены ({complete.length})
          </h2>
          <div className="space-y-2">
            {complete.map(doc => (
              <DocumentRow key={doc.id} document={doc} priority="low" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function DocumentRow({ 
  document, 
  priority 
}: { 
  document: Document
  priority: 'high' | 'medium' | 'low'
}) {
  const config = statusConfig[document.status]
  const Icon = config.icon
  const hasIssues = document.issues && document.issues.length > 0

  return (
    <Link
      href={`/app/documents/${document.id}`}
      className={cn(
        'flex items-center gap-3 p-4 rounded-xl border transition-fast',
        'hover:surface-2 active:scale-[0.995] active:translate-y-px',
        priority === 'high' && 'surface-1 border-border-hairline border-l-2 border-l-danger',
        priority === 'medium' && 'surface-1 border-border-hairline',
        priority === 'low' && 'bg-bg-1/50 border-border-hairline/50'
      )}
    >
      {/* Icon */}
      <div className={cn(
        'flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0',
        config.bg
      )}>
        <Icon className={cn('w-5 h-5', config.color)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className={cn(
            'text-label truncate',
            priority === 'low' ? 'text-text-mid' : 'text-text-high'
          )}>{document.name}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={cn('text-caption', config.color)}>
            {documentStatusLabels[document.status]}
          </span>
          
          {document.expiryDate && document.status === 'verified' && (
            <span className="text-caption text-text-low">
              · до {new Date(document.expiryDate).toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'short'
              })}
            </span>
          )}
        </div>

        {/* Issue preview - only for high priority */}
        {hasIssues && priority === 'high' && (
          <p className="text-caption text-danger mt-1 line-clamp-1">
            {document.issues![0]}
          </p>
        )}
      </div>

      <ChevronRight className={cn(
        'w-5 h-5 flex-shrink-0',
        priority === 'low' ? 'text-text-low/50' : 'text-text-low'
      )} />
    </Link>
  )
}
