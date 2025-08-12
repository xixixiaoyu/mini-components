import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// 获取所有组件目录
const componentDirs = readdirSync(resolve(__dirname, 'src'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'styles')
  .map(dirent => dirent.name);

// 为每个组件生成一个入口
const componentEntries = componentDirs.reduce((entries: { [key: string]: string }, dir) => {
  entries[dir] = resolve(__dirname, `src/${dir}/index.ts`);
  return entries;
}, {});

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        ...componentEntries,
        index: resolve(__dirname, 'index.ts'), // 保留主入口
      },
      name: 'Vue3UI',
      // 输出格式将由 rollupOptions.output.format 控制
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          // 保留原始目录结构
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          // 保留原始目录结构
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
  plugins: [
    vue(),
    dts({ 
      outDir: ['dist/es', 'dist/lib'],
      // 指定生成类型声明的入口文件
      entryRoot: 'src',
    }),
    libInjectCss(),
  ],
});
