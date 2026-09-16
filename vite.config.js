import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Vite pone un hash en el nombre de todo lo que sale a /assets/, así que
    // nginx puede cachearlo como inmutable (ver nginx.conf → location /assets/).
    assetsDir: 'assets',
  },
})
