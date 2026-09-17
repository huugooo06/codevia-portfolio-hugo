import { useEffect, useState } from 'react'

/**
 * `false` durante el prerenderizado del build y en el PRIMER render del
 * navegador; `true` a partir de que el componente está montado.
 *
 * Que sea false también en el primer render del navegador no es un descuido:
 * es justo lo que hace que el HTML generado en el build y lo que React pinta al
 * arrancar coincidan. Si difirieran, React descartaría el HTML recibido y
 * volvería a pintarlo todo desde cero.
 */
export function useMontado() {
  const [montado, setMontado] = useState(false)
  useEffect(() => { setMontado(true) }, [])
  return montado
}
