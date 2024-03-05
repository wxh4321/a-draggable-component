import { defineConfig } from "vitepress";
import vitePluginVitepressDemo from "vite-plugin-vitepress-demo";
export default defineConfig({
  //   appearance: false, // 夜间模式切换
  title: "A Draggleble Component",
  description: "一个可拖拽组件 基于vue3",
  themeConfig: {
    siteTitle: "A Draggleble Component",
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