import { about } from '../../data/content'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHead } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { Icon } from '../ui/Icon'
import { TiltCard } from '../ui/TiltCard'

/** Convierte los **dobles asteriscos** del contenido en <strong>. */
function RichText({ text }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export function About() {
  return (
    <section id="sobre-mi" className="relative isolate py-20 lg:py-32">
      <GridBackdrop mask="radial-gradient(ellipse 70% 65% at 12% 0%, #000 8%, transparent 70%)" />

      <div className="wrap">
        <SectionHead eyebrow="01 — Sobre mí" title={about.title} className="mb-12 lg:mb-16" />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-ink-soft">
            <Reveal>
              <p className="font-display text-[clamp(1.2rem,1.8vw,1.45rem)] font-normal leading-snug text-ink">
                <RichText text={about.paragraphs[0]} />
              </p>
            </Reveal>
            {about.paragraphs.slice(1).map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-4 text-[1.0625rem] leading-relaxed">
                  <RichText text={p} />
                </p>
              </Reveal>
            ))}
          </div>

          <RevealGroup className="grid gap-3.5 sm:grid-cols-2" stagger={0.09}>
            {about.traits.map((t) => (
              <RevealItem key={t.title}>
                <TiltCard intensity={5} className="h-full">
                  <div className="relative h-full rounded-lg border border-line bg-surface p-5
                                  transition-colors duration-300 group-hover:border-brand/45">
                    <span className="mb-3.5 grid h-[38px] w-[38px] place-items-center rounded-[10px]
                                     bg-brand/12 text-brand transition-transform duration-300
                                     group-hover:scale-110">
                      <Icon name={t.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-[1.0625rem] tracking-tight">{t.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{t.text}</p>
                  </div>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
