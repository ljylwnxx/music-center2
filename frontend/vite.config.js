import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: '/src/'
      }
    ],
    extensions: [".vue", ".js", ".json"],
  },
  server: {
    host: 'localhost',
    port: 8080,
    fs: {
      strict: false
    },
    proxy: {
      '^/api':{
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
  },
})
