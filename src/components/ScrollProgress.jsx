import { motion, useScroll, useSpring } from 'framer-motion'

/** Barra fina de progreso de lectura, fija arriba del todo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[120] h-0.5 origin-left
                 bg-gradient-to-r from-brand to-brand-hi"
    />
  )
}
