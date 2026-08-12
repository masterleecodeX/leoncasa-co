import { Hero04, type Hero04Props } from '@/components/ui/hero-04'
import { useTranslation } from 'react-i18next'

export default function Hero04Demo() {
  const { t } = useTranslation();

  const values = {
    title: t('A gallery for the work'),
    titleLine2: t('you are proud of.'),
    meta: [
      { label: "Price", value: "2024" },
      { label: "Material", value: "Canvas" },
      { label: "Dimensions", value: "ddd" },
    ],
    washImage:
      'https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=2198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primaryImage:
      'https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=1131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    secondaryImage:
      'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primaryAlt: 'Featured artwork',
    secondaryAlt: 'Abstract artwork',
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: t('Start your gallery'),
      link: '#',
      variant: 'default',
      size: 'default',
    },
    secondaryCTA: {
      ctaEnabled: true,
      text: t('See examples'),
      link: '#',
      variant: 'link',
    },
  } satisfies Hero04Props

  return <Hero04 {...values} />
}
