import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PROMPT 3: Gzip compression
    compression({ algorithm: 'gzip', ext: '.gz' }),
    // Brotli (better compression, modern browsers)
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  optimizeDeps: {
    include: ['framer-motion'],
  },
  build: {
    // PROMPT 2: Manual chunks to split vendor code
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          // Router
          'vendor-router': ['react-router-dom'],
          // Animation
          'vendor-motion': ['framer-motion'],
          // Icons
          'vendor-icons': ['lucide-react', 'react-icons'],
          // Helmet (SEO)
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
  },
})
