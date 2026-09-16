import { motion, useReducedMotion } from 'framer-motion'

const OFFSETS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 46, y: 0 },
  right: { x: -46, y: 0 },
  none: { x: 0, y: 0 },
}

const EASE = [0.22, 0.8, 0.32, 1]

/*
 * `once: false` en todos los revelados: la animación se repite cada vez que el
 * elemento vuelve a entrar en pantalla, también al subir.
 *
 * La combinación `amount: 0` + margen inferior negativo es deliberada:
 *  - al ENTRAR desde abajo, el margen retrasa el disparo hasta que el elemento
 *    está realmente dentro, no cuando asoma un píxel;
 *  - al SALIR por arriba, con amount 0 sigue "en pantalla" mientras quede
 *    cualquier parte visible, así que no se desvanece delante del usuario.
 *
 * El -22% está medido, no elegido a ojo: con -14% los textos terminaban de
 * aparecer al 95-98% de la altura de pantalla, o sea pegados al borde inferior,
 * y para cuando el usuario los tenía a la vista la animación ya había acabado.
 */
const VIEWPORT = () => ({ once: false, amount: 0, margin: '0px 0px -22% 0px' })

/*
 * Con "reducir movimiento" activado NO se elimina la animación: se sustituye por
 * un fundido sin desplazamiento ni desenfoque. Quitarla del todo dejaba media web
 * sin ninguna señal de entrada — que es justo el fallo que se reportó — y además
 * "movimiento reducido" significa evitar desplazamientos amplios, no prohibir
 * cualquier transición.
 */
function useEntry(from = 'up', duration = 0.75) {
  const reduced = useReducedMotion()
  const offset = reduced ? OFFSETS.none : (OFFSETS[from] || OFFSETS.up)
  return {
    reduced,
    initial: { opacity: 0, ...offset },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: reduced ? 0.5 : duration, ease: EASE },
  }
}

/** Envoltorio de entrada por scroll. */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  from = 'up',
  duration = 0.75,
  className = '',
  ...rest
}) {
  const Tag = motion[as] || motion.div
  const entry = useEntry(from, duration)

  /* Se usan nombres de variante ("hidden"/"show") en vez de objetos sueltos a
     propósito: si este componente acaba dentro de un RevealGroup, el padre
     propaga su variante a los hijos y eso PISA el `whileInView` propio. Con los
     mismos nombres funciona en los dos casos — suelto y anidado. */
  return (
    <Tag
      className={className}
      variants={{
        hidden: entry.initial,
        show: { ...entry.animate, transition: { ...entry.transition, delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT()}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Contenedor que escalona la entrada de sus hijos `<RevealItem>`. */
export function RevealGroup({
  children,
  as = 'div',
  className = '',
  stagger = 0.08,
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT()}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? stagger * 0.6 : stagger } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Recorrido amplio y desenfoque: un fundido de 26px pasaba desapercibido
   mientras se hace scroll. Con movimiento reducido, solo opacidad. */
const FULL_ITEM = {
  hidden: { opacity: 0, y: 38, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
}

const SOFT_ITEM = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export function RevealItem({ children, as = 'div', className = '', ...rest }) {
  const reduced = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag className={className} variants={reduced ? SOFT_ITEM : FULL_ITEM} {...rest}>
      {children}
    </Tag>
  )
}

export const itemVariants = FULL_ITEM
