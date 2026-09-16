import { motion } from 'framer-motion'
import { techIcons } from '../../data/techIcons'
import { useMovimientoReducido } from '../../hooks/useMovimientoReducido'

/**
 * Tarjeta de tecnología: logo real + nombre.
 *
 * El logo se pinta en monocromo y solo toma su color de marca al pasar por
 * encima. Es a propósito: varios logos oficiales (Express, GitHub, JWT,
 * Markdown) son prácticamente negros y sobre el tema oscuro no se verían;
 * además, veinte logos a todo color a la vez ensucian mucho la composición.
 */
export function TechLogo({ slug, index = 0 }) {
  const icon = techIcons[slug]
  const reduced = useMovimientoReducido()

  if (!icon) return null

  return (
    <motion.li
      variants={
        // Con movimiento reducido, solo fundido: sin rebote ni escala.
        reduced
          ? {
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.4, delay: index * 0.02 } },
            }
          : {
              hidden: { opacity: 0, y: 18, scale: 0.9 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: 'spring', stiffness: 380, damping: 24, delay: index * 0.035 },
              },
            }
      }
      whileHover={reduced ? undefined : { y: -6, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="group/logo relative flex flex-col items-center gap-2.5"
    >
      <div
        className="relative grid h-16 w-16 place-items-center rounded-xl border border-line
                   bg-surface-2 transition-colors duration-300
                   group-hover/logo:border-[var(--brandColor)] sm:h-[72px] sm:w-[72px]"
        style={{ '--brandColor': icon.color }}
      >
        {/* Resplandor del color de marca, solo al pasar por encima */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] opacity-0 blur-md transition-opacity
                     duration-300 group-hover/logo:opacity-30"
          style={{ background: icon.color }}
        />
        <svg
          /* Simple Icons usa una caja de 24; el logo de Java viene de Devicon
             y trae la suya propia, así que cada icono puede traer su viewBox. */
          viewBox={icon.viewBox || '0 0 24 24'}
          role="img"
          aria-label={icon.name}
          className="relative h-7 w-7 fill-muted transition-colors duration-300
                     group-hover/logo:fill-[var(--brandColor)] sm:h-8 sm:w-8"
          style={{ '--brandColor': icon.color }}
        >
          <path d={icon.d} />
        </svg>
      </div>

      <span className="text-center text-xs font-medium text-muted transition-colors duration-300
                       group-hover/logo:text-ink">
        {icon.name}
      </span>
    </motion.li>
  )
}
