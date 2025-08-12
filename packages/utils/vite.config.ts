import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './index.ts',
      name: 'Vue3UIUtils',
      fileName: (format) => `utils.${format}.js`,
    },
    rollupOptions: {
      external: [], // 我们的工具函数不依赖任何外部库
    },
  },
  plugins: [
    dts({ insertTypesEntry: true }),
  ],
});
