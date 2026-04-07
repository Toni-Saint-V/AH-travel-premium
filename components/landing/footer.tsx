import Link from 'next/link'

const links = {
  product: [
    { label: 'Проверка шансов', href: '/app/questionnaire' },
    { label: 'Документы', href: '/app/documents' },
    { label: 'Личный кабинет', href: '/app/home' },
  ],
  company: [
    { label: 'Как это работает', href: '/#how-it-works' },
    { label: 'Цены', href: '/#pricing' },
    { label: 'Поддержка', href: '#' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '#' },
    { label: 'Условия использования', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border-hairline px-4 py-12 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="pb-8 sm:pb-10">
          <div className="text-[30px] font-semibold leading-none tracking-[-0.045em] text-text-high sm:text-[34px]">
            AH Travel
          </div>
          <p className="mt-3 max-w-sm text-[15px] leading-6 text-text-mid">
            AI-платформа для подготовки к поездке
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          <FooterGroup title="Продукт" links={links.product} />
          <FooterGroup title="Компания" links={links.company} />
          <FooterGroup title="Правовое" links={links.legal} />
        </div>

        <div className="mt-10 border-t border-border-hairline pt-6 sm:mt-12 sm:pt-7">
          <p className="text-center text-[13px] leading-6 text-text-low">
            © 2026 AH Travel. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <section className="border-t border-white/6 pt-4 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0">
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-text-low">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-[16px] leading-6 text-text-mid transition-fast hover:text-text-high"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
