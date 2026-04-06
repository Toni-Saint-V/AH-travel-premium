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
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <p className="text-caption text-text-mid">Добро пожаловать</p>
          <h1 className="text-h2 text-text-high">Ваш путь к поездке</h1>
        </header>

        {/* Next Action Banner - highest priority */}
        {hasActiveCase && mockActiveCase.nextAction && (
          <NextActionBanner action={mockActiveCase.nextAction} />
        )}

        {/* Active Case Card */}
        {hasActiveCase && (
          <ActiveCaseCard caseData={mockActiveCase} />
        )}

        {/* Quick Stats */}
        {hasActiveCase && (
          <QuickStats stats={quickStats} />
        )}

        {/* Start New Case */}
        <StartNewCase hasActiveCase={hasActiveCase} />
      </div>
    </AppShell>
  )
}
