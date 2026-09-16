import { motion } from 'framer-motion'
import { contact, email, emailCodevia, social } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { TextReveal } from '../ui/TextReveal'
import { Button, Eyebrow } from '../ui/Bits'
import { GridBackdrop } from '../ui/GridBackdrop'
import { Icon } from '../ui/Icon'
import { Magnetic } from '../ui/Magnetic'

const mailto = (dir) =>
  `mailto:${dir}?subject=${encodeURIComponent('Contacto desde tu portfolio')}`

const LABELS = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  whatsapp: 'WhatsApp',
  codevia: 'Codevia',
}

export function Contact() {
  // Los enlaces sin URL en content.js simplemente no se pintan.
  const links = Object.entries(social).filter(([, url]) => Boolean(url))

  return (
    <section
      id="contacto"
      className="relative isolate border-t border-line-soft bg-bg-alt py-20 lg:py-32"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 70% 100% at 50% 100%, rgb(var(--brand) / .14), transparent 70%)',
      }}
    >
      {/* Aquí la máscara tira hacia arriba: la parte de abajo ya la ocupa el
          resplandor azul del fondo y las dos texturas se ensuciarían. */}
      <GridBackdrop
        opacity={0.45}
        mask="radial-gradient(ellipse 80% 60% at 50% 10%, #000 8%, transparent 72%)"
      />

      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow center>06 — Contacto</Eyebrow>
          </Reveal>

          <h2 className="mt-5 text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.05] tracking-tight">
            {contact.title.map((line, i) => (
              <TextReveal key={i} text={line} as="span" className="block" delay={i * 0.08} />
            ))}
          </h2>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-[48ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed text-ink-soft">
              {contact.sub}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <Magnetic strength={0.3}>
                <Button size="lg" href={mailto(email)}>
                  <Icon name="mail" className="h-[19px] w-[19px]" />
                  {email}
                </Button>
              </Magnetic>

              {emailCodevia && (
                <p className="text-[14.5px] text-muted">
                  Para consultas sobre Codevia:{' '}
                  <a
                    href={mailto(emailCodevia)}
                    className="font-medium text-brand underline-offset-4 hover:underline"
                  >
                    {emailCodevia}
                  </a>
                </p>
              )}
            </div>
          </Reveal>

          {links.length > 0 && (
            <Reveal delay={0.35}>
              <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2.5">
                {links.map(([key, url]) => (
                  <li key={key}>
                    <motion.a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="border-b border-transparent pb-0.5 text-sm font-medium text-muted
                                 transition-colors hover:border-brand hover:text-brand"
                    >
                      {LABELS[key] || key}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-bg py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-2.5 text-[14.5px] text-muted">
        <p>© {new Date().getFullYear()} Hugo Córdoba</p>
        <p>
          Diseñado y desarrollado por mí ·{' '}
          <a
            href={social.codevia}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand hover:underline"
          >
            Codevia
          </a>
        </p>
      </div>
    </footer>
  )
}
