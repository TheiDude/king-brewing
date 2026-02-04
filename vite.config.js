import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        beers: resolve(__dirname, 'src/beers.html'),
        menu: resolve(__dirname, 'src/menu.html'),
        specials: resolve(__dirname, 'src/daily-specials.html'),
        photos: resolve(__dirname, 'src/photos.html'),
        blog: resolve(__dirname, 'src/blog.html'),
        podcast: resolve(__dirname, 'src/podcast.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
