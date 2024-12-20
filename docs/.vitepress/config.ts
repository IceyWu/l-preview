import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LPreview',
  description: '一个现代化的 Vue 3 预览组件库',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar: [
      {
        text: '组件',
        items: [
          // { text: 'Button 按钮', link: '/components/button' },
          { text: 'Image 图片预览', link: '/components/image' }
        ]
      }
    ]
  }
})