import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/jobs': {
        target: 'https://joveo-c08b42a8.s3-accelerate.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => '/1afd8eb1.xml',
        secure: false,
      }
    }
  }
})
