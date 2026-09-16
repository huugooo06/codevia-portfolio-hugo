/* ============================================================
   Todo el contenido editable de la web vive aquí.
   Para cambiar textos, proyectos o tecnologías no hace falta
   tocar ningún componente.

   Los `items` de `stack` son claves de src/data/techIcons.js
   (el logo se busca por esa clave). Los de `extras` son texto
   suelto: cosas sin logo propio.
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   ⚙️  TUS ENLACES
   Deja '' en los que todavía no tengas: el enlace desaparece
   solo de la web, así nunca hay un link roto.
   ───────────────────────────────────────────────────────────── */
export const social = {
  linkedin: '',                      // p.ej. 'https://www.linkedin.com/in/hugo-cordoba'
  github: '',                        // p.ej. 'https://github.com/tuusuario'
  whatsapp: '',                      // p.ej. 'https://wa.me/34600000000'
  codevia: 'https://codeviaesp.com',
}

/* El primero es el botón grande de contacto; el segundo sale debajo como
   alternativa. Para intercambiarlos basta con cambiar estas dos líneas. */
export const email = 'hugocor0609@gmail.com'
export const emailCodevia = 'codeviainfo@gmail.com'

export const nav = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'stack', label: 'Stack' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'metodo', label: 'Cómo trabajo' },
]

export const hero = {
  eyebrow: 'Desarrollador · España',
  first: 'Hugo',
  last: 'Córdoba',
  roles: [
    'Desarrollo de Aplicaciones Multiplataforma',
    'Sistemas Microinformáticos y Redes',
    'Full-stack y despliegue en servidor',
  ],
  lead:
    'Diseño la solución, escribo el código y lo dejo funcionando en un servidor real. ' +
    'De la aplicación a la máquina donde vive.',
  stats: [
    { label: 'Titulaciones', value: '2' },
    { label: 'Ciclos', value: 'DAM · SMR' },
    { label: 'Enfoque', value: 'Full-stack' },
  ],
}

export const marqueeWords = [
  'Java', 'JavaScript', 'React', 'Vue', 'Node.js', 'PostgreSQL',
  'Docker', 'Linux', 'Nginx', 'Git', 'Redes',
]

export const about = {
  title: ['Curioso por defecto,', 'resolutivo por costumbre.'],
  paragraphs: [
    'Estudié **Sistemas Microinformáticos y Redes** y después **Desarrollo de Aplicaciones ' +
    'Multiplataforma**. Esa mezcla me dio algo que valoro: entender qué pasa desde que escribo ' +
    'una línea de código hasta que alguien abre la aplicación en su móvil.',

    'No espero a que me digan qué hay que hacer. Detecto el problema, propongo una solución ' +
    'y la ejecuto.',
  ],
  traits: [
    {
      icon: 'bolt',
      title: 'Emprendedor',
      text: 'Tomo la iniciativa y llevo las ideas hasta algo que funciona.',
    },
    {
      icon: 'team',
      title: 'Liderazgo y equipo',
      text: 'Sé dirigir un grupo y sé integrarme en uno.',
    },
    {
      icon: 'learn',
      title: 'Aprendizaje continuo',
      text: 'Cada proyecto es una excusa para dominar algo que no sabía.',
    },
    {
      icon: 'teach',
      title: 'Enseñar y aprender',
      text: 'Documento, explico y escucho a quien sabe más que yo.',
    },
  ],
}

/* Cada `items` es una clave de techIcons.js */
export const stack = [
  {
    num: '01',
    title: 'Desarrollo web',
    text: 'Interfaces rápidas, responsive y accesibles.',
    items: ['javascript', 'react', 'vuedotjs', 'vite', 'tailwindcss', 'html5'],
  },
  {
    num: '02',
    title: 'Backend y datos',
    text: 'APIs REST, bases de datos relacionales y autenticación.',
    items: ['java', 'nodedotjs', 'express', 'postgresql', 'mysql', 'prisma'],
  },
  {
    num: '03',
    title: 'Sistemas y despliegue',
    text: 'Contenedores, proxy inverso, HTTPS automático y control de versiones.',
    items: ['linux', 'docker', 'nginx', 'git', 'github', 'postman'],
  },
]

/* Competencias del ciclo SMR que no tienen logo propio */
export const extras = {
  title: 'Y además, del ciclo de Sistemas y Redes',
  items: ['Redes TCP/IP', 'Windows Server', 'Hardware', 'Virtualización', 'Seguridad', 'Soporte'],
}

export const projects = [
  {
    featured: true,
    tag: 'En producción',
    live: true,
    kind: 'Proyecto propio',
    logo: '/img/codevia-logo.png',
    title: 'Codevia',
    kicker: 'Estudio digital — web y plataforma',
    text:
      'Lo fundé y lo desarrollo entero: SPA en React con sistema de diseño propio, analítica ' +
      'sin cookies y toda la infraestructura detrás.',
    items: ['React', 'Vite', 'Tailwind'],
    link: { href: 'https://codeviaesp.com', label: 'codeviaesp.com' },
  },
  {
    featured: true,
    tag: 'En producción',
    live: true,
    kind: 'Cliente · Full-stack',
    logo: '/img/axis-logo.png',
    // El logo de Axis es blanco sobre transparente: sin la placa oscura
    // desaparecería por completo en el tema claro.
    logoPlate: true,
    title: 'Imaxis',
    kicker: 'Gestión de visitas técnicas — Axis BCN',
    text:
      'Los técnicos ven su ruta del día en el mapa y suben las fotos de cada visita desde el ' +
      'móvil. Administración con importación masiva de expedientes, avisos en tiempo real y ' +
      'descarga en ZIP.',
    items: ['Vue 3', 'Node.js', 'PostgreSQL', 'Docker', 'PWA'],
    link: {
      href: 'https://imaxis.axisbcn.com/login',
      label: 'imaxis.axisbcn.com',
      note: 'acceso privado',
    },
  },
  {
    tag: 'En producción',
    live: true,
    kind: 'Full-stack',
    logo: '/img/codevia-logo.png',
    title: 'CRM de clientes',
    kicker: 'Gestión comercial y captación de leads',
    text:
      'API REST con Express y Prisma sobre PostgreSQL, login con JWT y un panel de analítica web.',
    items: ['Node.js', 'PostgreSQL', 'JWT'],
    // El enlace es público aunque el panel pida credenciales: quien lo abra ve
    // que existe y está desplegado de verdad, que es justo lo que interesa.
    link: { href: 'https://crm.codeviaesp.com', label: 'crm.codeviaesp.com', note: 'acceso privado' },
  },
  {
    tag: 'Infraestructura',
    live: false,
    kind: 'DevOps',
    title: 'Infraestructura en VPS',
    kicker: 'Docker, proxy inverso y HTTPS automático',
    text:
      'Varios servicios en un solo VPS Linux, con certificados que se renuevan solos y ' +
      'despliegues de un comando. Todo en 1 GB de RAM.',
    items: ['Docker', 'Nginx', 'Linux'],
  },
]

export const timeline = [
  {
    tag: 'Proyecto propio · Actualidad',
    title: 'Fundador y desarrollador en Codevia',
    text:
      'Webs y aplicaciones a medida para negocios. Trato directo con cliente y ' +
      'responsabilidad completa sobre la entrega.',
    items: [],
  },
  {
    tag: 'Grado Superior',
    title: 'Desarrollo de Aplicaciones Multiplataforma',
    text:
      'Programación orientada a objetos, acceso a bases de datos, desarrollo de interfaces y ' +
      'programación de servicios y procesos.',
    items: ['Java', 'Bases de datos', 'POO', 'Interfaces'],
  },
  {
    tag: 'Grado Medio',
    title: 'Sistemas Microinformáticos y Redes',
    text:
      'Equipos, sistemas operativos en red, redes locales y seguridad. La base que hoy me ' +
      'permite administrar mis propios servidores.',
    items: ['Redes', 'Linux', 'Windows Server', 'Hardware'],
  },
]

export const method = [
  { n: '01', title: 'Entender', text: 'Antes de escribir una línea, pregunto qué se necesita y para quién.' },
  { n: '02', title: 'Acordar', text: 'Enseño alcance, plazos y decisiones técnicas en lenguaje que se entiende.' },
  { n: '03', title: 'Construir', text: 'Avances visibles desde el principio. Nada de meses a oscuras.' },
  { n: '04', title: 'Desplegar', text: 'Lo pongo en producción, lo documento y me quedo cerca por si hay que ajustar.' },
]

export const contact = {
  title: ['¿Tienes un proyecto,', 'una oferta o una idea?'],
  sub: 'Escríbeme y te respondo.',
}
