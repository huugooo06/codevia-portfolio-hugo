import { motion } from 'framer-motion'
import { projects } from '../../data/content'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { Chips, LiveDot, SectionHead } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { TextReveal } from '../ui/TextReveal'
import { Icon } from '../ui/Icon'
import { TiltCard } from '../ui/TiltCard'

function Tag({ children, live }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-[5px]
                  text-[12px] font-semibold uppercase tracking-[.06em] ${
                    live ? 'border-live/35 text-live' : 'border-line bg-surface-2 text-muted'
                  }`}
    >
      {live && <LiveDot />}
      {children}
    </span>
  )
}

function Card({ p }) {
  return (
    <TiltCard intensity={p.featured ? 3 : 5} className="h-full">
      {/* El propio contenido de la tarjeta es el grupo animado: cada bloque de
          texto entra escalonado, igual que en el resto de secciones. */}
      <RevealGroup
        stagger={0.07}
        className={`relative flex h-full flex-col overflow-hidden rounded-xl border border-line
                    bg-surface transition-colors duration-300 group-hover:border-brand/45
                    ${p.featured ? 'p-7 lg:p-9' : 'p-6'}`}
        style={
          p.featured
            ? {
                backgroundImage:
                  'radial-gradient(ellipse 90% 140% at 85% 0%, rgb(var(--brand) / .13), transparent 60%)',
              }
            : undefined
        }
      >
        <RevealItem className="mb-4 flex items-center justify-between gap-3">
          <Tag live={p.live}>{p.tag}</Tag>
          <span className="text-xs tracking-wide text-muted">{p.kind}</span>
        </RevealItem>

        {/* Las tarjetas sin logo reservan el mismo hueco: así los títulos de
            las que van lado a lado quedan alineados. */}
        {p.logo ? (
          <RevealItem className="mb-4">
            {/* `logoPlate` es para los logos monocromos en blanco: sobre el tema
                claro se volverían invisibles, así que van dentro de una placa
                oscura (que además es como los usa su propia marca). */}
            {p.logoPlate ? (
              <span
                className={`inline-flex items-center justify-center rounded-xl bg-[#0a0b1e]
                            ring-1 ring-white/10 ${p.featured ? 'h-16 px-4' : 'h-10 px-3'}`}
              >
                <img
                  src={p.logo}
                  alt=""
                  className={`w-auto object-contain ${p.featured ? 'h-9' : 'h-6'}`}
                  loading="lazy"
                />
              </span>
            ) : (
              <img
                src={p.logo}
                alt=""
                className={`w-auto object-contain ${p.featured ? 'h-16' : 'h-10'}`}
                loading="lazy"
              />
            )}
          </RevealItem>
        ) : (
          <div aria-hidden="true" className={`mb-4 ${p.featured ? 'h-16' : 'h-10'}`} />
        )}

        <TextReveal
          as="h3"
          text={p.title}
          className={`tracking-tight ${
            p.featured ? 'text-[clamp(1.9rem,4vw,2.9rem)]' : 'text-[1.5rem]'
          }`}
        />

        <RevealItem>
          <p className="mt-1 text-[14px] font-medium text-brand">{p.kicker}</p>
        </RevealItem>

        <RevealItem>
          <p
            className={`mt-3.5 text-[15.5px] leading-relaxed text-ink-soft ${
              p.featured ? 'max-w-[58ch]' : ''
            }`}
          >
            {p.text}
          </p>
        </RevealItem>

        <RevealItem className="mt-auto pt-5">
          <Chips items={p.items} small />
        </RevealItem>

        {p.link && (
          <RevealItem className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <motion.a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ gap: '12px' }}
              className="inline-flex items-center gap-[7px] text-sm font-semibold text-brand"
            >
              {p.link.label}
              <Icon name="external" className="h-[15px] w-[15px]" />
            </motion.a>
            {p.link.note && (
              <span className="text-xs text-muted">({p.link.note})</span>
            )}
          </RevealItem>
        )}
      </RevealGroup>
    </TiltCard>
  )
}

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="proyectos" className="relative isolate py-20 lg:py-32">
      <GridBackdrop mask="radial-gradient(ellipse 65% 55% at 88% 8%, #000 8%, transparent 70%)" />

      <div className="wrap">
        <SectionHead
          eyebrow="03 — Proyectos"
          title={['Cosas que están', 'funcionando ahora mismo.']}
          sub="No son ejercicios de clase: son sistemas en producción, con usuarios, dominio y certificado."
          className="mb-12 lg:mb-16"
        />

        <div className="grid gap-4">
          {featured.map((p) => (
            <Card key={p.title} p={p} />
          ))}

          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <Card key={p.title} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
