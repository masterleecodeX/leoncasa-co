import { Hero10, type Hero10Props } from '@/components/ui/hero-10'
import { siteConfig } from '@/config/site'
import { useTranslation } from 'react-i18next'

export default function Hero10Demo() {
  const { t } = useTranslation();

  const values = {
    title: t(siteConfig.hero.title),
    titleLine2Prefix: t(siteConfig.hero.titleLine2Prefix),
    titleHighlight: t(siteConfig.hero.titleHighlight),
    description: t(siteConfig.hero.description),
    socialProof: siteConfig.hero.socialProof,
    images: siteConfig.hero.images,
    imageAlts: siteConfig.hero.imageAlts,
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: t(siteConfig.hero.primaryCTA.text),
      link: siteConfig.hero.primaryCTA.link,
      variant: 'default',
      size: 'default',
    },
    secondaryCTA: {
      ctaEnabled: true,
      text: t(siteConfig.hero.secondaryCTA.text),
      link: siteConfig.hero.secondaryCTA.link,
      variant: 'outline',
      size: 'default',
    },
  } satisfies Hero10Props

  return <Hero10 {...values} />
}
