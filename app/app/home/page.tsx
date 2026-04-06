import { AppShell } from '@/components/layout/app-shell'
import { CaseCommandCenter } from '@/components/home/case-command-center'
import { StartNewCase } from '@/components/home/start-new-case'
import { mockActiveCase } from '@/lib/mock-data'

export default function HomePage() {
  const hasActiveCase = true // In production, from user state

  return (
    <AppShell hideTopBar>
      <div className="px-4 pt-6 pb-6">
        {/* Header - minimal */}
        <header className="mb-8">
          <p className="text-caption text-text-low mb-1">AH Travel</p>
          <h1 className="text-display text-text-high">Ваша заявка</h1>
        </header>

        {/* Content */}
        {hasActiveCase ? (
          <CaseCommandCenter caseData={mockActiveCase} />
        ) : (
          <StartNewCase />
        )}
      </div>
    </AppShell>
  )
}
