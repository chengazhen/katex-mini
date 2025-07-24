// vite.config.ts
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const isWatch = process.argv.includes('--watch')

export default defineConfig({
  build: {
    outDir: 'mp/katex',
    lib: {
      entry: [resolve(__dirname, './src/index.ts')],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names.some(name => name.endsWith('.css'))) {
            return assetInfo.names.find(name => name.endsWith('.css'))?.replace('.css', '.wxss') || assetInfo.names[0]
          }
          return assetInfo.names?.[0] || 'assets/[name].[ext]'
        }
      }
    },
    // 在watch模式下启用更快的构建
    watch: isWatch ? {
      include: 'src/**',
      exclude: 'node_modules/**'
    } : undefined,
    // 在开发模式下生成sourcemap
    sourcemap: isWatch
  },
  plugins: [
    dts({
      entryRoot: './src/index.ts',
      exclude: './demo/**/*'
    })
  ]
})