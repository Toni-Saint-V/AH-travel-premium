import { AppShell } from '@/components/layout/app-shell'
import { JourneyHeader } from '@/components/journey/journey-header'
import { JourneyTimeline } from '@/components/journey/journey-timeline'
import { JourneyNextAction } from '@/components/journey/journey-next-action'
import { JourneyQuickLinks } from '@/components/journey/journey-quick-links'
import { JourneyAIStatus } from '@/components/journey/journey-ai-status'
import { mockActiveCase, caseStatusLabels } from '@/lib/mock-data'

export default function JourneyPage() {
  const bestScenario = mockActiveCase.scenarios.find(s => s.path === 'best')
  
  return (
    <AppShell title="Ваш путь">
      <div className="px-4 pt-4 pb-6">
        <div className="space-y-6">
          {/* Journey Header - destination, goal, status, dates */}
          <JourneyHeader 
            destination={mockActiveCase.destination}
            destinationFlag={mockActiveCase.destinationFlag}
            tripGoal={mockActiveCase.tripGoal}
            status={mockActiveCase.status}
            statusLabel={caseStatusLabels[mockActiveCase.status]}
            travelDates={mockActiveCase.travelDates}
          />

          {/* Next Action - highest priority, always visible */}
          <JourneyNextAction action={mockActiveCase.nextAction} />

          {/* AI Status Card - inline reasoning */}
          <JourneyAIStatus 
            insight={mockActiveCase.aiInsight || ''}
            scenarioTitle={bestScenario?.title || ''}
            successRate={bestScenario?.successRate || 0}
          />

          {/* Quick Links - secondary navigation */}
          <JourneyQuickLinks />

          {/* Timeline - progress visualization */}
          <JourneyTimeline events={mockActiveCase.timeline} />
        </div>
      </div>
    </AppShell>
  )
}
