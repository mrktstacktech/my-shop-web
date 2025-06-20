import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components/index.ts'),
      '@hooks': path.resolve(__dirname, './src/hooks/index.ts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@context': path.resolve(__dirname, './src/context'),
      '@types': path.resolve(__dirname, './src/types'),
      '@services': path.resolve(__dirname, './src/services'),
      '@slices': path.resolve(__dirname, './src/slices'),
      '@axios': path.resolve(__dirname, './src/services/axios'),
      '@domain': path.resolve(__dirname, './src/services/domain'),
      '@models': path.resolve(__dirname, './src/services/models/index.ts'),
      '@repositories': path.resolve(__dirname, './src/services/repositories/index.ts'),    },
  },
})
