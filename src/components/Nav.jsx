import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { nav } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { Icon } from './ui/Icon'
import { Magnetic } from './ui/Magnetic'

const NAV_IDS = nav.map((n) => n.id)

/* Sin prop `theme`: el icono del conmutador lo decide CSS con el `data-theme`
   del <html>, no el estado de React. Ver el comentario del botón. */
export function Nav({ onToggleTheme }) {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setStuck(y > 12))

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.8, 0.32, 1] }}
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
        stuck
          ? 'border-line-soft bg-bg/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent'
      }`}
    >
      <div className="wrap flex items-center gap-5 py-3.5">
        {/* Marca: solo el nombre, con la misma tipografía y el mismo degradado
            que el h1 del hero. Las `fontVariationSettings` y el interletraje van
            explícitos porque aquí es un <span>, y la regla base que los aplica
            solo alcanza a h1-h4. Sin animación al pasar por encima. */}
        <a href="#top" className="mr-auto" aria-label="Hugo Córdoba — inicio">
          <span
            className="font-display text-[18px] font-medium leading-none
                       tracking-[-0.02em] sm:text-[19px]"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 0, 'opsz' 60" }}
          >
            Hugo <span className="italic text-gradient">Córdoba</span>
          </span>
        </a>

        {/* Enlaces escritorio */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors
                          duration-200 hover:text-ink ${
                            active === item.id ? 'text-ink' : 'text-ink-soft'
                          }`}
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3.5 bottom-0.5 h-0.5 rounded-full bg-brand"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <Magnetic as="a" href="#contacto" strength={0.3}
            className="ml-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg
                       transition-opacity hover:opacity-85">
            Hablemos
          </Magnetic>
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Cambiar tema"
            className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line
                       text-ink-soft transition-colors hover:border-brand hover:bg-brand/10 hover:text-ink"
          >
            {/* Los DOS iconos van siempre en el DOM y es CSS quien enseña el que
                toca, mirando el `data-theme` del <html>. No es rebuscado: el
                HTML se genera en el build, que no sabe qué tema tiene cada
                visitante, así que si el icono dependiera del estado de React
                bastaría con tener el tema claro para que el marcado recibido no
                coincidiera con el primer render — y ante eso React tira el HTML
                pregenerado entero y vuelve a pintar desde cero, que es justo lo
                que hace lenta la página en el móvil.
                De paso el conmutador ya funciona antes de que cargue el JS. */}
            <span className="grid place-items-center">
              <Icon name="sun" className="icono-tema icono-tema-sol h-[19px] w-[19px]" />
              <Icon name="moon" className="icono-tema icono-tema-luna h-[19px] w-[19px]" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line
                       text-ink-soft transition-colors hover:border-brand hover:text-ink md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-[19px] w-[19px]" />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 0.8, 0.32, 1] }}
            className="mx-3 mb-3 rounded-xl border border-line bg-surface/95 p-3
                       shadow-[0_32px_70px_-28px_rgb(0_0_0/.8)] backdrop-blur-xl md:hidden"
            aria-label="Navegación principal"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                className="block rounded-lg px-4 py-3 text-[16px] font-medium leading-snug
                           text-ink-soft transition-colors hover:bg-brand/10 hover:text-ink"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + nav.length * 0.05, duration: 0.3 }}
              className="mt-1.5 block rounded-full bg-ink px-5 py-3 text-center text-[16px]
                         font-semibold text-bg"
            >
              Hablemos
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
