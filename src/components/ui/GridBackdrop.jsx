/* ─────────────────────────────────────────────────────────────
   Rejilla difuminada de fondo.

   Nació en el hero y se reutiliza en todas las secciones para que
   ninguna quede con el fondo completamente plano.

   Dos cosas importantes:

   1. Va SIEMPRE con máscara. Sin ella la rejilla llega hasta los
      bordes y se lee como una tabla, no como una textura. Cada
      sección usa una máscara distinta (arriba, a un lado, abajo)
      para que no parezca el mismo sello repetido seis veces.

   2. La sección que la use necesita `relative isolate`. `isolate`
      crea un contexto de apilamiento propio: así el `-z-10` se
      queda detrás del contenido pero por delante del fondo de la
      sección, en vez de colarse debajo de la página entera.
   ───────────────────────────────────────────────────────────── */
export function GridBackdrop({
  size = 68,
  opacity = 0.4,
  mask = 'radial-gradient(ellipse 80% 55% at 50% 30%, #000 20%, transparent 75%)',
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{
        opacity,
        backgroundImage:
          'linear-gradient(to right, rgb(var(--grid)) 1px, transparent 1px),' +
          'linear-gradient(to bottom, rgb(var(--grid)) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  )
}
