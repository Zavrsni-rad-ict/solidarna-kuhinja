import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      build: {
        commonjsOptions: {
          include: [
            'tailwind.config.js',
            'node_modules/**',
            '../node_modules/**',
          ],
        },
      },
      optimizeDeps: {
        include: ['tailwind-config'],
      },
      plugins: [react(), mkcert()],
      resolve: {
        alias: {
          'tailwind-config': path.resolve(__dirname, './tailwind.config.js'),
          '@': path.resolve(__dirname, './src'),
        },
      },
    };
  }
  return {
    build: {
      commonjsOptions: {
        include: [
          'tailwind.config.js',
          'node_modules/**',
          '../node_modules/**',
        ],
      },
    },
    optimizeDeps: {
      include: ['tailwind-config'],
    },
    plugins: [react()],
    resolve: {
      alias: {
        'tailwind-config': path.resolve(__dirname, './tailwind.config.js'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
