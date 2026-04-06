import { FileText, CheckCircle2, Clock, AlertTriangle, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

const documents = [
  { name: 'Загранпаспорт', status: 'verified', icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10' },
  { name: 'Фотография', status: 'reviewing', icon: Clock, color: 'text-accent-2', bgColor: 'bg-accent-2/10' },
  { name: 'Выписка из банка', status: 'needs_fix', icon: AlertTriangle, color: 'text-warning', bgColor: 'bg-warning/10' },
  { name: 'Справка с работы', status: 'missing', icon: Upload, color: 'text-danger', bgColor: 'bg-danger/10' },
]

export function DocumentWalletPreview() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-2">
          Умный кошелёк документов
        </h2>
        <p className="text-body text-text-mid text-center mb-8">
          Чек-лист, статусы, проверка и переиспользование
        </p>

        <div className="surface-1 rounded-xl border border-border-hairline overflow-hidden">
          {/* Progress header */}
          <div className="p-4 border-b border-border-hairline">
            <div className="flex items-center justify-between mb-2">
              <span className="text-label text-text-high">Готовность</span>
              <span className="text-h3 text-accent">50%</span>
            </div>
            <div className="h-1.5 bg-bg-2 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-accent rounded-full" />
            </div>
          </div>

          {/* Document list */}
          <div className="divide-y divide-border-hairline">
            {documents.map((doc) => {
              const Icon = doc.icon
              return (
                <div
                  key={doc.name}
                  className="flex items-center gap-3 p-4"
                >
                  <div className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-lg',
                    doc.bgColor
                  )}>
                    <Icon className={cn('w-5 h-5', doc.color)} />
                  </div>
                  <div className="flex-1">
                    <div className="text-label text-text-high">{doc.name}</div>
                    <div className={cn('text-caption', doc.color)}>
                      {doc.status === 'verified' && 'Проверен'}
                      {doc.status === 'reviewing' && 'На проверке'}
                      {doc.status === 'needs_fix' && 'Требуется исправление'}
                      {doc.status === 'missing' && 'Не загружен'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
