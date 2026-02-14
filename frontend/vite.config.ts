import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        //é pra trocar o /api com '' <- nada ent a url fica localhost:3000/
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
