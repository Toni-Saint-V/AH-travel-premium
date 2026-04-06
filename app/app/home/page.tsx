import { AppShell } from '@/components/layout/app-shell'
import { ActiveCaseCard } from '@/components/home/active-case-card'
import { QuickStats } from '@/components/home/quick-stats'
import { NextActionBanner } from '@/components/home/next-action-banner'
import { StartNewCase } from '@/components/home/start-new-case'
import { mockActiveCase, quickStats } from '@/lib/mock-data'

export default function HomePage() {
  const hasActiveCase = true // In production, this would come from user state

  return (
    <AppShell hideTopBar>
      <div className="px-4 pt-6 pb-6">
        {/* Header - welcoming but focused */}
        <header className="mb-6">
          <p className="text-caption text-text-mid mb-1">Добро пожаловать</p>
          <h1 className="text-h2 text-text-high">Ваш путь к поездке</h1>
        </header>

        <div className="space-y-5">
          {/* Next Action Banner - highest priority, always first */}
          {hasActiveCase && mockActiveCase.nextAction && (
            <NextActionBanner action={mockActiveCase.nextAction} />
          )}

          {/* Active Case Card - primary visual focus */}
          {hasActiveCase && (
            <ActiveCaseCard caseData={mockActiveCase} />
          )}

          {/* Quick Stats - scannable progress */}
          {hasActiveCase && (
            <QuickStats stats={quickStats} />
          )}

          {/* Start New Case - secondary option */}
          <StartNewCase hasActiveCase={hasActiveCase} />
        </div>
      </div>
    </AppShell>
  )
}
