import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 0.8, 0.32, 1]
const VIEWPORT = (once) => ({ once, amount: 0, margin: '0px 0px -22% 0px' })

/**
 * Revela un texto palabra a palabra al entrar en pantalla.
 * Cada palabra sube desde detrás de una máscara con `overflow-hidden`,
 * así que el efecto es de "cortina" y no de simple fundido.
 *
 * OJO con quién observa: el `whileInView` va en el CONTENEDOR de cada palabra,
 * nunca en la palabra. La palabra arranca en y:110%, o sea completamente fuera
 * del `overflow-hidden` del contenedor, e IntersectionObserver tiene en cuenta
 * el recorte de los ancestros: si se observase la palabra, su ratio de
 * intersección sería siempre 0, nunca "entraría en pantalla" y el texto se
 * quedaría escondido para siempre.
 *
 * `once` es false por defecto: el revelado se repite cada vez que el texto
 * vuelve a entrar, también al subir.
 */
export function TextReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.04,
  once = false,
}) {
  const reduced = useReducedMotion()

  // Con movimiento reducido, un fundido del bloque entero: sin cortina ni
  // desplazamiento, pero SIN quedarse sin animación de entrada.
  if (reduced) {
    const Motion = motion[Tag] || motion.span
    /* Nombres de variante, no objetos: dentro de un RevealGroup el padre
       propaga su variante y pisaría un `whileInView` con objeto suelto,
       dejando el texto clavado en opacidad 0. */
    return (
      <Motion
        className={className}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.5, delay, ease: EASE } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT(once)}
      >
        {text}
      </Motion>
    )
  }

  const words = String(text).split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block overflow-hidden align-bottom"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT(once)}
          >
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
              transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
            </motion.span>
          </motion.span>
          {/* El espacio va FUERA del inline-block: dentro, CSS recorta el
              espacio final y las palabras acaban pegadas unas a otras. */}
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

/**
 * Variante por caracteres — se usa en el nombre del hero.
 *
 * `immediate` cambia el disparador: con `false` (por defecto) el texto espera a
 * entrar en pantalla; con `true` arranca al montar. Lo segundo es lo correcto
 * para lo que ya está a la vista al cargar la página — ahí el observador no
 * aporta nada y sí puede fallar, porque en móvil compite con la carga de
 * fuentes, la imagen y la barra del navegador, que mueven el layout debajo de
 * él. Ese era el fallo: en el móvil el hero se quedaba en blanco hasta que
 * bajabas.
 */
export function CharReveal({ text, className = '', delay = 0, stagger = 0.04, immediate = false }) {
  const reduced = useReducedMotion()

  /* Un solo sitio donde se decide el disparador, para que las dos ramas
     (movimiento normal y reducido) no se separen con el tiempo. */
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: VIEWPORT(false) }

  if (reduced) {
    return (
      <motion.span
        className={className}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.5, delay, ease: EASE } },
        }}
        initial="hidden"
        {...trigger}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          initial="hidden"
          {...trigger}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', opacity: 0 },
              show: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}
