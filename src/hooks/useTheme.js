import { useCallback, useEffect, useState } from 'react'

/**
 * El tema inicial ya lo resolvió el script inline de index.html antes del
 * primer paint, así que aquí solo lo leemos del DOM y ofrecemos el toggle.
 */
export function useTheme() {
  /* El guard de `document` es por el prerenderizado del build, que corre en
     Node: allí no hay DOM. Devolver 'dark' coincide con lo que escribe el
     script inline del <head> mientras no haya preferencia guardada, así que el
     HTML generado y el primer render del navegador no discrepan. */
  const [theme, setTheme] = useState(() =>
    typeof document === 'undefined'
      ? 'dark'
      : document.documentElement.getAttribute('data-theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('hc-theme', theme) } catch { /* modo privado */ }

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'light' ? '#f4f2ed' : '#0b0d12'
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}
