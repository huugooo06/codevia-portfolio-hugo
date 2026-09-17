import { useEffect, useState } from 'react'

const RED_DE_SEGURIDAD = 2000

/**
 * `false` durante el prerenderizado del build y en el PRIMER render del
 * navegador; `true` cuando la entrada del hero ha terminado.
 *
 * Que sea false también en el primer render del navegador no es un descuido: es
 * justo lo que hace que el HTML generado en el build y lo que React pinta al
 * arrancar coincidan. Si difirieran, React descartaría el HTML recibido y
 * volvería a pintarlo todo desde cero.
 *
 * Y espera a que acaben las animaciones de entrada porque montar las seis
 * secciones de abajo es trabajo pesado: si cae encima de la animación del hero,
 * bloquea el hilo principal y la transición se ve trabada a medias — que es
 * exactamente lo que se reportó en móvil. Lo de abajo está fuera de pantalla,
 * así que no pierde nada por esperar medio segundo más.
 */
export function useMontado() {
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    let vivo = true
    const seguir = () => { if (vivo) setMontado(true) }

    // Safari antiguo no tiene getAnimations: ahí se monta sin esperar.
    if (typeof document.getAnimations !== 'function') { seguir(); return }

    /* Solo las animaciones que TERMINAN. Las infinitas (las manchas del fondo,
       la marquesina, el cursor parpadeante) nunca resuelven su `finished` y
       dejarían esto colgado hasta la red de seguridad. */
    const entradas = document.getAnimations().filter((a) => {
      try { return a.effect?.getTiming?.().iterations !== Infinity } catch { return false }
    })

    if (!entradas.length) { seguir(); return }

    // Por si alguna animación se queda sin resolver, no dejar la página coja.
    const red = setTimeout(seguir, RED_DE_SEGURIDAD)
    Promise.allSettled(entradas.map((a) => a.finished)).then(() => {
      clearTimeout(red)
      seguir()
    })

    return () => { vivo = false; clearTimeout(red) }
  }, [])

  return montado
}
