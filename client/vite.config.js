import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy:{
      "/api" : "mern-chat-app-7n66.vercel.app"
    }
  },
  plugins: [react()],
})
