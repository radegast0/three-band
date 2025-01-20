import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: true },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
