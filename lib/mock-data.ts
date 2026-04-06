/**
 * AH Travel Premium Mock Data
 * Structured data for development and demos
 */

// ============================================
// CASE TYPES
// ============================================

export type CaseStatus =
  | 'new'
  | 'assessing'
  | 'assessed'
  | 'need_improvement'
  | 'collecting_documents'
  | 'ready_to_apply'
  | 'applying'
  | 'waiting_decision'
  | 'approved'
  | 'rejected'
  | 'travel_ready'
  | 'completed'

export type DocumentStatus =
  | 'missing'
  | 'uploaded'
  | 'reviewing'
  | 'needs_fix'
  | 'verified'
  | 'expired'

export type ScenarioPath = 'best' | 'alternative' | 'rejected'

export interface Risk {
  id: string
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  recommendation?: string
}

export interface Signal {
  id: string
  type: 'positive' | 'neutral'
  title: string
  description: string
}

export interface Document {
  id: string
  type: string
  name: string
  status: DocumentStatus
  travelerId: string
  uploadedAt?: string
  expiryDate?: string
  issues?: string[]
  isReusable: boolean
}

export interface Scenario {
  id: string
  path: ScenarioPath
  title: string
  description: string
  successRate: number
  processingTime: string
  risks: Risk[]
  positiveSignals: Signal[]
  recommended: boolean
}

export interface PricingBreakdown {
  serviceFee: number
  serviceFeeLabel: string
  externalFees: { label: string; amount: number }[]
  addOns: { label: string; amount: number; selected: boolean }[]
  total: number
  currency: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description?: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface NextAction {
  id: string
  type: 'primary' | 'secondary'
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  urgency?: 'high' | 'normal'
}

export interface Case {
  id: string
  status: CaseStatus
  destination: string
  destinationFlag: string
  tripGoal: string
  travelDates: { start: string; end: string }
  scenarios: Scenario[]
  selectedScenario?: Scenario
  documents: Document[]
  pricing: PricingBreakdown
  timeline: TimelineEvent[]
  nextAction: NextAction
  aiInsight?: string
  createdAt: string
  updatedAt: string
}

// ============================================
// MOCK ACTIVE CASE
// ============================================

export const mockActiveCase: Case = {
  id: 'case-001',
  status: 'collecting_documents',
  destination: 'Испания',
  destinationFlag: '🇪🇸',
  tripGoal: 'Туристическая поездка',
  travelDates: {
    start: '2026-06-15',
    end: '2026-06-28',
  },
  scenarios: [
    {
      id: 'scenario-1',
      path: 'best',
      title: 'Шенгенская виза через Испанию',
      description: 'Прямая подача документов в визовый центр Испании. Оптимальный путь с учётом вашего профиля.',
      successRate: 94,
      processingTime: '10-15 рабочих дней',
      risks: [
        {
          id: 'risk-1',
          severity: 'low',
          title: 'Первая шенгенская виза',
          description: 'У вас нет истории шенгенских виз, что может незначительно увеличить время рассмотрения.',
          recommendation: 'Приложите подробное описание маршрута и подтверждение брони.',
        },
      ],
      positiveSignals: [
        {
          id: 'signal-1',
          type: 'positive',
          title: 'Стабильный доход',
          description: 'Ваш подтверждённый доход значительно превышает минимальные требования.',
        },
        {
          id: 'signal-2',
          type: 'positive',
          title: 'Недвижимость в собственности',
          description: 'Наличие недвижимости — сильный аргумент в пользу возвращения.',
        },
      ],
      recommended: true,
    },
    {
      id: 'scenario-2',
      path: 'alternative',
      title: 'Шенген через Францию',
      description: 'Альтернативный маршрут: подача через визовый центр Франции с транзитом.',
      successRate: 87,
      processingTime: '12-18 рабочих дней',
      risks: [
        {
          id: 'risk-2',
          severity: 'medium',
          title: 'Несоответствие основного направления',
          description: 'Испания указана как основная цель, но подача через Францию.',
        },
      ],
      positiveSignals: [
        {
          id: 'signal-3',
          type: 'positive',
          title: 'Больше слотов на запись',
          description: 'В визовом центре Франции больше доступных дат для записи.',
        },
      ],
      recommended: false,
    },
    {
      id: 'scenario-3',
      path: 'rejected',
      title: 'Подача без финансовых документов',
      description: 'Этот путь не рекомендуется из-за высокого риска отказа.',
      successRate: 23,
      processingTime: '7-10 рабочих дней',
      risks: [
        {
          id: 'risk-3',
          severity: 'high',
          title: 'Недостаточное финансовое обеспечение',
          description: 'Без подтверждения дохода вероятность отказа крайне высока.',
        },
      ],
      positiveSignals: [],
      recommended: false,
    },
  ],
  documents: [
    {
      id: 'doc-1',
      type: 'passport',
      name: 'Загранпаспорт',
      status: 'verified',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-01',
      expiryDate: '2030-08-15',
      isReusable: true,
    },
    {
      id: 'doc-2',
      type: 'photo',
      name: 'Фотография 3.5×4.5',
      status: 'uploaded',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-02',
      isReusable: false,
    },
    {
      id: 'doc-3',
      type: 'bank_statement',
      name: 'Выписка из банка',
      status: 'needs_fix',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-02',
      issues: ['Выписка должна быть за последние 3 месяца', 'Не хватает печати банка'],
      isReusable: false,
    },
    {
      id: 'doc-4',
      type: 'employment',
      name: 'Справка с работы',
      status: 'missing',
      travelerId: 'traveler-1',
      isReusable: false,
    },
    {
      id: 'doc-5',
      type: 'insurance',
      name: 'Страховой полис',
      status: 'missing',
      travelerId: 'traveler-1',
      isReusable: false,
    },
    {
      id: 'doc-6',
      type: 'hotel',
      name: 'Бронирование отеля',
      status: 'reviewing',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-03',
      isReusable: false,
    },
  ],
  pricing: {
    serviceFee: 4900,
    serviceFeeLabel: 'Сервисный сбор AH Travel',
    externalFees: [
      { label: 'Консульский сбор', amount: 8000 },
      { label: 'Сервисный сбор визового центра', amount: 2500 },
    ],
    addOns: [
      { label: 'VIP-сопровождение в визовом центре', amount: 3500, selected: false },
      { label: 'Срочное рассмотрение', amount: 5000, selected: false },
      { label: 'Страховой полис (14 дней)', amount: 1200, selected: true },
    ],
    total: 16600,
    currency: '₽',
  },
  timeline: [
    {
      id: 'event-1',
      date: '2026-04-01',
      title: 'Заявка создана',
      description: 'Вы начали оформление визы в Испанию.',
      status: 'completed',
    },
    {
      id: 'event-2',
      date: '2026-04-02',
      title: 'Оценка профиля',
      description: 'AI-анализ вашего профиля завершён. Рекомендован лучший путь.',
      status: 'completed',
    },
    {
      id: 'event-3',
      date: '2026-04-05',
      title: 'Сбор документов',
      description: '4 из 6 документов загружены.',
      status: 'current',
    },
    {
      id: 'event-4',
      date: '—',
      title: 'Проверка документов',
      description: 'Финальная проверка перед подачей.',
      status: 'upcoming',
    },
    {
      id: 'event-5',
      date: '—',
      title: 'Подача заявления',
      description: 'Визит в визовый центр.',
      status: 'upcoming',
    },
    {
      id: 'event-6',
      date: '—',
      title: 'Ожидание решения',
      description: 'Консульство рассматривает заявление.',
      status: 'upcoming',
    },
  ],
  nextAction: {
    id: 'action-1',
    type: 'primary',
    title: 'Загрузите недостающие документы',
    description: 'Осталось 2 документа. Исправьте выписку из банка и добавьте справку с работы.',
    ctaLabel: 'Перейти к документам',
    ctaHref: '/app/documents',
    urgency: 'high',
  },
  aiInsight: 'Ваш профиль оценивается как сильный. Основной риск — первая шенгенская виза. Рекомендую приложить максимально подробный маршрут и подтверждение финансовой состоятельности.',
  createdAt: '2026-04-01T10:00:00Z',
  updatedAt: '2026-04-05T14:30:00Z',
}

// ============================================
// STATUS LABELS
// ============================================

export const caseStatusLabels: Record<CaseStatus, string> = {
  new: 'Новая заявка',
  assessing: 'Оценка профиля',
  assessed: 'Профиль оценён',
  need_improvement: 'Требуется улучшение',
  collecting_documents: 'Сбор документов',
  ready_to_apply: 'Готово к подаче',
  applying: 'Подача заявления',
  waiting_decision: 'Ожидание решения',
  approved: 'Одобрено',
  rejected: 'Отказ',
  travel_ready: 'Готово к поездке',
  completed: 'Завершено',
}

export const documentStatusLabels: Record<DocumentStatus, string> = {
  missing: 'Не загружен',
  uploaded: 'Загружен',
  reviewing: 'На проверке',
  needs_fix: 'Требуется исправление',
  verified: 'Проверен',
  expired: 'Истёк срок',
}

// ============================================
// QUICK STATS FOR HOMEPAGE
// ============================================

export const quickStats = {
  documentsReady: 4,
  documentsTotal: 6,
  daysUntilTrip: 71,
  applicationProgress: 45,
}
