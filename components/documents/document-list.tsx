'use client'

import Link from 'next/link'
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle,
  ChevronRight,
  Calendar
} from 'lucide-react'
import { Document, DocumentStatus, documentStatusLabels } from '@/lib/mock-data'
import { StatusBadge } from '@/components/ui/status-badge'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'

interface DocumentListProps {
  documents: Document[]
}

const statusConfig: Record<DocumentStatus, {
  icon: React.ComponentType<{ className?: string }>
  variant: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
  sortOrder: number
}> = {
  missing: { icon: Upload, variant: 'danger', sortOrder: 0 },
  needs_fix: { icon: AlertTriangle, variant: 'warning', sortOrder: 1 },
  uploaded: { icon: Clock, variant: 'info', sortOrder: 2 },
  reviewing: { icon: Clock, variant: 'info', sortOrder: 3 },
  verified: { icon: CheckCircle2, variant: 'success', sortOrder: 4 },
  expired: { icon: Calendar, variant: 'danger', sortOrder: 5 },
}

export function DocumentList({ documents }: DocumentListProps) {
  // Group and sort: needs action first, then in progress, then complete
  const needsAction = documents
    .filter(d => d.status === 'missing' || d.status === 'needs_fix' || d.status === 'expired')
    .sort((a, b) => statusConfig[a.status].sortOrder - statusConfig[b.status].sortOrder)
  
  const inProgress = documents
    .filter(d => d.status === 'uploaded' || d.status === 'reviewing')
  
  const complete = documents
    .filter(d => d.status === 'verified')

  return (
    <div className="space-y-6">
      {/* Needs Action */}
      {needsAction.length > 0 && (
        <section>
          <SectionHeader 
            title="Требуют действий" 
            subtitle={`${needsAction.length} ${needsAction.length === 1 ? 'документ' : 'документа'}`}
            className="mb-3"
          />
          <div className="space-y-2">
            {needsAction.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </section>
      )}

      {/* In Progress */}
      {inProgress.length > 0 && (
        <section>
          <SectionHeader 
            title="На проверке" 
            subtitle={`${inProgress.length} ${inProgress.length === 1 ? 'документ' : 'документа'}`}
            className="mb-3"
          />
          <div className="space-y-2">
            {inProgress.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </section>
      )}

      {/* Complete */}
      {complete.length > 0 && (
        <section>
          <SectionHeader 
            title="Проверены" 
            subtitle={`${complete.length} ${complete.length === 1 ? 'документ' : 'документа'}`}
            className="mb-3"
          />
          <div className="space-y-2">
            {complete.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function DocumentCard({ document }: { document: Document }) {
  const config = statusConfig[document.status]
  const Icon = config.icon
  const hasIssues = document.issues && document.issues.length > 0

  return (
    <Link
      href={`/app/documents/${document.id}`}
      className={cn(
        'flex items-center gap-3 p-4 rounded-xl border transition-fast',
        'surface-1 border-border-hairline hover:surface-2',
        'active:scale-[0.99]',
        (document.status === 'missing' || document.status === 'needs_fix') && 'border-l-2 border-l-danger'
      )}
    >
      {/* Icon */}
      <div className={cn(
        'flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0',
        document.status === 'verified' ? 'bg-success/10' :
        document.status === 'missing' || document.status === 'needs_fix' || document.status === 'expired' ? 'bg-danger/10' :
        'bg-accent-2/10'
      )}>
        <Icon className={cn(
          'w-5 h-5',
          document.status === 'verified' ? 'text-success' :
          document.status === 'missing' || document.status === 'needs_fix' || document.status === 'expired' ? 'text-danger' :
          'text-accent-2'
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-label text-text-high truncate">{document.name}</h3>
          {document.isReusable && (
            <span className="text-caption text-accent-2 flex-shrink-0">Многоразовый</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <StatusBadge variant={config.variant} dot>
            {documentStatusLabels[document.status]}
          </StatusBadge>
          
          {document.expiryDate && document.status === 'verified' && (
            <span className="text-caption text-text-low">
              до {new Date(document.expiryDate).toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'short',
                year: 'numeric'
              })}
            </span>
          )}
        </div>

        {/* Issues preview */}
        {hasIssues && (
          <p className="text-caption text-danger mt-1 line-clamp-1">
            {document.issues![0]}
          </p>
        )}
      </div>

      <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0" />
    </Link>
  )
}
