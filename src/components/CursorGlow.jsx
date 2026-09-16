import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMovimientoReducido } from '../hooks/useMovimientoReducido'

/**
 * Halo suave que sigue al cursor. Solo en dispositivos con puntero fino
 * (ratón/trackpad) — en táctil no aporta nada y gastaría batería.
 */
export function CursorGlow() {
  const reduced = useMovimientoReducido()
  const [enabled, setEnabled] = useState(false)

  const x = useSpring(useMotionValue(-500), { stiffness: 90, damping: 22, mass: 0.6 })
  const y = useSpring(useMotionValue(-500), { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y, reduced])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
    >
      <div
        className="h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgb(var(--brand) / .09), transparent 60%)',
        }}
      />
    </motion.div>
  )
}
