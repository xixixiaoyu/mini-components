import { defineConfig } from 'vitepress'
import path from 'path'


export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@vue3-ui/components': path.resolve(__dirname, '../../packages/components/index.ts')
      }
    },
    ssr: {
      noExternal: ['@vue3-ui/components']
    }
  },
  title: "Vue3 UI",
  description: "A Vue3 component library.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Icon', link: '/components/icon' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/...' }
    ]
  }
})
