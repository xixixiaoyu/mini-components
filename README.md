# Vue 3 UI 组件库

一个基于业界最佳实践的、现代化的、轻量级的 Vue 3 组件库。

## ✨ 特性

- **🚀 现代化工具链**: 基于 Vite 构建，提供闪电般的开发体验。
- **📦 Monorepo 架构**: 使用 pnpm workspaces 管理，易于维护和扩展。
- **🔒 类型安全**: 完全使用 TypeScript 编写。
- **📝 详尽的文档**: 由 VitePress 驱动。
- **✅ 自动化质量保障**: 通过 ESLint、Prettier 和 Husky 自动检查，确保代码质量。

## 🛠️ 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **开发语言**: TypeScript
- **包管理器**: pnpm (workspaces)
- **文档**: VitePress
- **代码规范**: ESLint + Prettier
- **Git 钩子**: Husky + lint-staged

## 🚀 快速上手

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/xixixiaoyu/mini-components.git
    cd vue3-ui
    ```

2.  **安装依赖:**
    ```bash
    pnpm install
    ```

3.  **启动文档网站:**
    ```bash
    pnpm dev
    ```
    网站将运行在 `http://localhost:5174`。

## 📜 可用命令

- `pnpm dev`: 启动文档网站的开发服务器。
- `pnpm build`: 构建组件库。
- `pnpm lint`: 对整个项目进行代码检查和修复。
