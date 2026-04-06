import Link from 'next/link'

const links = {
  product: [
    { label: 'Визы', href: '/visas' },
    { label: 'Страхование', href: '/insurance' },
    { label: 'Туры', href: '/tours' },
  ],
  company: [
    { label: 'О нас', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Контакты', href: '/contact' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '/privacy' },
    { label: 'Условия использования', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border-hairline">
      <div className="max-w-lg mx-auto">
        {/* Logo and tagline */}
        <div className="mb-8">
          <div className="text-h3 text-text-high mb-1">AH Travel</div>
          <p className="text-caption text-text-low">
            AI-платформа для подготовки к поездке
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-caption text-text-low mb-3">Продукт</div>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-text-mid hover:text-text-high transition-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-caption text-text-low mb-3">Компания</div>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-text-mid hover:text-text-high transition-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-caption text-text-low mb-3">Правовое</div>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-text-mid hover:text-text-high transition-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border-hairline">
          <p className="text-caption text-text-low text-center">
            © 2026 AH Travel. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
