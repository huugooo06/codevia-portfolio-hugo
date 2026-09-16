import { method } from '../../data/content'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHead } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { TextReveal } from '../ui/TextReveal'

export function Method() {
  return (
    <section id="metodo" className="relative isolate py-20 lg:py-32">
      <GridBackdrop mask="radial-gradient(ellipse 90% 70% at 50% 100%, #000 8%, transparent 72%)" />

      <div className="wrap">
        <SectionHead
          eyebrow="05 — Cómo trabajo"
          title={['Sin humo.', 'Cuatro pasos.']}
          className="mb-12 lg:mb-16"
        />

        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {method.map((m, i) => (
            <RevealGroup
              key={m.n}
              stagger={0.06}
              className={`group relative px-0 py-7 sm:px-6 lg:py-8
                          ${i === 0 ? 'sm:pl-0' : ''}
                          ${i === method.length - 1 ? 'sm:pr-0' : ''}
                          ${i > 0 ? 'border-t border-line sm:border-t-0' : ''}
                          ${i === 1 ? 'sm:border-t-0' : ''}
                          ${i >= 2 ? 'sm:border-t sm:border-line lg:border-t-0' : ''}
                          ${i < method.length - 1 ? 'sm:border-r sm:border-line' : ''}
                          ${i === 1 ? 'sm:border-r-0 lg:border-r lg:border-line' : ''}`}
            >
              {/* Barra que se llena al pasar por encima */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-0.5 w-0 bg-brand
                           transition-[width] duration-500 ease-smooth group-hover:w-full"
              />
              <RevealItem>
                <span className="block font-display text-[2.4rem] font-medium leading-none
                                 tracking-tight text-brand/30 transition-colors duration-300
                                 group-hover:text-brand">
                  {m.n}
                </span>
              </RevealItem>
              <TextReveal as="h3" text={m.title} className="mt-4 text-[1.1rem] tracking-tight" />
              <RevealItem>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.text}</p>
              </RevealItem>
            </RevealGroup>
          ))}
        </div>
      </div>
    </section>
  )
}
