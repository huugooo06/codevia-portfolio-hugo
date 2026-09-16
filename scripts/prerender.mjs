import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

/*
 * Incrusta el HTML de la web dentro de dist/index.html.
 *
 * Por qué existe esto: el sitio es estático (no hay datos que dependan de quién
 * mira) pero se pintaba entero con JavaScript. El navegador recibía un <div>
 * vacío y no aparecía NADA hasta haber bajado, parseado y ejecutado ~140 KB de
 * JS. Medido en un móvil de gama media con 4G flojo: 3.036 ms hasta el primer
 * pintado. Generando el HTML en el build, el texto viaja en la primera
 * respuesta y React solo tiene que hidratarlo por encima.
 *
 * NO convierte esto en una web con servidor: en producción sigue habiendo solo
 * un nginx sirviendo ficheros. El render ocurre aquí, en el build.
 */
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const indice = resolve(raiz, 'dist/index.html')
const servidor = resolve(raiz, 'dist-ssr/entry-server.js')

const { render } = await import(pathToFileURL(servidor).href)
const cuerpo = render()

const html = readFileSync(indice, 'utf8')
const hueco = '<div id="root"></div>'

if (!html.includes(hueco)) {
  // Mejor romper el build que publicar una página que parezca correcta y haya
  // perdido el prerenderizado sin avisar.
  console.error(`prerender: no se encontró ${hueco} en dist/index.html`)
  process.exit(1)
}

writeFileSync(indice, html.replace(hueco, `<div id="root">${cuerpo}</div>`), 'utf8')

// El bundle de servidor solo hacía falta para esto; no debe acabar publicado.
rmSync(resolve(raiz, 'dist-ssr'), { recursive: true, force: true })

const kb = (s) => `${Math.round(Buffer.byteLength(s, 'utf8') / 1024)} KB`
console.log(`prerender: HTML incrustado (${kb(cuerpo)} de marcado dentro de index.html)`)
