import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'

/* ─────────────── Etiqueta de sección ─────────────── */
export function Eyebrow({ children, className = '', center = false }) {
  return (
    <p
      className={`text-label-caps uppercase text-brand flex items-center gap-2.5 ${
        center ? 'justify-center' : ''
      } ${className}`}
    >
      <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
      {children}
    </p>
  )
}

/* ─────────────── Cabecera de sección ─────────────── */
export function SectionHead({ eyebrow, title, sub, center = false, className = '' }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal>
        <Eyebrow center={center}>{eyebrow}</Eyebrow>
      </Reveal>
      <h2 className="text-display-lg mt-5">
        {lines.map((line, i) => (
          <TextReveal key={i} text={line} as="span" className="block" delay={i * 0.08} />
        ))}
      </h2>
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-4 text-ink-soft text-[clamp(1.05rem,1.3vw,1.175rem)] leading-relaxed max-w-[52ch] ${center ? 'mx-auto' : ''}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ─────────────── Chip de tecnología ─────────────── */
export function Chip({ children, small = false }) {
  return (
    <li
      className={`rounded-full border border-line bg-surface-2 text-ink-soft whitespace-nowrap
                  transition-colors duration-300 hover:border-brand/50 hover:text-ink
                  ${small ? 'text-[12px] px-2.5 py-1' : 'text-[13px] px-3 py-[5px]'}`}
    >
      {children}
    </li>
  )
}

export function Chips({ items, small = false, className = '' }) {
  if (!items?.length) return null
  return (
    <ul className={`flex flex-wrap gap-[7px] ${className}`}>
      {items.map((it) => (
        <Chip key={it} small={small}>{it}</Chip>
      ))}
    </ul>
  )
}

/* ─────────────── Punto "en vivo" ─────────────── */
export function LiveDot({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`h-[7px] w-[7px] shrink-0 rounded-full bg-live animate-pulse-ring ${className}`}
    />
  )
}

/* ─────────────── Marquesina infinita ─────────────── */
export function Marquee({ words, className = '' }) {
  const reduced = useReducedMotion()
  // Se duplica la lista porque la animación desplaza justo un -50%:
  // al llegar al final la segunda copia ocupa la posición de la primera.
  const loop = [...words, ...words]

  return (
    <div
      className={`overflow-hidden border-y border-line-soft bg-bg-alt py-4 ${className}`}
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
      aria-hidden="true"
    >
      <div className={`flex w-max items-center gap-6 font-display text-[16px] text-muted ${reduced ? '' : 'animate-marquee'}`}>
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            {w}
            <span className="text-brand">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── Botón ─────────────── */
export function Button({ children, variant = 'primary', size = 'md', className = '', ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold ' +
    'transition-colors duration-300 border'
  const sizes = {
    md: 'px-6 py-3 text-[15.5px]',
    lg: 'px-7 py-4 text-[16.5px]',
  }
  const variants = {
    primary: 'bg-brand text-white border-transparent hover:bg-brand-hi shadow-[0_10px_28px_-12px_rgb(var(--brand)/.55)]',
    ghost: 'border-line text-ink hover:border-brand hover:bg-brand/10',
  }
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  )
}
