import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: false
  },
  server: {
    port: 3000 // 修改为你想要的端口号
  }
})
