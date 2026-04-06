'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'Как работает AI-оценка?',
    answer: 'Мы анализируем ваш профиль по десяткам параметров: история поездок, финансовое положение, цель визита, связи с родиной. На основе этих данных рассчитываем вероятность одобрения и показываем риски.',
  },
  {
    question: 'Это бесплатно?',
    answer: 'Первичная проверка шансов полностью бесплатна. Оплата требуется только если вы решите воспользоваться полным сопровождением с подготовкой документов.',
  },
  {
    question: 'Вы подаёте документы за меня?',
    answer: 'Мы готовим полный пакет документов и записываем вас в визовый центр. Подача происходит лично вами, но мы можем организовать VIP-сопровождение.',
  },
  {
    question: 'Что если мне откажут?',
    answer: 'Мы не даём 100% гарантий одобрения — это невозможно. Но мы честно показываем риски до подачи, и вы принимаете решение с полной информацией.',
  },
  {
    question: 'Могу ли я использовать документы повторно?',
    answer: 'Да. Загранпаспорт и другие долгосрочные документы сохраняются в вашем кошельке и автоматически подтягиваются в следующие заявки.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 px-4 surface-1 scroll-mt-16">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-8">
          Частые вопросы
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="rounded-xl border border-border-hairline overflow-hidden surface-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="text-label text-text-high">{faq.question}</span>
                  <ChevronDown className={cn(
                    'w-5 h-5 text-text-low flex-shrink-0 transition-transform',
                    isOpen && 'rotate-180'
                  )} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-body text-text-mid leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
