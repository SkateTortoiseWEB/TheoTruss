import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  // Resolves the "@/..." imports used throughout src/. Without this every
  // "@/components/..." import fails at build time.
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Served from the root of theotruss.com. Must be absolute (not './') now that
  // pages live at nested addresses like /project/accretion/.
  base: '/',
})
