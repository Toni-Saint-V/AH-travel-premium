import { AppShell } from '@/components/layout/app-shell'
import { User, FileText, CreditCard, Bell, Settings, ChevronRight, LogOut } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    section: 'Аккаунт',
    items: [
      { icon: User, label: 'Личные данные', href: '#', description: 'Имя, контакты, паспорт', disabled: true },
      { icon: FileText, label: 'Мои документы', href: '/app/documents', description: 'Все загруженные файлы', disabled: false },
      { icon: CreditCard, label: 'История платежей', href: '#', description: 'Чеки и квитанции', disabled: true },
    ]
  },
  {
    section: 'Настройки',
    items: [
      { icon: Bell, label: 'Уведомления', href: '#', description: 'Push, email, SMS', disabled: true },
      { icon: Settings, label: 'Настройки', href: '#', description: 'Язык, тема, приватность', disabled: true },
    ]
  }
]

export default function ProfilePage() {
  return (
    <AppShell title="Профиль">
      <div className="px-4 pt-4 pb-6">
        {/* User header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
            <User className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h1 className="text-h2 text-text-high">Иван Петров</h1>
            <p className="text-caption text-text-mid">ivan.petrov@email.com</p>
          </div>
        </div>

        {/* Menu sections */}
        <div className="space-y-6">
          {menuItems.map((section) => (
            <div key={section.section}>
              <h2 className="text-caption text-text-low mb-3 px-1">{section.section}</h2>
              <div className="surface-1 rounded-xl border border-border-hairline overflow-hidden divide-y divide-border-hairline">
                {section.items.map((item) => {
                  const Icon = item.icon
                  
                  if (item.disabled) {
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-4 p-4 opacity-50 cursor-not-allowed"
                      >
                        <div className="w-10 h-10 rounded-lg bg-bg-2 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-text-mid" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-label text-text-high">{item.label}</div>
                          <div className="text-caption text-text-low">Скоро</div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 p-4 hover:surface-2 transition-fast"
                    >
                      <div className="w-10 h-10 rounded-lg bg-bg-2 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-text-mid" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-label text-text-high">{item.label}</div>
                        <div className="text-caption text-text-low">{item.description}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button 
          className="flex items-center justify-center gap-2 w-full h-12 mt-8 rounded-xl border border-border-strong text-label text-text-mid hover:text-danger hover:border-danger/50 transition-fast"
        >
          <LogOut className="w-5 h-5" />
          <span>Выйти</span>
        </button>
      </div>
    </AppShell>
  )
}
