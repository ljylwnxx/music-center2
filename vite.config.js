import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  // define: {
  //   /** 项目环境变量 **/
  //   'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
  // },
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
  }
})
