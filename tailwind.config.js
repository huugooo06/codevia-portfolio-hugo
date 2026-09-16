/** @type {import('tailwindcss').Config} */

// Los colores se declaran como canales RGB sueltos en index.css ("11 13 18")
// en lugar de hex. Así Tailwind puede seguir aplicando opacidad
// (bg-surface/60, text-ink/40...) sobre variables que cambian con el tema.
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:        themed('bg'),
        'bg-alt':  themed('bg-alt'),
        surface:   themed('surface'),
        'surface-2': themed('surface-2'),
        line:      themed('line'),
        'line-soft': themed('line-soft'),
        ink:       themed('ink'),
        'ink-soft': themed('ink-soft'),
        muted:     themed('muted'),
        brand:     themed('brand'),
        'brand-hi': themed('brand-hi'),
        live:      themed('live'),
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.2rem, 11vw, 7.4rem)', { lineHeight: '0.9', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-lg': ['clamp(2rem, 4.8vw, 3.6rem)', { lineHeight: '1.04', letterSpacing: '-0.028em', fontWeight: '500' }],
        'headline':   ['clamp(1.35rem, 2.2vw, 1.8rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.625rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      maxWidth: {
        wrap: '1180px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22,.8,.32,1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseRing: {
          '0%':   { boxShadow: '0 0 0 0 rgb(var(--live) / .55)' },
          '70%':  { boxShadow: '0 0 0 9px rgb(var(--live) / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(var(--live) / 0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        auroraA: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(8%, -6%) scale(1.12)' },
          '66%':  { transform: 'translate(-6%, 5%) scale(.94)' },
        },
        auroraB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(-9%, 7%) scale(.92)' },
          '66%':  { transform: 'translate(7%, -5%) scale(1.14)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'marquee-slow': 'marquee 64s linear infinite',
        float: 'float 7s cubic-bezier(.45,0,.55,1) infinite',
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(.22,.8,.32,1) infinite',
        shimmer: 'shimmer 2.4s cubic-bezier(.4,0,.2,1) infinite',
        'aurora-a': 'auroraA 22s ease-in-out infinite',
        'aurora-b': 'auroraB 27s ease-in-out infinite',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
