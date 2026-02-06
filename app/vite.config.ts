import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// For GitHub Pages: use your repo name. If repo is "Valentine", base is '/Valentine/'
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Valentine/' : './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
