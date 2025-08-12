# 从零到一：构建一个 Vue 3 组件库

本教程将带您一步步从零开始，构建一个功能完备、符合业界最佳实践的 Vue 3 组件库。

## 1. 初始化项目结构

我们使用 pnpm workspace 来管理 monorepo 项目。

```bash
# 创建项目目录
mkdir vue3-ui && cd vue3-ui

# 初始化 package.json
pnpm init

# 创建 pnpm-workspace.yaml
echo "packages:\n  - 'packages/*'
  - 'docs'" > pnpm-workspace.yaml

# 创建子包目录
mkdir -p packages/components packages/utils docs
```

## 2. 配置 TypeScript

在根目录创建 `tsconfig.json`，为整个项目提供统一的 TypeScript 配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@vue3-ui/*": ["packages/*/index.ts"]
    }
  }
}
```

## 3. 搭建组件库

在 `packages/components` 目录下，我们进行以下配置：

- **初始化 `package.json`**
- **安装依赖**: `vite`, `vue`, `typescript`, `vite-plugin-dts`
- **配置 `vite.config.ts`**: 用于打包构建组件库，输出 `ESM` 和 `CJS` 格式，并生成类型声明文件。

## 4. 搭建文档网站

我们使用 `VitePress` 来搭建文档网站。

- **初始化 `package.json`**: 在 `docs` 目录下。
- **安装依赖**: `vitepress`, `vue`
- **创建配置文件**: `docs/.vitepress/config.mts`，并配置别名以正确解析本地组件。

## 5. 集成代码规范工具

- **安装依赖**: `eslint`, `prettier`, `@vue/eslint-config-typescript`, `@vue/eslint-config-prettier` 等。
- **创建配置文件**: `eslint.config.js` 和 `.prettierrc.cjs`。
- **配置忽略文件**: 在 `eslint.config.js` 中忽略 `dist`, `.d.ts`, `cache` 等目录。

## 6. 集成 Git 工作流

- **安装依赖**: `husky`, `lint-staged`
- **初始化 Git**: `git init`
- **初始化 Husky**: `pnpm husky init`
- **配置 `pre-commit` 钩子**: 在提交时自动运行 `lint-staged`。
- **配置 `lint-staged`**: 在根 `package.json` 中指定要检查的文件和命令。

## 7. 开发新组件流程

1.  在 `packages/components/src` 下创建组件目录和 `.vue` 文件。
2.  在 `packages/components/index.ts` 中导出新组件。
3.  在 `docs/components` 下创建组件的 `.md` 文档。
4.  在 `docs/.vitepress/config.mts` 中更新侧边栏导航。
5.  启动文档服务器验证效果。
