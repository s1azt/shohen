import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Tailwind v4を動かすためのプラグイン

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // これを有効にすることでCSSが正しく処理されます
  ],
})