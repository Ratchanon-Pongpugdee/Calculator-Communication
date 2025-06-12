import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // allow all network
    port: 5173, // default Vite port
    strictPort: true,
    cors: true, // enable CORS
    allowedHosts: [
      '16dd-1-10-177-6.ngrok-free.app'
    ],
    // เพิ่ม proxy เฉพาะ /api ไป backend เพื่อความปลอดภัย
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})