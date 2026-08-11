import { Button, type ButtonProps } from "@/components/ui/button"
import { Link } from "react-router-dom"

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled) return null
  return (
    <Button asChild variant={cta.variant} size={cta.size}>
      <Link to={cta.link ?? '#'}>{cta.text}</Link>
    </Button>
  )
}
