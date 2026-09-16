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
        <About />
        <Stack />
        <Projects />
        <Timeline />
        <Method />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
