import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence, motion, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform,
} from 'framer-motion'
import { hero, marqueeWords } from '../../data/content'
import { CharReveal } from '../ui/TextReveal'
import { Button, Eyebrow, Marquee } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { Icon } from '../ui/Icon'
import { Magnetic } from '../ui/Magnetic'

/* Retrato con paralaje: sigue el cursor suavemente y se aleja al hacer scroll. */
function Portrait() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const cfg = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), cfg)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), cfg)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  useEffect(() => {
    if (reduced) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduced])

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.22, 0.8, 0.32, 1] }}
      style={reduced ? undefined : { y, scale }}
      className="relative mx-auto w-full max-w-[320px] lg:max-w-none"
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        className="relative aspect-square overflow-hidden rounded-xl border border-line
                   bg-surface shadow-[0_32px_70px_-28px_rgb(0_0_0/.7)]
                   lg:aspect-[4/5] lg:rounded-2xl"
      >
        {!failed ? (
          <img
            src="/img/hugo-portada.jpg"
            alt="Retrato de Hugo Córdoba"
            width={1200}
            height={1500}
            fetchPriority="high"
            onError={() => setFailed(true)}
            onLoad={(e) => { if (!e.currentTarget.naturalWidth) setFailed(true) }}
            className="h-full w-full object-cover object-[center_18%] saturate-[.92] contrast-[1.06]"
          />
        ) : (
          /* Placeholder mientras no exista la foto generada */
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2.5 text-muted"
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, rgb(var(--brand) / .14), transparent 65%)',
            }}
          >
            <span className="font-display text-[3.2rem] font-medium tracking-tight text-brand/60 lg:text-[4.5rem]">
              HC
            </span>
            <p className="text-[11.5px] uppercase tracking-[.14em] lg:text-xs">Foto de portada</p>
          </div>
        )}

        {/* Viñeta inferior suave para dar profundidad y un toque de azul de
            marca que integra el retrato en la paleta. */}
        {!failed && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3
                         bg-gradient-to-t from-black/35 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background: 'linear-gradient(165deg, rgb(var(--brand) / .35), transparent 62%)',
              }}
            />
          </>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[inherit] border border-brand/25"
        />
      </motion.div>
    </motion.figure>
  )
}

/* Rol que va rotando debajo del nombre. */
function RotatingRole() {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 3200)
    return () => clearInterval(t)
  }, [reduced])

  return (
    <span className="relative inline-flex min-h-[1.6em] items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 0.8, 0.32, 1] }}
          className="font-semibold text-brand"
        >
          {hero.roles[i]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 inline-block h-[1.1em] w-[2px] bg-brand animate-blink" aria-hidden="true" />
    </span>
  )
}

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 lg:pt-40">
      {/* Fondo: dos manchas de color en movimiento lento */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div
          className={`absolute -top-[30%] left-[15%] aspect-square w-[75vw] max-w-[900px]
                      rounded-full blur-[70px] ${reduced ? '' : 'animate-aurora-a'}`}
          style={{ background: 'radial-gradient(circle, rgb(var(--brand) / .30), transparent 62%)' }}
        />
        <div
          className={`absolute -top-[10%] right-[5%] aspect-square w-[55vw] max-w-[650px]
                      rounded-full blur-[80px] ${reduced ? '' : 'animate-aurora-b'}`}
          style={{ background: 'radial-gradient(circle, rgb(var(--brand-hi) / .22), transparent 65%)' }}
        />
      </div>

      {/* Rejilla sutil */}
      <GridBackdrop opacity={0.5} />

      <div className="wrap grid items-center gap-10 pb-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:pb-24">
        {/* Retrato primero en móvil, a la derecha en escritorio */}
        <div className="order-1 lg:order-2">
          <Portrait />
        </div>

        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0, margin: '0px 0px -14% 0px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <h1 className="text-display-xl mt-5">
            <CharReveal text={hero.first} className="block" delay={0.25} />
            <CharReveal
              text={hero.last}
              className="block italic text-gradient"
              delay={0.45}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0, margin: '0px 0px -14% 0px' }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-6 max-w-[46ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-snug"
          >
            Especializado en <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0, margin: '0px 0px -14% 0px' }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-5 max-w-[52ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-ink-soft"
          >
            {hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0, margin: '0px 0px -14% 0px' }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic strength={0.25}>
              <Button href="#proyectos">
                Ver proyectos
                <Icon name="arrow" className="h-[17px] w-[17px]" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button href="#contacto" variant="ghost">Contactar</Button>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0, margin: '0px 0px -14% 0px' }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-11 grid grid-cols-3 gap-x-4 border-t border-line-soft pt-5
                       [&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-line-soft
                       [&>*:not(:first-child)]:pl-4 sm:gap-x-6 sm:[&>*:not(:first-child)]:pl-6"
          >
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11.5px] font-semibold uppercase tracking-[.12em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-[clamp(.95rem,1.1vw,1.1rem)] font-medium leading-tight">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0, margin: '0px 0px -14% 0px' }}
        transition={{ delay: 1.4 }}
        className="hidden justify-center pb-8 lg:flex"
        aria-hidden="true"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted"
        >
          <Icon name="down" className="h-5 w-5" />
        </motion.span>
      </motion.div>

      <Marquee words={marqueeWords} />
    </section>
  )
}
