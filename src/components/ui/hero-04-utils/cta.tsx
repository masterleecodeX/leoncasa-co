import { Button } from '@/components/ui/button'

export interface CtaProps {
  ctaEnabled?: boolean;
  text?: string;
  link?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled) return null;
  return (
    <Button 
      variant={cta.variant || 'default'} 
      size={cta.size || 'default'} 
      className={cta.variant === 'link' ? '' : 'rounded-full px-6'}
      asChild
    >
      <a href={cta.link || '#'}>{cta.text}</a>
    </Button>
  )
}
