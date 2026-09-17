import { useMontado } from './hooks/useMontado'
import { useTheme } from './hooks/useTheme'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { CursorGlow } from './components/CursorGlow'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Stack } from './components/sections/Stack'
import { Projects } from './components/sections/Projects'
import { Timeline } from './components/sections/Timeline'
import { Method } from './components/sections/Method'
import { Contact, Footer } from './components/sections/Contact'

export default function App() {
  const { toggle } = useTheme()

  /*
   * Solo el hero se pregenera en el HTML del build; el resto se monta en cuanto
   * React arranca.
   *
   * El motivo es medido, no teórico: con las siete secciones dentro del HTML el
   * navegador tenía que calcular estilos y pintarlas TODAS antes de poder
   * enseñar nada — 1,2 segundos en una sola tarea, en un móvil de gama media.
   * El hero se veía tarde por culpa de contenido que estaba fuera de pantalla.
   *
   * Lo de abajo no pierde nada por montarse un poco después: está fuera de
   * pantalla, y para cuando alguien baja ya lleva rato ahí. Respecto a lo que
   * había antes de pregenerar nada esto no es un retroceso, porque antes se
   * montaba así la página ENTERA, hero incluido.
   */
  const montado = useMontado()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[200]
                   focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm
                   focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />
      <CursorGlow />
      <Nav onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        {montado && (
          <>
            <About />
            <Stack />
            <Projects />
            <Timeline />
            <Method />
            <Contact />
          </>
        )}
      </main>

      {montado && <Footer />}
    </>
  )
}
