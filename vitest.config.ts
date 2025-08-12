import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@vue3-ui/components': path.resolve(__dirname, 'packages/components'),
      '@vue3-ui/utils': path.resolve(__dirname, 'packages/utils'),
    },
  },
});
