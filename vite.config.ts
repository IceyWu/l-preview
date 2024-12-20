import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const pkg = JSON.parse(
  readFileSync('./package.json', 'utf-8')
)

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LPreview',
      fileName: (format) => `l-preview.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies || {})],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit: false
  }
})