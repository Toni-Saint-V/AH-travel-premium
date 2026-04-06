'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const countries = [
  { flag: '🇪🇸', name: 'Испания', type: 'Шенген', avgTime: '10-15 дней' },
  { flag: '🇫🇷', name: 'Франция', type: 'Шенген', avgTime: '12-18 дней' },
  { flag: '🇮🇹', name: 'Италия', type: 'Шенген', avgTime: '10-14 дней' },
  { flag: '🇬🇧', name: 'Великобритания', type: 'UK Visa', avgTime: '15-20 дней' },
  { flag: '🇺🇸', name: 'США', type: 'B1/B2', avgTime: '30-60 дней' },
]

export function CountryPreview() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-2">
          Популярные направления
        </h2>
        <p className="text-body text-text-mid text-center mb-8">
          Визы в более чем 50 стран
        </p>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {countries.map((country) => (
            <Link
              key={country.name}
              href={`/countries/${country.name.toLowerCase()}`}
              className={cn(
                'flex-shrink-0 w-[140px] p-4 rounded-xl',
                'surface-1 border border-border-hairline',
                'hover:surface-2 transition-fast',
                'active:scale-[0.98]'
              )}
            >
              <span className="text-3xl mb-3 block">{country.flag}</span>
              <h3 className="text-label text-text-high mb-0.5">{country.name}</h3>
              <p className="text-caption text-text-low">{country.type}</p>
              <p className="text-caption text-accent-2 mt-2">{country.avgTime}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/visas"
          className="flex items-center justify-center gap-1 mt-6 text-label text-accent hover:text-accent/80 transition-fast"
        >
          Все направления
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
