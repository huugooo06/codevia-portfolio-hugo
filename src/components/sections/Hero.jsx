import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence, motion, useMotionValue,
  useScroll, useSpring, useTransform,
} from 'framer-motion'
import { useMovimientoReducido } from '../../hooks/useMovimientoReducido'
import { hero, marqueeWords } from '../../data/content'
import { CharReveal } from '../ui/TextReveal'
import { Button, Eyebrow, Marquee } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { Icon } from '../ui/Icon'
import { Magnetic } from '../ui/Magnetic'

/* Retrato con paralaje: sigue el cursor suavemente y se aleja al hacer scroll. */
function Portrait() {
  const ref = useRef(null)
  const reduced = useMovimientoReducido()
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
    /* La ENTRADA va en la <figure> con CSS y el PARALAJE en el div de dentro
       con Framer Motion. Separados a posta: son dos elementos distintos porque
       los dos animan `transform` y en el mismo nodo se pisarían — y, sobre
       todo, porque así la foto aparece con el HTML sin esperar al JavaScript.
       El paralaje llega cuando llegue; es un extra, no la presencia. */
    <figure
      ref={ref}
      className="entra-foto relative mx-auto w-full max-w-[320px] lg:max-w-none"
    >
      <motion.div style={reduced ? undefined : { y, scale }}>
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        className="relative aspect-square overflow-hidden rounded-xl border border-line
                   bg-surface shadow-[0_32px_70px_-28px_rgb(0_0_0/.7)]
                   lg:aspect-[4/5] lg:rounded-2xl"
      >
        {!failed ? (
          /* Dos tamaños de la misma foto. Por debajo de 1024px el retrato nunca
             pasa de 320px de ancho (max-w-[320px]), así que mandarle el original
             de 1200px era gastar 315 KB para pintar 84 KB de imagen — y en
             móvil eso se nota: era el "tarda en salir la foto".
             Va con <picture> y no con srcset porque srcset deja la elección al
             navegador, y con pantallas de 3x volvería a pedir el grande. */
          <picture>
            <source media="(min-width: 1024px)" srcSet="/img/hugo-portada.jpg" />
            <img
              src="/img/hugo-portada-760.jpg"
              alt="Retrato de Hugo Córdoba"
              width={1200}
              height={1500}
              fetchPriority="high"
              onError={() => setFailed(true)}
              onLoad={(e) => { if (!e.currentTarget.naturalWidth) setFailed(true) }}
              className="h-full w-full object-cover object-[center_18%] saturate-[.92] contrast-[1.06]"
            />
          </picture>
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
      </motion.div>
    </figure>
  )
}

/* Rol que va rotando debajo del nombre. */
function RotatingRole() {
  const [i, setI] = useState(0)
  const reduced = useMovimientoReducido()

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 3200)
    return () => clearInterval(t)
  }, [reduced])

  return (
    <span className="relative inline-flex min-h-[1.6em] items-center">
      {/* `initial={false}` en el AnimatePresence: sin esto el PRIMER rol se
          escribiría en el HTML del build con opacidad 0 y el móvil vería
          "Especializado en" a medias hasta que cargara el JavaScript. Así el
          primero está puesto de salida y solo se animan los relevos. */}
      <AnimatePresence mode="wait" initial={false}>
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

/*
 * La entrada del hero va en CSS (clase `.entra` en index.css), NO en Framer
 * Motion. Dos razones, por orden de importancia:
 *
 * 1. El hero es lo primero que se ve y su HTML ya llega escrito desde el build.
 *    La hoja de estilos es bloqueante y viaja en el primer viaje, así que la
 *    animación arranca con la página. Con Framer Motion habría que esperar a
 *    que bajen y se ejecuten ~140 KB de JavaScript: medido en un móvil con 4G
 *    flojo, 3,8 s con el texto invisible. Era exactamente lo que se reportó.
 * 2. Antes esto usaba `whileInView`, como el resto de secciones, y en móvil ni
 *    siquiera se disparaba: allí el retrato va primero y empuja el texto fuera
 *    del área de detección del IntersectionObserver.
 *
 * Framer Motion se queda para lo que de verdad necesita JavaScript: el
 * paralaje, la inclinación con el cursor y los revelados por scroll de las
 * secciones de abajo.
 */
const entrada = (retraso, clases = '') => ({
  className: `entra ${clases}`,
  style: { '--retraso': `${retraso}s` },
})

export function Hero() {
  const reduced = useMovimientoReducido()

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
          <div {...entrada(0.05)}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1 className="text-display-xl mt-5">
            <CharReveal text={hero.first} className="block" delay={0.12} />
            <CharReveal
              text={hero.last}
              className="block italic text-gradient"
              delay={0.28}
            />
          </h1>

          <p {...entrada(0.45, 'mt-6 max-w-[46ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-snug')}>
            Especializado en <RotatingRole />
          </p>

          <p
            {...entrada(
              0.52,
              'mt-5 max-w-[52ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-ink-soft',
            )}
          >
            {hero.lead}
          </p>

          <div {...entrada(0.6, 'mt-9 flex flex-wrap gap-3')}>
            <Magnetic strength={0.25}>
              <Button href="#proyectos">
                Ver proyectos
                <Icon name="arrow" className="h-[17px] w-[17px]" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button href="#contacto" variant="ghost">Contactar</Button>
            </Magnetic>
          </div>

          <dl
            {...entrada(
              0.68,
              `mt-11 grid grid-cols-3 gap-x-4 border-t border-line-soft pt-5
               [&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-line-soft
               [&>*:not(:first-child)]:pl-4 sm:gap-x-6 sm:[&>*:not(:first-child)]:pl-6`,
            )}
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
          </dl>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        {...entrada(0.95, 'hidden justify-center pb-8 lg:flex')}
        aria-hidden="true"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted"
        >
          <Icon name="down" className="h-5 w-5" />
        </motion.span>
      </div>

      <Marquee words={marqueeWords} />
    </section>
  )
}
