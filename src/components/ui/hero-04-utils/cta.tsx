import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export interface CtaProps {
  ctaEnabled?: boolean;
  text?: string;
  link?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled) return null;

  if (cta.onClick) {
    return (
      <Button 
        variant={cta.variant || 'default'} 
        size={cta.size || 'default'} 
        className={cta.variant === 'link' ? '' : 'rounded-full px-6'}
        onClick={cta.onClick}
      >
        {cta.text}
      </Button>
    )
  }

  return (
    <Button 
      variant={cta.variant || 'default'} 
      size={cta.size || 'default'} 
      className={cta.variant === 'link' ? '' : 'rounded-full px-6'}
      asChild
    >
      {cta.link?.startsWith('#') ? (
        <a href={cta.link}>{cta.text}</a>
      ) : (
        <Link to={cta.link || '#'}>{cta.text}</Link>
      )}
    </Button>
  )
}
