import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    // 打包后存放的目录文件
    outDir: 'dist',
    // 输出的库的格式
    lib: {
      entry: './index.ts',
      name: 'Vue3UI',
      fileName: 'vue3-ui',
    },
    // 自定义构建配置，可直接调整底层 Rollup 选项
    rollupOptions: {
      // 排除无需打包的依赖
      external: ['vue'],
      output: {
        // 全局变量，在 UMD 构建中定义，用于在浏览器中访问
        globals: {
          vue: 'Vue',
        },
        // 指定JS文件的输出文件名
        entryFileNames: 'vue3-ui.js',
        // 指定代码分割时生成的 chunk 的文件名
        chunkFileNames: 'chunks/[name]-[hash].js',
        // 指定静态资源（如 CSS）的输出文件名
        assetFileNames: (assetInfo) => {
          // 这里是关键：确保 CSS 文件名是固定的
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({ insertTypesEntry: true }),
  ],
});
