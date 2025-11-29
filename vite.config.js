import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,       // Enables LAN access
    port: 5173,       // Or 5174 if your project uses that
    strictPort: true, // Prevent automatic port switching
  },
})
