'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { OnboardingShell } from '@/components/layout/onboarding-shell'
import { SurfaceCard } from '@/components/ui/surface-card'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  title: string
  subtitle?: string
  aiHint?: string
  type: 'single'
  options: { value: string; label: string; description?: string }[]
}

const questions: Question[] = [
  {
    id: 'destination',
    title: 'Куда планируете поездку?',
    subtitle: 'Выберите основную страну назначения',
    type: 'single',
    options: [
      { value: 'spain', label: 'Испания', description: 'Шенгенская виза' },
      { value: 'france', label: 'Франция', description: 'Шенгенская виза' },
      { value: 'italy', label: 'Италия', description: 'Шенгенская виза' },
      { value: 'germany', label: 'Германия', description: 'Шенгенская виза' },
      { value: 'uk', label: 'Великобритания', description: 'UK Visa' },
      { value: 'usa', label: 'США', description: 'B1/B2 Visa' },
    ],
  },
  {
    id: 'purpose',
    title: 'Какова цель поездки?',
    subtitle: 'Это влияет на тип визы и требования',
    type: 'single',
    options: [
      { value: 'tourism', label: 'Туризм', description: 'Отдых, осмотр достопримечательностей' },
      { value: 'business', label: 'Бизнес', description: 'Встречи, конференции, переговоры' },
      { value: 'visit', label: 'Визит к родственникам', description: 'Посещение семьи или друзей' },
      { value: 'medical', label: 'Лечение', description: 'Медицинские процедуры' },
    ],
  },
  {
    id: 'travel_history',
    title: 'Были ли у вас шенгенские визы?',
    subtitle: 'История поездок влияет на оценку',
    aiHint: 'История успешных поездок повышает шансы на одобрение. Даже одна-две визы лучше, чем первая заявка.',
    type: 'single',
    options: [
      { value: 'multiple', label: 'Да, несколько', description: '3 и более виз за 5 лет' },
      { value: 'one_two', label: 'Да, 1-2 визы', description: 'За последние 5 лет' },
      { value: 'expired', label: 'Была, истекла давно', description: 'Более 5 лет назад' },
      { value: 'none', label: 'Нет, первая виза', description: 'Никогда не получал(а)' },
    ],
  },
  {
    id: 'employment',
    title: 'Ваш текущий статус занятости?',
    subtitle: 'Финансовая стабильность — важный фактор',
    aiHint: 'Официальное трудоустройство или свой бизнес — сильный аргумент. Для студентов и пенсионеров нужны дополнительные документы.',
    type: 'single',
    options: [
      { value: 'employed', label: 'Работаю по найму', description: 'Официальное трудоустройство' },
      { value: 'self_employed', label: 'Предприниматель / ИП', description: 'Свой бизнес' },
      { value: 'retired', label: 'Пенсионер', description: 'На пенсии' },
      { value: 'student', label: 'Студент', description: 'Очное обучение' },
      { value: 'unemployed', label: 'Не работаю', description: 'Временно без работы' },
    ],
  },
  {
    id: 'property',
    title: 'Есть ли у вас недвижимость?',
    subtitle: 'Связь с родиной — позитивный фактор',
    type: 'single',
    options: [
      { value: 'own', label: 'Да, в собственности', description: 'Квартира или дом' },
      { value: 'family', label: 'Семейная собственность', description: 'Оформлена на родственников' },
      { value: 'none', label: 'Нет недвижимости', description: 'Аренда или проживание с семьёй' },
    ],
  },
]

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100
  const isLastStep = currentStep === questions.length - 1
  const canProceed = answers[currentQuestion.id]

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = () => {
    if (isLastStep) {
      router.push('/app/result')
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <OnboardingShell
      title="Проверка шансов"
      progress={progress}
      showBack={currentStep > 0}
      onBack={handleBack}
      closeHref="/"
    >
      <div className="flex-1 flex flex-col px-4 pt-6 pb-6">
        {/* Question */}
        <div className="mb-6">
          <p className="text-caption text-text-mid mb-1">
            Вопрос {currentStep + 1} из {questions.length}
          </p>
          <h1 className="text-h2 text-text-high mb-1">{currentQuestion.title}</h1>
          {currentQuestion.subtitle && (
            <p className="text-body text-text-mid">{currentQuestion.subtitle}</p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2 flex-1">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-fast',
                  isSelected
                    ? 'surface-2 border-accent/40'
                    : 'surface-1 border-border-hairline hover:surface-2 hover:border-border-strong'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full border-2 flex-shrink-0 transition-fast',
                  isSelected
                    ? 'border-accent bg-accent'
                    : 'border-border-strong'
                )}>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-label text-text-high">{option.label}</div>
                  {option.description && (
                    <div className="text-caption text-text-mid mt-0.5">{option.description}</div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* AI Hint - contextual guidance */}
        {currentQuestion.aiHint && (
          <SurfaceCard className="mt-6 border-l-2 border-l-accent">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-caption text-text-mid leading-relaxed">
                {currentQuestion.aiHint}
              </p>
            </div>
          </SurfaceCard>
        )}

        {/* CTA */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={cn(
              'flex items-center justify-center gap-2 w-full h-12',
              'rounded-xl font-medium transition-fast touch-target',
              canProceed
                ? 'bg-accent text-white hover:bg-accent/90 active:scale-[0.98]'
                : 'surface-2 text-text-low cursor-not-allowed'
            )}
          >
            {isLastStep ? 'Получить результат' : 'Далее'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </OnboardingShell>
  )
}
