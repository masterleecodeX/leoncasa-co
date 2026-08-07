import * as React from 'react'
import { Button } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/ui/button'

export interface CtaProps {
  ctaEnabled?: boolean
  text?: string
  link?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  onClick?: () => void
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (cta.onClick) {
    return (
      <Button variant={cta.variant} size={cta.size} onClick={cta.onClick}>
        {cta.text}
      </Button>
    )
  }

  return (
    <Button variant={cta.variant} size={cta.size} asChild>
      <a href={cta.link || '#'}>{cta.text}</a>
    </Button>
  )
}
