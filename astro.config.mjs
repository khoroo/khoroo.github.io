import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    // Ensure TypeScript is properly processed
    build: {
      target: 'esnext',
    },
    // Allow direct import of TypeScript modules in client-side scripts
    optimizeDeps: {
      include: ['src/scripts/attractor.ts']
    },
    worker: {
      format: 'es', // Use ES modules format for workers
    },
    // Ensure .ts extension is properly resolved for workers
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    }
  }
});