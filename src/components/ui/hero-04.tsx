'use client'

import { Link } from 'react-router-dom'
import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import Balancer from 'react-wrap-balancer'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Cta, type CtaProps } from '@/components/ui/hero-04-utils/cta'
import { ArtCollage } from '@/components/ui/hero-04-utils/art-collage'

export interface Hero04Props {
  title: string
  washImage?: string
  titleLine2?: string
  description?: string
  meta?: { label: string; value: string }[]
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  animation?: 'none' | 'subtle'
  primaryCTA: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
  onPrev?: () => void
  onNext?: () => void
  slideData?: any
}

const variantStyles = {
  standard: {
    section: 'py-20 sm:py-28',
    title: 'text-4xl sm:text-5xl md:text-6xl',
    description: 'max-w-md text-sm sm:text-base text-zinc-600',
    header: 'gap-5',
    grid: 'gap-12 lg:gap-16',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-3xl sm:text-4xl md:text-5xl',
    description: 'max-w-sm text-sm text-zinc-600',
    header: 'gap-4',
    grid: 'gap-10 lg:gap-12',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

export function Hero04({
  title,
  titleLine2,
  description,
  meta,
  washImage,
  primaryImage,
  secondaryImage,
  primaryAlt = '',
  secondaryAlt = '',
  animation = 'none',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
  onPrev,
  onNext,
  slideData,
}: Readonly<Hero04Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  const backgroundElement = washImage && (
    <div 
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 90%, transparent)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-75 blur-2xl dark:opacity-20"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 80%)',
        }}
      >
        <img
          src={washImage}
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  )

  const titleElement = title && (
    <h1
      className={cn(
        'text-slate-900 font-serif font-normal tracking-tight text-balance text-center lg:text-left',
        vs.title,
      )}
    >
      <Balancer>{title}</Balancer>
      {titleLine2 && (
        <>
          <br />
          <Balancer>{titleLine2}</Balancer>
        </>
      )}
    </h1>
  )

  const descriptionElement = (description || meta) && (
    <div className={cn('text-slate-600 flex flex-col items-center lg:items-start text-center lg:text-left w-full', vs.description)}>
      {description && <Balancer>{description}</Balancer>}
      {meta && meta.length > 0 && (
        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 sm:gap-8 w-full max-w-[340px] sm:max-w-none mx-auto lg:mx-0">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={onPrev}
            className="p-1 sm:p-2 shrink-0 text-slate-400 transition hover:text-slate-900"
          >
            <ChevronLeft className="size-6" />
          </button>
          
          <dl className="w-full sm:w-[260px] max-w-[240px] sm:max-w-[260px] shrink-0 text-sm">
            {meta.map((row) => (
              <div key={row.label} className="flex justify-between py-[7px]">
                <dt className="text-slate-500">{row.label}</dt>
                <dd className="font-medium text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>
          
          <button
            type="button"
            aria-label="Next slide"
            onClick={onNext}
            className="p-1 sm:p-2 shrink-0 text-slate-400 transition hover:text-slate-900"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </div>
  )

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="mt-2 flex flex-wrap items-center justify-center lg:justify-center lg:ml-[64px] lg:w-[260px] gap-x-4 gap-y-3 w-full">
      {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
      {secondaryCTA?.ctaEnabled && (
        <Cta
          cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'link' }}
        />
      )}
    </div>
  )

  const mediaElement = (
    <ArtCollage
      primaryImage={primaryImage}
      secondaryImage={secondaryImage}
      primaryAlt={primaryAlt}
      secondaryAlt={secondaryAlt}
    />
  )

  return (
    <section className="bg-white relative isolate w-full overflow-hidden">
      {backgroundElement}

      <motion.div
        className={cn(
          'relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center px-6 lg:grid-cols-2',
          vs.section,
          vs.grid,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        <Reveal
          active={animate}
          className={cn('flex flex-col items-center lg:items-start w-full order-2 lg:order-1', vs.header)}
        >
          {titleElement}
          {descriptionElement}
          {ctasElement}
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full order-1 lg:order-2">
          <Link to="/details" state={{ slide: slideData }} className="block cursor-pointer">
            {mediaElement}
          </Link>
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero04;
