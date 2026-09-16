import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const contenedor = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/* En producción el HTML ya viene escrito desde el build (scripts/prerender.mjs)
   y solo hay que hidratarlo: así el texto se ve sin esperar a este fichero.
   En `npm run dev` no hay prerenderizado y #root llega vacío, de ahí las dos
   ramas — hydrateRoot sobre un contenedor vacío no pintaría nada. */
if (contenedor.hasChildNodes()) {
  hydrateRoot(contenedor, app)
} else {
  createRoot(contenedor).render(app)
}
