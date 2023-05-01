/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './dist/server',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve('./src/entry-server.tsx'),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
