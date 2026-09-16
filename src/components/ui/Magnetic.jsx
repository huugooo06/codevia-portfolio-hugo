import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Elemento "magnético": se desplaza hacia el cursor cuando pasa por encima.
 * Se usa en los botones principales y en el botón de tema.
 */
export function Magnetic({ children, className = '', strength = 0.35, as = 'div', ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.35 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.35 })

  const handleMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => { x.set(0); y.set(0) }

  const Tag = motion[as] || motion.div

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { x, y }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
