/**
 * AH Travel Premium Mock Data
 * Single source of truth for all case state
 * All derived values computed from core case data
 */

// ============================================
// CASE TYPES
// ============================================

export type CaseStatus =
  | 'new'
  | 'assessing'
  | 'assessed'
  | 'collecting_documents'
  | 'documents_ready'
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

export type DocumentPriority = 'critical' | 'recommended' | 'optional'

export type ScenarioPath = 'recommended' | 'alternative' | 'not_recommended'

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface Risk {
  id: string
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  recommendation?: string
  isBlocker: boolean
}

export interface Signal {
  id: string
  type: 'strength' | 'neutral'
  title: string
  description: string
  weight: 'high' | 'medium' | 'low'
}

export interface Document {
  id: string
  type: string
  name: string
  status: DocumentStatus
  priority: DocumentPriority
  travelerId: string
  uploadedAt?: string
  expiryDate?: string
  issues?: string[]
  requirements?: string[]
  isReusable: boolean
}

export interface Scenario {
  id: string
  path: ScenarioPath
  title: string
  description: string
  confidence: ConfidenceLevel
  processingTime: string
  risks: Risk[]
  strengths: Signal[]
  whyThisPath: string
  whatImproves: string[]
}

export interface PricingBreakdown {
  serviceFee: number
  serviceFeeLabel: string
  externalFees: { label: string; amount: number; paymentTime: 'now' | 'later' }[]
  addOns: { id: string; label: string; description: string; amount: number; selected: boolean }[]
  currency: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description?: string
  status: 'completed' | 'current' | 'upcoming' | 'blocked'
}

export interface NextAction {
  id: string
  type: 'blocker' | 'recommended' | 'info'
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export interface Case {
  id: string
  status: CaseStatus
  destination: string
  destinationFlag: string
  tripGoal: string
  travelDates: { start: string; end: string }
  scenarios: Scenario[]
  selectedScenarioId: string
  documents: Document[]
  pricing: PricingBreakdown
  timeline: TimelineEvent[]
  aiSummary: string
  blockerSummary?: string
  createdAt: string
  updatedAt: string
}

// ============================================
// COMPUTED HELPERS
// ============================================

export function getDocumentStats(documents: Document[]) {
  const verified = documents.filter(d => d.status === 'verified').length
  const uploaded = documents.filter(d => d.status === 'uploaded').length
  const reviewing = documents.filter(d => d.status === 'reviewing').length
  const needsFix = documents.filter(d => d.status === 'needs_fix').length
  const missing = documents.filter(d => d.status === 'missing').length
  const expired = documents.filter(d => d.status === 'expired').length
  const total = documents.length
  
  const blockers = needsFix + missing
  const ready = verified
  const inProgress = uploaded + reviewing
  const readyPercentage = total > 0 ? Math.round((verified / total) * 100) : 0
  
  return { verified, uploaded, reviewing, needsFix, missing, expired, total, blockers, ready, inProgress, readyPercentage }
}

export function getCriticalDocuments(documents: Document[]) {
  return documents.filter(d => d.priority === 'critical' && (d.status === 'missing' || d.status === 'needs_fix'))
}

export function getBlockers(caseData: Case): string[] {
  const blockers: string[] = []
  const criticalMissing = getCriticalDocuments(caseData.documents)
  
  if (criticalMissing.length > 0) {
    blockers.push(`${criticalMissing.length} обязательных документов требуют внимания`)
  }
  
  const selectedScenario = caseData.scenarios.find(s => s.id === caseData.selectedScenarioId)
  if (selectedScenario) {
    const highRisks = selectedScenario.risks.filter(r => r.isBlocker)
    highRisks.forEach(r => blockers.push(r.title))
  }
  
  return blockers
}

export function getNextAction(caseData: Case): NextAction {
  const stats = getDocumentStats(caseData.documents)
  const criticalMissing = getCriticalDocuments(caseData.documents)
  
  // Priority 1: Critical missing documents
  if (criticalMissing.length > 0) {
    const doc = criticalMissing[0]
    return {
      id: 'action-doc',
      type: 'blocker',
      title: `Загрузите: ${doc.name}`,
      description: doc.requirements?.[0] || 'Этот документ обязателен для подачи заявления',
      ctaLabel: 'Загрузить документ',
      ctaHref: `/app/documents/${doc.id}`,
    }
  }
  
  // Priority 2: Documents with issues
  const withIssues = caseData.documents.filter(d => d.status === 'needs_fix')
  if (withIssues.length > 0) {
    const doc = withIssues[0]
    return {
      id: 'action-fix',
      type: 'blocker',
      title: `Исправьте: ${doc.name}`,
      description: doc.issues?.[0] || 'Документ требует корректировки',
      ctaLabel: 'Исправить',
      ctaHref: `/app/documents/${doc.id}`,
    }
  }
  
  // Priority 3: All documents ready
  if (stats.verified === stats.total) {
    return {
      id: 'action-checkout',
      type: 'recommended',
      title: 'Все документы готовы',
      description: 'Можно переходить к оформлению и оплате',
      ctaLabel: 'Перейти к оплате',
      ctaHref: '/app/checkout',
    }
  }
  
  // Priority 4: Documents in review
  if (stats.reviewing > 0) {
    return {
      id: 'action-wait',
      type: 'info',
      title: 'Документы на проверке',
      description: `${stats.reviewing} документов проверяются. Обычно это занимает 1-2 рабочих дня.`,
      ctaLabel: 'Посмотреть статус',
      ctaHref: '/app/documents',
    }
  }
  
  // Default
  return {
    id: 'action-docs',
    type: 'recommended',
    title: 'Продолжите сбор документов',
    description: `Загружено ${stats.uploaded + stats.verified} из ${stats.total}`,
    ctaLabel: 'К документам',
    ctaHref: '/app/documents',
  }
}

export function getDaysUntilTrip(startDate: string): number {
  const start = new Date(startDate)
  const now = new Date()
  const diffTime = start.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

export function getCaseProgress(caseData: Case): number {
  const statusWeights: Record<CaseStatus, number> = {
    new: 5,
    assessing: 15,
    assessed: 25,
    collecting_documents: 40,
    documents_ready: 60,
    ready_to_apply: 70,
    applying: 80,
    waiting_decision: 85,
    approved: 95,
    rejected: 100,
    travel_ready: 100,
    completed: 100,
  }
  
  const baseProgress = statusWeights[caseData.status]
  
  // Add document progress within collecting_documents phase
  if (caseData.status === 'collecting_documents') {
    const stats = getDocumentStats(caseData.documents)
    const docProgress = (stats.verified / stats.total) * 20 // 20% of progress is documents
    return Math.round(baseProgress + docProgress)
  }
  
  return baseProgress
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
      path: 'recommended',
      title: 'Шенгенская виза через Испанию',
      description: 'Прямая подача документов в визовый центр Испании.',
      confidence: 'high',
      processingTime: '10-15 рабочих дней',
      whyThisPath: 'Ваш профиль хорошо подходит для получения шенгенской визы. Стабильный доход и наличие недвижимости — сильные аргументы. Основной момент: это первая шенгенская виза, поэтому важно тщательно подготовить документы.',
      whatImproves: [
        'Добавить подробный маршрут по дням',
        'Приложить бронь отеля с возможностью отмены',
        'Показать историю других поездок (если есть)',
      ],
      risks: [
        {
          id: 'risk-1',
          severity: 'medium',
          title: 'Первая шенгенская виза',
          description: 'Без визовой истории консул может запросить дополнительные документы.',
          recommendation: 'Приложите максимально подробный маршрут и подтверждение связей с родиной.',
          isBlocker: false,
        },
      ],
      strengths: [
        {
          id: 'strength-1',
          type: 'strength',
          title: 'Стабильный доход',
          description: 'Подтверждённый доход значительно превышает минимальные требования.',
          weight: 'high',
        },
        {
          id: 'strength-2',
          type: 'strength',
          title: 'Недвижимость в собственности',
          description: 'Сильный аргумент привязанности к стране проживания.',
          weight: 'high',
        },
        {
          id: 'strength-3',
          type: 'strength',
          title: 'Официальное трудоустройство',
          description: 'Работа по найму более 2 лет на одном месте.',
          weight: 'medium',
        },
      ],
    },
    {
      id: 'scenario-2',
      path: 'alternative',
      title: 'Шенген через Францию',
      description: 'Подача через визовый центр Франции с транзитом через Париж.',
      confidence: 'medium',
      processingTime: '12-18 рабочих дней',
      whyThisPath: 'Этот путь возможен, если добавить транзит через Францию. Однако основное направление — Испания, поэтому подача через Францию может вызвать вопросы.',
      whatImproves: [
        'Добавить минимум 2 ночи во Франции',
        'Обосновать выбор французского ВЦ',
      ],
      risks: [
        {
          id: 'risk-2',
          severity: 'medium',
          title: 'Несоответствие основного направления',
          description: 'Испания указана как основная цель, но подача через Францию.',
          isBlocker: false,
        },
      ],
      strengths: [
        {
          id: 'strength-4',
          type: 'strength',
          title: 'Больше слотов на запись',
          description: 'В визовом центре Франции больше доступных дат.',
          weight: 'low',
        },
      ],
    },
    {
      id: 'scenario-3',
      path: 'not_recommended',
      title: 'Подача без финансовых документов',
      description: 'Этот путь не рекомендуется из-за высокого риска отказа.',
      confidence: 'low',
      processingTime: '7-10 рабочих дней',
      whyThisPath: 'Без подтверждения дохода шансы на одобрение минимальны. Консул обязан убедиться в финансовой состоятельности заявителя.',
      whatImproves: [
        'Обязательно добавить справку с работы',
        'Обязательно добавить выписку из банка',
      ],
      risks: [
        {
          id: 'risk-3',
          severity: 'high',
          title: 'Недостаточное финансовое обеспечение',
          description: 'Без подтверждения дохода вероятность отказа очень высока.',
          isBlocker: true,
        },
      ],
      strengths: [],
    },
  ],
  selectedScenarioId: 'scenario-1',
  documents: [
    {
      id: 'doc-1',
      type: 'passport',
      name: 'Загранпаспорт',
      status: 'verified',
      priority: 'critical',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-01',
      expiryDate: '2030-08-15',
      requirements: [
        'Срок действия минимум 3 месяца после возвращения',
        'Минимум 2 пустые страницы',
        'Без повреждений',
      ],
      isReusable: true,
    },
    {
      id: 'doc-2',
      type: 'photo',
      name: 'Фотография 3.5×4.5',
      status: 'verified',
      priority: 'critical',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-02',
      requirements: [
        'Размер 3.5×4.5 см',
        'Белый фон',
        'Сделана не более 6 месяцев назад',
      ],
      isReusable: false,
    },
    {
      id: 'doc-3',
      type: 'bank_statement',
      name: 'Выписка из банка',
      status: 'needs_fix',
      priority: 'critical',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-02',
      requirements: [
        'За последние 3 месяца',
        'С печатью банка',
        'Минимум 50 000 ₽ на счёте',
      ],
      issues: [
        'Выписка за 1 месяц, нужно за 3',
        'Отсутствует печать банка',
      ],
      isReusable: false,
    },
    {
      id: 'doc-4',
      type: 'employment',
      name: 'Справка с работы',
      status: 'missing',
      priority: 'critical',
      travelerId: 'traveler-1',
      requirements: [
        'На фирменном бланке',
        'С указанием должности и оклада',
        'С датой выдачи не старше 1 месяца',
      ],
      isReusable: false,
    },
    {
      id: 'doc-5',
      type: 'insurance',
      name: 'Страховой полис',
      status: 'missing',
      priority: 'critical',
      travelerId: 'traveler-1',
      requirements: [
        'Покрытие минимум 30 000 EUR',
        'Действителен на всей территории Шенгена',
        'Покрывает весь период поездки + 15 дней',
      ],
      isReusable: false,
    },
    {
      id: 'doc-6',
      type: 'hotel',
      name: 'Бронирование отеля',
      status: 'reviewing',
      priority: 'recommended',
      travelerId: 'traveler-1',
      uploadedAt: '2026-04-03',
      requirements: [
        'На все даты пребывания',
        'С указанием имени заявителя',
        'Подтверждение бронирования (не скриншот)',
      ],
      isReusable: false,
    },
  ],
  pricing: {
    serviceFee: 4900,
    serviceFeeLabel: 'Сервисный сбор AH Travel',
    externalFees: [
      { label: 'Консульский сбор', amount: 8000, paymentTime: 'later' },
      { label: 'Сервисный сбор визового центра', amount: 2500, paymentTime: 'later' },
    ],
    addOns: [
      { 
        id: 'vip',
        label: 'VIP-сопровождение', 
        description: 'Личный менеджер в визовом центре',
        amount: 3500, 
        selected: false 
      },
      { 
        id: 'express',
        label: 'Срочное рассмотрение', 
        description: 'Сокращение срока до 3-5 дней',
        amount: 5000, 
        selected: false 
      },
      { 
        id: 'insurance',
        label: 'Страховой полис', 
        description: 'Покрытие 35 000 EUR на 14 дней',
        amount: 1200, 
        selected: true 
      },
    ],
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
      title: 'Профиль оценён',
      description: 'AI-анализ завершён. Выбран оптимальный путь.',
      status: 'completed',
    },
    {
      id: 'event-3',
      date: '2026-04-05',
      title: 'Сбор документов',
      description: '2 из 6 документов проверены. 3 требуют внимания.',
      status: 'current',
    },
    {
      id: 'event-4',
      date: '—',
      title: 'Все документы готовы',
      description: 'Финальная проверка перед подачей.',
      status: 'upcoming',
    },
    {
      id: 'event-5',
      date: '—',
      title: 'Запись в визовый центр',
      description: 'Выбор даты и времени визита.',
      status: 'upcoming',
    },
    {
      id: 'event-6',
      date: '—',
      title: 'Подача документов',
      description: 'Визит в визовый центр.',
      status: 'upcoming',
    },
    {
      id: 'event-7',
      date: '—',
      title: 'Ожидание решения',
      description: '10-15 рабочих дней.',
      status: 'upcoming',
    },
  ],
  aiSummary: 'Ваш профиль оценивается положительно. Ключевые сильные стороны: стабильный доход и недвижимость. Для первой шенгенской визы важно тщательно подготовить документы — сейчас не хватает справки с работы и страховки. Выписку из банка нужно обновить.',
  blockerSummary: 'Не хватает 2 обязательных документов. Выписка требует исправления.',
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
  collecting_documents: 'Сбор документов',
  documents_ready: 'Документы готовы',
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

export const confidenceLevelLabels: Record<ConfidenceLevel, string> = {
  high: 'Высокая уверенность',
  medium: 'Средняя уверенность',
  low: 'Низкая уверенность',
}
