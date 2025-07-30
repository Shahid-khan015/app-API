import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/api/universities': {
        target: 'http://universities.hipolabs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/universities/, '')
      }
    }
  }
})