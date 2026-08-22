'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

import { Cta, type CtaProps } from '@/components/ui/hero-10-utils/cta'

export interface Hero10Props {
  title: string
  titleLine2Prefix?: string
  titleHighlight?: string
  description: string
  socialProof?: string
  images: string[]
  imageAlts?: string[]
  animation?: 'none' | 'subtle'
  primaryCTA: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    section: 'py-6 sm:py-16 md:py-28',
    title: 'text-[clamp(1.75rem,7.5vw,3.75rem)] leading-[1.1] mx-auto tracking-tight',
    description: 'max-w-lg text-sm sm:text-base',
    header: 'gap-3 sm:gap-5',
    content: 'gap-4 sm:gap-8 md:gap-10',
    fan: 'max-w-[90vw] md:max-w-2xl lg:max-w-3xl px-2 md:px-8 lg:px-0',
    fanCard: 'aspect-4/5',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-2xl sm:text-3xl md:text-4xl',
    description: 'max-w-md text-sm',
    header: 'gap-4',
    content: 'gap-6 sm:gap-8',
    fan: 'max-w-2xl',
    fanCard: 'aspect-4/5',
  },
} as const

const fanSlots = [
  { width: 'w-[38%]', layout: '-mr-8 z-10', rotate: -6, x: 48, ty: 24 },
  { width: 'w-[42%]', layout: 'z-20', rotate: 0, x: 0, ty: 12 },
  { width: 'w-[38%]', layout: '-ml-8 z-10', rotate: 6, x: -48, ty: 24 },
]

const fanContainer: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const fanCard: Variants = {
  hidden: (slot: (typeof fanSlots)[number]) => ({
    x: slot.x,
    rotate: slot.rotate,
    y: slot.ty,
  }),
  visible: (slot: (typeof fanSlots)[number]) => ({
    x: 0,
    rotate: slot.rotate,
    y: slot.ty,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

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

function ImageFan({
  images,
  imageAlts,
  cardAspect,
  animate,
}: Readonly<{
  images: string[]
  imageAlts?: string[]
  cardAspect: string
  animate: boolean
}>) {
  const [order, setOrder] = React.useState([0, 1, 2]);

  const handleCardClick = (originalIndex: number) => {
    setOrder(prevOrder => {
      const clickedPos = prevOrder.indexOf(originalIndex);
      if (clickedPos === 1) return prevOrder; // Already center

      const newOrder = [...prevOrder];
      // Swap clicked with center
      const temp = newOrder[1];
      newOrder[1] = newOrder[clickedPos];
      newOrder[clickedPos] = temp;
      return newOrder;
    });
  };

  return (
    <motion.div
      className="relative flex w-full items-center justify-center h-[190px] sm:h-[260px] md:h-[350px]"
      variants={fanContainer}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      animate={animate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
    >
      {order.map((originalIndex, currentPos) => {
        const src = images[originalIndex];
        if (!src) return null;

        const slot = fanSlots[currentPos] ?? fanSlots[1]
        return (
          <motion.div
            key={src}
            layout
            custom={slot}
            variants={fanCard}
            onClick={() => handleCardClick(originalIndex)}
            className={cn(
              'relative shrink-0 overflow-hidden rounded-xl shadow-2xl shadow-black/30 dark:shadow-black/60 outline outline-black/10 dark:outline-white/10 cursor-pointer',
              cardAspect,
              slot.width,
              slot.layout,
            )}
          >
            <img
              src={src}
              alt={imageAlts?.[originalIndex] ?? ''}
              decoding="async"
              className="size-full object-cover pointer-events-none"
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function Hero10({
  title,
  titleLine2Prefix,
  titleHighlight,
  description,
  socialProof,
  images,
  imageAlts,
  animation = 'none',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
}: Readonly<Hero10Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  const titleElement = title && (
    <h1
      className={cn(
        'text-foreground font-serif font-normal tracking-tight text-balance',
        vs.title,
      )}
    >
      <span className="inline-block whitespace-nowrap">
        {title.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.03, delay: index * 0.03 }}
            >
              {char}
            </motion.span>
        ))}</span>
      {(titleLine2Prefix || titleHighlight) && (
        <>
          <br />
          <span className="inline-block whitespace-nowrap">
            {titleLine2Prefix && (
                titleLine2Prefix.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.03, delay: (title.length * 0.03) + (index * 0.03) }}
                    >
                      {char}
                    </motion.span>
                ))
            )}
            {titleLine2Prefix && <span> </span>}
            {titleHighlight && (
                titleHighlight.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      className="text-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.03, delay: (title.length * 0.03) + (titleLine2Prefix ? titleLine2Prefix.length * 0.03 : 0) + (index * 0.03) }}
                    >
                      {char}
                    </motion.span>
                ))
            )}</span>
        </>
      )}
    </h1>
  )

  const descriptionElement = description && (
    <p className={cn('text-muted-foreground', vs.description)}>
      <Balancer>{description}</Balancer>
    </p>
  )

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
      {secondaryCTA?.ctaEnabled && (
        <Cta
          cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'outline' }}
        />
      )}
    </div>
  )

  const socialProofElement = socialProof && (
    <p className="text-muted-foreground text-xs font-medium">{socialProof}</p>
  )

  const mediaElement = images?.length ? (
    <ImageFan
      images={images}
      imageAlts={imageAlts}
      cardAspect={vs.fanCard}
      animate={animate}
    />
  ) : null

  return (
    <section className="bg-background relative isolate w-full overflow-visible">
      <motion.div
        className={cn(
          'relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center',
          vs.section,
          vs.content,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        <Reveal
          active={animate}
          className="flex w-full flex-col items-center order-1"
        >
          {titleElement}
        </Reveal>
        <Reveal
          active={animate}
          className={cn(
            'flex w-full max-w-2xl flex-col items-center order-2 sm:order-2 mt-4 sm:mt-0',
            vs.header,
          )}
        >
          {/* We only want this on desktop */}
          <div className="hidden sm:block">{descriptionElement}</div>
        </Reveal>
        <Reveal active={animate} className="flex flex-col items-center gap-4 order-3 sm:order-3 pt-2 sm:pt-0">
          {ctasElement}
          {socialProofElement}
        </Reveal>
        <div className={cn('mx-auto w-full order-4 sm:order-4 mt-8 sm:mt-16 md:mt-20 lg:mt-24', vs.fan)}>{mediaElement}</div>
        <Reveal
          active={animate}
          className={cn(
            'flex w-full max-w-2xl flex-col items-center order-5 sm:hidden mt-16',
            vs.header,
          )}
        >
          {/* We only want this on mobile, below the image */}
          {descriptionElement}
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero10;
