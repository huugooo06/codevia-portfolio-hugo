# ─────────────────────────────────────────────────────────────
# Etapa 1 — Build: compila la SPA con Vite
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependencias con el lockfile (build reproducible)
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto del código y genera /app/dist
COPY . .
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Etapa 2 — Producción: sirve los estáticos con nginx
# El resultado es estático, así que en runtime no hay Node:
# el contenedor consume ~6 MB de RAM.
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
