import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['localhost', '127.0.0.1', '400c-2400-1a00-3b62-4dc9-959a-cf15-a977-6dc6.ngrok-free.app'],
  },
})
