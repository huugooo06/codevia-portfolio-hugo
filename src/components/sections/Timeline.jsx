import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { timeline } from '../../data/content'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { Chips, SectionHead } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { TextReveal } from '../ui/TextReveal'

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 320, damping: 18 },
  },
}

export function Timeline() {
  const ref = useRef(null)

  // La línea vertical se va dibujando conforme la sección atraviesa el viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <section
      id="trayectoria"
      className="relative isolate border-y border-line-soft bg-bg-alt py-20 lg:py-32"
    >
      <GridBackdrop
        opacity={0.45}
        mask="radial-gradient(ellipse 60% 75% at 8% 55%, #000 8%, transparent 72%)"
      />

      <div className="wrap">
        <SectionHead
          eyebrow="04 — Trayectoria"
          title="Formación y camino."
          className="mb-12 lg:mb-16"
        />

        <ol ref={ref} className="relative max-w-3xl pl-9">
          {/* Raíl de fondo */}
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          {/* Trazo que avanza con el scroll */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top
                       bg-gradient-to-b from-brand to-brand-hi"
          />

          {timeline.map((t, i) => (
            <li key={t.title} className={i < timeline.length - 1 ? 'pb-10' : ''}>
              <RevealGroup stagger={0.07} className="relative">
                <motion.span
                  aria-hidden="true"
                  variants={dotVariants}
                  className="absolute -ml-9 mt-1.5 h-[15px] w-[15px] rounded-full
                             border-2 border-brand bg-bg-alt"
                />
                <RevealItem>
                  <p className="text-[12px] font-semibold uppercase tracking-[.13em] text-brand">
                    {t.tag}
                  </p>
                </RevealItem>
                <TextReveal
                  as="h3"
                  text={t.title}
                  className="mt-1.5 text-[1.25rem] tracking-tight"
                />
                <RevealItem>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">{t.text}</p>
                </RevealItem>
                {t.items.length > 0 && (
                  <RevealItem className="mt-3.5">
                    <Chips items={t.items} small />
                  </RevealItem>
                )}
              </RevealGroup>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
