import { motion } from 'framer-motion'
import { extras, stack } from '../../data/content'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { Chips, SectionHead } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { TextReveal } from '../ui/TextReveal'
import { TechLogo } from '../ui/TechLogo'

export function Stack() {
  return (
    <section
      id="stack"
      className="relative isolate border-y border-line-soft bg-bg-alt py-20 lg:py-32"
    >
      <GridBackdrop
        opacity={0.45}
        mask="radial-gradient(ellipse 95% 60% at 50% 0%, #000 5%, transparent 72%)"
      />

      <div className="wrap">
        <SectionHead
          eyebrow="02 — Stack técnico"
          title="Del código al servidor."
          sub="Lo que manejo hoy. Pasa por encima de cualquiera."
          className="mb-12 lg:mb-16"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {stack.map((group) => (
            /* Una única cascada por tarjeta: cabecera, descripción y después
               los logos uno a uno. */
            <RevealGroup
              key={group.num}
              stagger={0.05}
              className="relative h-full overflow-hidden rounded-xl border border-line
                         bg-surface p-6 lg:p-7"
            >
              {/* El h3 va fuera del RevealItem: si se anidan, el fundido con
                  desenfoque y la cortina por palabras se pisan y queda sucio. */}
              <header className="flex items-baseline gap-3">
                <RevealItem
                  as="span"
                  className="font-display text-sm font-semibold tracking-wider text-brand"
                >
                  {group.num}
                </RevealItem>
                <TextReveal as="h3" text={group.title} className="text-[1.25rem] tracking-tight" />
              </header>

              <RevealItem>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{group.text}</p>
              </RevealItem>

              {/* `variants={{}}` hace de esta lista un nodo de variantes que no
                  se anima a sí mismo pero deja pasar la cascada hasta los logos.
                  Con un <ul> normal la propagación se cortaría aquí. */}
              <motion.ul
                variants={{}}
                className="mt-7 grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-3"
              >
                {group.items.map((slug, i) => (
                  <TechLogo key={slug} slug={slug} index={i} />
                ))}
              </motion.ul>
            </RevealGroup>
          ))}
        </div>

        {/* Competencias de SMR que no tienen logo propio */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border
                          border-line bg-surface px-6 py-5">
            <p className="text-[14px] font-semibold uppercase tracking-[.12em] text-brand">
              {extras.title}
            </p>
            <Chips items={extras.items} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
