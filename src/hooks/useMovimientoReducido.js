import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Sustituto de `useReducedMotion` seguro con HTML pregenerado.
 *
 * El de Framer Motion lee la preferencia del sistema ya en el primer render.
 * Eso, con el HTML generado en el build, es un problema serio: el build no
 * tiene esa preferencia y siempre escribe la versión "normal", así que en un
 * equipo con movimiento reducido el primer render del navegador saldría
 * distinto del HTML recibido. Varios componentes cambian de ESTRUCTURA según
 * esta preferencia (`TextReveal` pinta una sola palabra o una por `<span>`), y
 * ante una discrepancia así React descarta todo el HTML pregenerado y vuelve a
 * pintar desde cero — justo lo que este proyecto quiere evitar.
 *
 * Aquí se devuelve siempre `false` en el primer render, igual que el build, y
 * se adopta la preferencia real inmediatamente después de hidratar. La entrada
 * del hero no depende de esto: va en CSS, con su propia media query.
 */
export function useMovimientoReducido() {
  const real = useReducedMotion()
  const [hidratado, setHidratado] = useState(false)

  useEffect(() => { setHidratado(true) }, [])

  return hidratado ? Boolean(real) : false
}
