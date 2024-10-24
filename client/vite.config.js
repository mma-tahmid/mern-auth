import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // je api endpoint dia start hobe seta bujia diar jonno
      '/api/': {
        //target: 'http://localhost:8000',
        target: 'https://mern-auth-uzs6.onrender.com',
        changeOrigin: true,
        secure: false

      }
    }
  }

})
