import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative URLs support GitHub Pages project paths and custom domains.
export default defineConfig({ base: './', plugins: [react()] });
