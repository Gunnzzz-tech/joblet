import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
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
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request to:', req.url)
            })
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Received response with status:', proxyRes.statusCode)
            })
          }
        }
      }
    },
    // Build optimization
    build: {
      rollupOptions: {
        external: [],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          }
        }
      },
      sourcemap: true,
    }
  }
})