import { Hero10, type Hero10Props } from '@/components/ui/hero-10'
import { siteConfig } from '@/config/site'

const values = {
  title: siteConfig.hero.title,
  titleLine2Prefix: siteConfig.hero.titleLine2Prefix,
  titleHighlight: siteConfig.hero.titleHighlight,
  description: siteConfig.hero.description,
  socialProof: siteConfig.hero.socialProof,
  images: siteConfig.hero.images,
  imageAlts: siteConfig.hero.imageAlts,
  animation: 'subtle',
  primaryCTA: {
    ctaEnabled: true,
    text: siteConfig.hero.primaryCTA.text,
    link: siteConfig.hero.primaryCTA.link,
    variant: 'default',
    size: 'default',
  },
  secondaryCTA: {
    ctaEnabled: true,
    text: siteConfig.hero.secondaryCTA.text,
    link: siteConfig.hero.secondaryCTA.link,
    variant: 'outline',
    size: 'default',
  },
} satisfies Hero10Props

export default function Hero10Demo() {
  return <Hero10 {...values} />
}
