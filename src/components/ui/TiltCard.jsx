import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Tarjeta con inclinación 3D y foco de luz que sigue al cursor.
 *
 * El foco se pinta con una capa aparte en vez de un `background` sobre la
 * tarjeta para que no tape ni el borde ni el contenido, y usa variables CSS
 * (`--mx` / `--my`) porque un radial-gradient no se puede animar con motion.
 */
export function TiltCard({ children, className = '', intensity = 6, spotlight = true }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const springCfg = { stiffness: 220, damping: 22, mass: 0.4 }
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), springCfg)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), springCfg)

  const handleMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px)
    my.set(py)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={`group relative [transform-style:preserve-3d] ${className}`}
    >
      {spotlight && !reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
                     transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(var(--brand) / .13), transparent 62%)',
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
