import { AppShell } from '@/components/layout/app-shell'
import { JourneyHeader } from '@/components/journey/journey-header'
import { JourneyTimeline } from '@/components/journey/journey-timeline'
import { JourneyNextAction } from '@/components/journey/journey-next-action'
import { JourneyQuickLinks } from '@/components/journey/journey-quick-links'
import { JourneyAIStatus } from '@/components/journey/journey-ai-status'
import { mockActiveCase, caseStatusLabels } from '@/lib/mock-data'

export default function JourneyPage() {
  return (
    <AppShell title="Ваш путь">
      <div className="px-4 py-6 space-y-6">
        {/* Journey Header with destination and status */}
        <JourneyHeader 
          destination={mockActiveCase.destination}
          destinationFlag={mockActiveCase.destinationFlag}
          tripGoal={mockActiveCase.tripGoal}
          status={mockActiveCase.status}
          statusLabel={caseStatusLabels[mockActiveCase.status]}
          travelDates={mockActiveCase.travelDates}
        />

        {/* AI Status Card */}
        <JourneyAIStatus 
          insight={mockActiveCase.aiInsight || ''}
          scenarioTitle={mockActiveCase.scenarios.find(s => s.path === 'best')?.title || ''}
          successRate={mockActiveCase.scenarios.find(s => s.path === 'best')?.successRate || 0}
        />

        {/* Next Action */}
        <JourneyNextAction action={mockActiveCase.nextAction} />

        {/* Quick Links */}
        <JourneyQuickLinks />

        {/* Timeline */}
        <JourneyTimeline events={mockActiveCase.timeline} />
      </div>
    </AppShell>
  )
}
