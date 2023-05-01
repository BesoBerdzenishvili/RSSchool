import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    exclude: ['node_modules', 'dist', 'coverage', 'cypress'],
    coverage: {
      provider: 'c8',
      all: true,
      reporter: ['text'],
    },
  },
  server: {
    host: true,
    port: 3001,
  },
});
