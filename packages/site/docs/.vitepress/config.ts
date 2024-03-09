import { defineConfig } from "vitepress";
import vitePluginVitepressDemo from "vite-plugin-vitepress-demo";
export default defineConfig({
  //   appearance: false, // 夜间模式切换
  base: '/a-draggable-component/',
  title: "A Draggable Component",
  description: "一个可拖拽组件 基于vue3",
  head: [['link', { rel: 'icon', type:'image/svg+xml',href: '/a-draggable-component/logo.svg' }]], 
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: "A Draggable Component",
  },
  vite: {
    plugins: [
      vitePluginVitepressDemo({
        glob: ["**/demo/**/*.vue"]
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        }
      }
    },
  }
});