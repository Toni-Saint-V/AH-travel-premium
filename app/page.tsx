import { HeroSection } from '@/components/landing/hero-section'
import { TrustStrip } from '@/components/landing/trust-strip'
import { HowItWorks } from '@/components/landing/how-it-works'
import { ScenarioPreview } from '@/components/landing/scenario-preview'
import { DocumentWalletPreview } from '@/components/landing/document-wallet-preview'
import { PricingTransparency } from '@/components/landing/pricing-transparency'
import { CountryPreview } from '@/components/landing/country-preview'
import { FAQSection } from '@/components/landing/faq-section'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen surface-0">
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <ScenarioPreview />
      <DocumentWalletPreview />
      <PricingTransparency />
      <CountryPreview />
      <FAQSection />
      <Footer />
    </div>
  )
}
