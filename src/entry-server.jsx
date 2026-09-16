import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Punto de entrada del prerenderizado. Se ejecuta UNA VEZ en el build (nunca en
 * producción: aquí no corre Node, solo un nginx sirviendo estáticos) y su
 * resultado se incrusta en dist/index.html — ver scripts/prerender.mjs.
 *
 * Sin `<StrictMode>` a propósito: en el servidor no aporta nada y duplicaría el
 * render del árbol entero.
 */
export function render() {
  return renderToString(<App />)
}
