import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    obfuscator({
      // @ts-ignore
      compact: true,
      // @ts-ignore
      controlFlowFlattening: true,
      // @ts-ignore
      deadCodeInjection: true,
      // @ts-ignore
      debugProtection: true,
      // @ts-ignore
      disableConsoleOutput: true,
    } as any)],
})
