# Portfolio — Hugo Córdoba

Portfolio personal servido en **https://hugo.codeviaesp.com**.

SPA en **React 19 + Vite + Tailwind**, con animaciones de **Framer Motion**.
Misma stack que la landing de Codevia, para no mantener dos versiones distintas
de las mismas librerías.

El build genera estáticos: en producción **no corre Node**, solo un `nginx:alpine`
sirviendo ficheros (~6 MB de RAM). Tampoco hay peticiones a terceros — las fuentes
van auto-alojadas, así que la web no llama a ningún CDN externo (RGPD limpio y sin
necesidad de banner de cookies).

---

## Comandos

```bash
npm install
npm run dev       # servidor de desarrollo en localhost:5173
npm run build     # genera dist/
npm run preview   # previsualiza el build
```

---

## Estructura

```
CODEVIA-PORTFOLIO-HUGO/
├── Dockerfile              # multi-etapa: node build → nginx sirve dist/
├── nginx.conf              # server_name literal + política de cache
├── security-headers.conf   # cabeceras de seguridad — ver aviso más abajo
├── index.html              # metas, OG, JSON-LD y el script inline del tema
├── tailwind.config.js      # tokens de diseño y keyframes
├── fotos-originales/       # material de referencia — fuera del repo y del build
├── public/
│   ├── fonts/              # Fraunces + Inter (woff2 auto-alojados, ~260 KB)
│   ├── img/                # foto de portada, favicon
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── App.jsx
    ├── index.css           # @font-face, tokens de color y capas de Tailwind
    ├── data/content.js     # ⬅ TODO el texto y los enlaces
    ├── hooks/
    └── components/
        ├── Nav.jsx, ScrollProgress.jsx, CursorGlow.jsx
        ├── sections/       # Hero, About, Stack, Projects, Timeline, Method, Contact
        └── ui/             # Reveal, TextReveal, TiltCard, Magnetic, Bits, Icon
```

---

## Editar el contenido

**Casi todo está en [`src/data/content.js`](src/data/content.js)**: textos, proyectos,
formación, tecnologías y enlaces. No hace falta tocar componentes para cambiar
lo que dice la web.

| Qué quieres cambiar | Dónde |
|---|---|
| Textos, proyectos, formación, stack | `src/data/content.js` |
| **Enlaces a LinkedIn / GitHub / WhatsApp** | `src/data/content.js` → objeto `social` |
| Colores y tipografía | `src/index.css` → bloques `:root` |
| Escalas, sombras, animaciones | `tailwind.config.js` |
| Foto de portada | sustituye `public/img/hugo-portada.jpg` |
| Favicon | se **recorta de la portada**, ver abajo |

### La marca de la barra superior

Es **solo el nombre**, sin icono: «Hugo» en el color de texto y «Córdoba» en cursiva
con el degradado de marca, exactamente igual que el `h1` del hero.

Al ser un `<span>` y no un encabezado, la regla base que aplica `font-variation-settings`
y el interletraje a `h1`-`h4` **no le llega**, por eso van escritos a mano en el
componente. Si se tocan los del hero, hay que tocar también estos o la barra dejará de
coincidir con el titular.

### Favicon

El favicon **sí** es la foto de portada recortada a la cara. Los tres tamaños salen de
`hugo-portada.jpg` con un recorte cuadrado de 1050 px empezando en (90, 155):

| Fichero | Tamaño | Para qué |
|---|---|---|
| `favicon-32.png` | 32 | Pestaña del navegador |
| `favicon-16.png` | 16 | Pestaña en pantallas normales |
| `apple-touch-icon.png` | 180 | Añadir a pantalla de inicio en iOS |

**Si cambias la portada hay que regenerarlos**, si no la cara del icono seguirá siendo
la antigua. Van en PNG porque los favicons no admiten JPEG.

`favicon.svg` sigue en la carpeta pero **ya no se enlaza**: los navegadores que
admiten favicon SVG lo prefieren sobre los PNG y taparía la foto.

### Añadir o quitar una tecnología

Los `items` de cada grupo de `stack` son **claves de `src/data/techIcons.js`**, no texto.
Para quitar una tecnología basta con borrar su clave del grupo.

Para **añadir** una que todavía no esté, hay que meter su logo en `techIcons.js`:

```bash
# 1. Busca el "slug" en https://simpleicons.org  (p.ej. "kotlin")
curl -s https://cdn.jsdelivr.net/npm/simple-icons@13/icons/kotlin.svg
# 2. Copia el valor del atributo d="..." del <path>
# 3. Añade la entrada a src/data/techIcons.js:
#    "kotlin": { "name": "Kotlin", "color": "#7F52FF", "d": "M24 24H0V0h24..." }
```

Los trazados están copiados a mano en ese archivo a propósito: evita depender de un
CDN y evita arrastrar el paquete entero de Simple Icons (varios MB) al bundle.

Cada entrada admite un `viewBox` propio (por defecto `0 0 24 24`, que es el de Simple
Icons). **El logo de Java viene de Devicon**, no de Simple Icons: Simple Icons retiró
el suyo por marca registrada y solo ofrece el de OpenJDK, que no es el mismo logo.
Devicon usa una caja de `0 0 128 128`, de ahí que el campo exista.

Si una tecnología no tiene logo propio (redes, hardware, virtualización…), va como
texto en `extras`, que se pinta como una fila de etiquetas debajo de la rejilla.

> **Enlaces sociales**: los que estén como `''` en `social` **se eliminan solos**
> de la web. Así nunca hay un enlace que no lleva a ningún sitio.

### Logos de los proyectos

El campo `logo` de cada proyecto es una ruta dentro de `public/img/`. Si el logo es
**monocromo en blanco** (como el de Axis BCN), hay que añadir además `logoPlate: true`:
lo mete dentro de una placa oscura redondeada. Sin ella el logo sería invisible en el
tema claro, porque sería blanco sobre blanco. La placa además es como la propia marca
usa su logo en su aplicación, así que no es un apaño: es su uso real.

Las tarjetas **sin** logo reservan el mismo hueco vertical, para que los títulos de
las que van lado a lado queden alineados.

### Sistema de color

Los colores se declaran en `src/index.css` como **canales RGB sueltos**
(`--brand: 59 123 255`) en vez de hexadecimales. Eso permite que Tailwind aplique
opacidad sobre variables que cambian con el tema (`bg-brand/10`, `text-ink/40`…),
cosa que con `--brand: #3b7bff` no funcionaría.

Hay dos bloques: `:root` (tema oscuro, el de por defecto) y `:root[data-theme='light']`.

### Tema claro / oscuro

El botón de la barra superior alterna el tema y lo guarda en `localStorage`. Si el
visitante nunca ha elegido, se respeta la preferencia de su sistema. El tema se
resuelve en un `<script>` inline de `index.html` **antes del primer paint** — desde
el bundle de React llegaría tarde y habría un destello de color al cargar.

### Rejilla de fondo

Todas las secciones llevan `<GridBackdrop />` (en `ui/GridBackdrop.jsx`) para que
ninguna quede con el fondo plano. Dos detalles que no son obvios:

- **Siempre con máscara.** Sin ella la rejilla llega hasta los bordes y se lee como
  una tabla. Cada sección usa una posición distinta (arriba, a un lado, abajo) para
  que no parezca el mismo sello repetido seis veces.
- **La sección necesita `relative isolate`.** `isolate` le da contexto de apilamiento
  propio, así el `-z-10` queda detrás del contenido pero delante del fondo de la
  sección, en vez de colarse debajo de la página entera.

El color sale del token **`--grid`**, que existe aparte de `--line-soft` a propósito:
en el tema claro `--line-soft` está a 4 puntos del fondo y la rejilla no se veía.

---

## Notas de las animaciones

Los revelados usan **`once: false`**: se repiten cada vez que el elemento vuelve a
entrar en pantalla, también al subir. La configuración del viewport
(`amount: 0` + `margin: '0px 0px -14% 0px'`, en `ui/Reveal.jsx`) es deliberada:

- al **entrar** desde abajo, el margen negativo retrasa el disparo hasta que el
  elemento está de verdad dentro, no cuando asoma un píxel;
- al **salir** por arriba, `amount: 0` lo mantiene "en pantalla" mientras quede
  cualquier parte visible, así que no se desvanece delante del usuario.

Con un `amount` alto, el texto desaparecía todavía estando a la vista. Efecto
secundario conocido: en una captura de pantalla de página completa las secciones
fuera del viewport salen vacías — es esperado, no un fallo.

**El -22% está medido, no elegido a ojo.** Con -14% los textos terminaban de
aparecer al 95-98% de la altura de pantalla, es decir pegados al borde inferior:
para cuando el usuario los tenía delante la animación ya había acabado y la
sensación era que no existía ninguna animación fuera del hero. Si algún día se
toca este valor, comprobarlo navegando con los enlaces del menú, que es el caso
más exigente: el scroll suave atraviesa las secciones deprisa.

Por el mismo motivo el recorrido de entrada es amplio (38-46 px) y lleva
desenfoque: un fundido de 26 px pasaba desapercibido mientras se hace scroll.

Cada sección anima **su texto bloque a bloque**, no la tarjeta entera: el contenedor
es un `RevealGroup` y cada párrafo un `RevealItem`, de forma que todo entra en cascada
con el mismo ritmo en toda la web. Cuando en medio hay un elemento que rompe la cadena
(por ejemplo un `<ul>` normal), se usa `<motion.ul variants={{}}>`: es un nodo de
variantes que no se anima a sí mismo pero **deja pasar la cascada** a sus hijos. Con un
`<ul>` normal la propagación se corta y los hijos no se animan nunca.

Trampas ya resueltas que conviene no reintroducir:

1. **`TextReveal`** — el `whileInView` va en el *contenedor* de cada palabra, nunca
   en la palabra. La palabra arranca en `y: 110%`, o sea fuera del `overflow-hidden`
   del contenedor, e IntersectionObserver tiene en cuenta el recorte de los
   ancestros: observando la palabra su ratio sería siempre 0 y el texto no
   aparecería jamás.

2. **Transforms de Tailwind + Framer Motion** — Motion escribe `transform` inline y
   pisa utilidades como `-translate-x-1/2`. Si un elemento animado necesita
   centrarse, el desplazamiento va dentro del propio `motion` (`x: '-50%'`), no en
   una clase.

3. **`overflow-x: clip`** en `html`/`body` en vez de `hidden`: `hidden` convertiría
   la raíz en contenedor de scroll y rompería `position: sticky` y los efectos
   basados en `useScroll`.

4. **El espacio entre palabras va FUERA del `inline-block`** en `TextReveal`. Si se
   mete dentro, CSS recorta el espacio final del inline-block y el título sale con
   todas las palabras pegadas ("Delcódigoalservidor").

### `prefers-reduced-motion`: reducido, no eliminado

Con "reducir movimiento" activado los componentes **no devuelven contenido estático**:
sustituyen la animación por un **fundido sin desplazamiento ni desenfoque**. La primera
versión sí la eliminaba por completo, y el resultado fue un fallo real: el visitante
veía animación únicamente en el hero —cuyos `motion` no pasaban por ese filtro— y
ninguna en el resto de la web. Además, "movimiento reducido" significa evitar
desplazamientos amplios y paralaje, no prohibir cualquier transición.

Lo que sí se desactiva del todo con esa preferencia: paralaje del retrato, marquesina,
manchas de color del fondo y el halo del cursor.

Para probarlo sin tocar la configuración del sistema, en Playwright:
`browser.newContext({ reducedMotion: 'reduce' })`.

### Nombres de variante, no objetos sueltos

Los componentes de revelado usan `variants={{hidden, show}}` + `initial="hidden"` +
`whileInView="show"`, nunca objetos sueltos en `initial`/`whileInView`. El motivo: si el
componente acaba dentro de un `RevealGroup`, **el padre propaga su variante a los hijos
y eso pisa el `whileInView` propio**; si el hijo no tiene una variante con ese nombre,
se queda clavado en su estado inicial y el texto no aparece nunca.

---

## Desplegar

```bash
cd ../deploy
make hugo-up          # primera vez
make rebuild-hugo     # tras cambiar algo del portfolio
make hugo-logs        # ver logs
```

### ⚠️ Las cabeceras de seguridad van en un `include`, y no es por gusto

En nginx **`add_header` no se acumula entre niveles**: en cuanto un `location`
declara una `add_header` propia, **descarta todas las heredadas del `server`**.

Este sitio tiene cuatro locations con su propio `Cache-Control`, así que con las
cabeceras de seguridad declaradas solo a nivel de `server` **desaparecían de esas
respuestas — incluida la del HTML**, que es justo donde más falta hacen. Se detectó
ya en producción: `robots.txt` las llevaba y la página no.

Por eso viven en `security-headers.conf` y se hace `include` en el `server` **y en
cada location que tenga `add_header`**. Si añades un location con `add_header`,
mete el include también.

Comprobarlo tras un despliegue:

```bash
curl -sI https://hugo.codeviaesp.com/ | grep -i 'x-frame-options\|x-content-type'
```

### Despliegue automático

Cada push a `main` dispara `.github/workflows/deploy.yml`, que primero comprueba que
el proyecto compila y solo entonces avisa al servidor. **No hace falta entrar por SSH
para publicar un cambio.**

Para ver qué pasó: pestaña **Actions** del repositorio. Si el despliegue falla, el
workflow sale en rojo y GitHub manda un correo.

#### Cómo está montada la seguridad

La clave SSH que guarda GitHub **no puede hacer nada más que redesplegar esta web**.
En el `authorized_keys` del servidor está registrada con `command="..."`, así que el
servidor ignora cualquier comando que le manden y ejecuta siempre el mismo script.
Aunque alguien se hiciera con la clave, no tendría una consola: solo podría lanzar el
redespliegue.

El script vive **en el servidor**, en `/opt/codevia/deploy-portfolio.sh`, y no en este
repositorio, a propósito: si estuviera aquí, quien pudiera modificar el repo podría
cambiar lo que se ejecuta y la restricción no serviría de nada. **Si tocas ese script,
acuérdate de que este README es la documentación pero la copia que manda es la del
servidor.**

Contenido del script:

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO=/opt/codevia/CODEVIA-PORTFOLIO-HUGO
DEPLOY=/opt/codevia/deploy

echo "==> Traer el código"
git -C "$REPO" fetch --prune origin
git -C "$REPO" reset --hard origin/main

cd "$DEPLOY"

echo "==> Construir la imagen"
docker compose build portfolio-hugo

echo "==> Validar la configuración de nginx"
docker compose run --rm --no-deps portfolio-hugo nginx -t

echo "==> Levantar"
docker compose up -d --no-deps portfolio-hugo

echo "==> Limpiar imágenes huérfanas"
docker image prune -f >/dev/null

echo "==> Comprobar"
sleep 5
curl -fsS -o /dev/null -w 'HTTP %{http_code}\n' https://hugo.codeviaesp.com/
echo "Despliegue correcto"
```

Dos detalles del script que importan:

- **`reset --hard` en vez de `git pull`.** Esa carpeta del servidor es una copia de
  trabajo de despliegue, no un sitio donde editar: si alguien tocó algo ahí, un `pull`
  daría conflicto y el despliegue se quedaría a medias. El `reset` deja siempre
  exactamente lo que hay en `main`.
- **El `nginx -t` va antes del `up`.** Prueba la configuración dentro de la imagen
  nueva sin tocar el contenedor que está sirviendo. Con `set -e`, si falla el script
  aborta ahí y la web sigue en pie con la versión anterior.

### Requisito previo — DNS

Hace falta un registro **A** de `hugo.codeviaesp.com` apuntando a la IP del
servidor. Sin él Let's Encrypt no puede emitir el certificado.

### ⚠️ Si cambias el dominio

El `server_name` de `nginx.conf` es un **literal** — nginx no soporta comodines de
dos niveles (`hugo.*.com` no coincide con `hugo.codeviaesp.com`). Hay que tocar
**los dos sitios a la vez**:

1. `deploy/.env` → `PORTFOLIO_HUGO_DOMAIN`
2. `CODEVIA-PORTFOLIO-HUGO/nginx.conf` → `server_name`

Y además las URLs absolutas de `index.html` (canonical, OG, JSON-LD) y de
`public/robots.txt` / `public/sitemap.xml`.

---

## Pendiente

- [ ] Rellenar `social` en `src/data/content.js` con LinkedIn y GitHub reales
- [ ] Generar `public/img/og-cover.jpg` (1200×630) para las previsualizaciones al compartir
- [ ] Crear el registro DNS `hugo.codeviaesp.com`
- [ ] Revisar la lista de tecnologías de `stack` y quitar lo que no domines
- [ ] *(Opcional)* El bundle son ~125 KB gzip, casi todo Framer Motion. Si algún día
      pesa demasiado, `LazyMotion` + los componentes `m` bajan a ~85 KB a cambio de
      cambiar todos los `motion.x` por `m.x`.
