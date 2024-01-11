// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'katex-mini',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        exports: "named"
      }
    }
  },
  plugins: [dts()]
})