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
 * Cortina por caracteres del nombre del hero — **sin Framer Motion, en CSS**.
 *
 * Esto no es un capricho de estilo: es lo que hace que el hero se vea rápido en
 * el móvil. El HTML llega ya escrito desde el build, y la hoja de estilos es
 * bloqueante y viaja en el primer viaje, así que esta animación arranca en
 * cuanto llega la página. Si dependiera de Framer Motion habría que esperar a
 * que bajen y se ejecuten ~140 KB de JavaScript, que en un móvil con 4G flojo
 * son más de tres segundos con el nombre en opacidad 0.
 *
 * El escalonado va con la variable `--i` (índice de la letra) y el retraso base
 * con `--retraso`, que hereda desde el contenedor. Reglas en `index.css`.
 */
export function CharReveal({ text, className = '', delay = 0, bloque = false }) {
  /*
   * `bloque` es OBLIGATORIO cuando el texto lleva `.text-gradient`, y no es una
   * preferencia estética: es una limitación real del navegador.
   *
   * `background-clip: text` recorta el degradado contra el texto del elemento,
   * pero NO alcanza a descendientes que estén en su propia capa de composición
   * — y una animación CSS de opacidad/transform crea exactamente eso. Con la
   * cortina letra a letra, el apellido del hero se quedaba **invisible durante
   * toda su animación** y aparecía de golpe al terminar: eso era el "se queda
   * trabada la transición unos segundos" del móvil.
   *
   * Comprobado en un banco de pruebas aparte: si la animación va en el MISMO
   * elemento que lleva el degradado (o en un envoltorio suyo), se ve bien; si
   * va en sus descendientes, no. Así que aquí la palabra sube entera desde
   * detrás de la máscara en vez de letra a letra. El degradado se mantiene
   * continuo, que es lo que se perdería repitiéndolo en cada letra.
   */
  if (bloque) {
    return (
      <span className="block overflow-hidden">
        <span className={`cortina-bloque ${className}`} style={{ '--retraso': `${delay}s` }}>
          {text}
        </span>
      </span>
    )
  }

  return (
    <span
      className={`cortina ${className}`}
      aria-label={text}
      style={{ '--retraso': `${delay}s` }}
    >
      {Array.from(text).map((char, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          {/* El espacio se escribe como no-separable: dentro de un inline-block
              CSS recorta el espacio normal y las letras quedarían pegadas. */}
          <span className="cortina-letra" style={{ '--i': String(i) }}>
            {char === ' ' ? ' ' : char}
          </span>
        </span>
      ))}
    </span>
  )
}
