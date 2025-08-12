# 从零到一：手把手教你构建一个企业级 Vue 3 组件库

本教程将以“保姆级”的细致程度，带您从一个空文件夹开始，一步步搭建一个功能完备、体验现代、符合业界最佳实践的 Vue 3 组件库。

### 最终成果

- 一个由 `pnpm workspace` 管理的 Monorepo 项目。
- 一个使用 `Vite` + `TypeScript` 构建的组件库，支持打包输出和类型声明。
- 一个由 `VitePress` 驱动的、可实时预览组件的文档网站。
- 一套由 `ESLint` + `Prettier` + `Husky` 组成的自动化代码规范工作流。

---

## 第 1 步：环境与项目初始化

**目标**: 搭建一个 Monorepo（单体仓库）项目骨架。

1.  **创建项目目录**

    ```bash
    mkdir vue3-ui && cd vue3-ui
    ```

2.  **初始化 `package.json`**

    ```bash
    pnpm init
    ```

3.  **启用 `pnpm` 工作区**

    创建 `pnpm-workspace.yaml` 文件，这是 `pnpm` 用来识别工作区（即我们的子项目）的配置文件。

    ```yaml
    # pnpm-workspace.yaml
    packages:
      - 'packages/*'
      - 'docs'
    ```

4.  **创建目录结构**

    根据 `pnpm-workspace.yaml` 的规划，创建对应的文件夹。

    ```bash
    mkdir -p packages/components packages/utils docs
    ```

    - `packages/components`: 核心组件库。
    - `packages/utils`: 公共工具函数库。
    - `docs`: 文档网站。

## 第 2 步：配置全局 TypeScript

**目标**: 为整个项目提供统一、智能的 TypeScript 支持。

在项目根目录创建 `tsconfig.json` 文件。

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler", // 必须是 'bundler'，Vite 强依赖
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": { // 设置路径别名，方便在文档中引用组件库
      "@vue3-ui/*": ["packages/*/index.ts"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

## 第 3 步：创建组件包 (`@vue3-ui/components`)

**目标**: 创建一个可以独立打包、发布的组件库包。

1.  **进入目录并初始化**

    ```bash
    cd packages/components
    pnpm init
    ```
    在 `package.json` 中，将 `name` 修改为 `@vue3-ui/components`。

2.  **安装依赖**

    ```bash
    # -w 表示安装到根目录的 node_modules
    pnpm add vue typescript -w -D
    pnpm add vite vite-plugin-dts -D
    ```

3.  **配置 Vite 打包**

    创建 `vite.config.ts`，配置库模式打包。

    ```typescript
    // packages/components/vite.config.ts
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import dts from 'vite-plugin-dts';

    export default defineConfig({
      build: {
        lib: {
          entry: './index.ts',
          name: 'Vue3UI',
          fileName: 'vue3-ui',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
      plugins: [
        vue(),
        dts({ insertTypesEntry: true }),
      ],
    });
    ```

4.  **创建第一个组件和出口**

    - 创建 `src/Button/VButton.vue`。
    - 创建 `index.ts` 作为包的出口：`export { default as VButton } from './src/Button/VButton.vue';`

5.  **完善 `package.json`**

    添加 `main`, `module`, `types` 和 `build` 脚本。

    ```json
    {
      "name": "@vue3-ui/components",
      "version": "1.0.0",
      "main": "dist/vue3-ui.umd.js",
      "module": "dist/vue3-ui.es.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "vite build"
      }
    }
    ```

## 第 4 步：创建文档站 (`docs`)

**目标**: 搭建一个可以实时预览组件的文档网站。

1.  **进入目录并初始化**

    ```bash
    cd ../../docs # 回到 docs 目录
    pnpm init
    ```

2.  **安装依赖**

    ```bash
    pnpm add vitepress vue -D
    ```

3.  **初始化文档结构**

    - 创建 `index.md` (首页)。
    - 创建 `.vitepress/config.mts` (配置文件)。
    - 创建 `components/button.md` (组件文档页)。

4.  **配置 `config.mts`**

    这是最关键的一步，我们需要配置 `Vite` 别名，让 `VitePress` 能找到本地的组件库源码。

    ```typescript
    // docs/.vitepress/config.mts
    import { defineConfig } from 'vitepress';
    import path from 'path';

    export default defineConfig({
      title: 'Vue3 UI',
      vite: {
        resolve: {
          alias: {
            '@vue3-ui/components': path.resolve(__dirname, '../../packages/components'),
          },
        },
      },
      themeConfig: {
        sidebar: [
          { text: 'Button', link: '/components/button' },
        ],
      },
    });
    ```

5.  **在文档中使用组件**

    在 `docs/components/button.md` 中，你可以像这样直接引入和使用组件：

    ```markdown
    <script setup>
    import { VButton } from '@vue3-ui/components';
    </script>

    <VButton>这是一个按钮</VButton>
    ```

6.  **添加运行脚本**

    在 `docs/package.json` 中添加脚本：

    ```json
    "scripts": {
      "docs:dev": "vitepress dev",
      "docs:build": "vitepress build",
      "docs:preview": "vitepress preview"
    }
    ```

## 第 5 步：代码规范与 Git 工作流

**目标**: 强制代码风格统一，并在提交时自动检查。

1.  **安装规范工具** (在根目录运行)

    ```bash
    pnpm add eslint prettier eslint-config-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -w -D
    ```

2.  **安装 Git 流程工具**

    ```bash
    pnpm add husky lint-staged -w -D
    ```

3.  **配置 `ESLint` 和 `Prettier`**

    - 创建 `eslint.config.js`
    - 创建 `.prettierrc.cjs`

4.  **初始化 Git 和 Husky**

    ```bash
    git init
    pnpm husky init
    ```

5.  **配置 `pre-commit` 钩子**

    修改 `.husky/pre-commit` 文件，使其在提交前运行 `lint-staged`。

    ```sh
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    pnpm lint-staged
    ```

6.  **配置 `lint-staged`**

    在根 `package.json` 中添加：

    ```json
    "lint-staged": {
      "*.{vue,js,ts,jsx,tsx}": "eslint --fix"
    }
    ```

## 总结

恭喜你！至此，一个结构完整、流程自动化的企业级组件库已经搭建完成。现在，你可以专注于开发更多高质量的组件了！
