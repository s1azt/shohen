import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // サーバー上の公開パスに合わせる
    plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/gs-intra-new/docs/', 
  build: {
    outDir: 'docs', // ビルド先をdocsフォルダに指定
  },
  // ...
})

/*
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ここから下を追加してください
  build: {
    outDir: 'docs', // ビルドしたファイルを docs フォルダに出力する
    emptyOutDir: true, // ビルドのたびに docs フォルダ内をきれいに掃除する
  },
  base: './', // GitHub Pages などで画像やCSSのパスがずれないようにする設定
}) */