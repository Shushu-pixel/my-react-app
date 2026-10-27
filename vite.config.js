import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Relative URLs support GitHub Pages project paths and custom domains.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        drill: fileURLToPath(new URL('./drill.html', import.meta.url)),
        badgework: fileURLToPath(new URL('./badgework.html', import.meta.url)),
      },
    },
  },
});
