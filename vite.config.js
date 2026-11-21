import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // Forward API calls to the backend during development.
      // This avoids CORS errors because the request is made
      // server-to-server, not cross-origin from the browser.
      '/localHire': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
