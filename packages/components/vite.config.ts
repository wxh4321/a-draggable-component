import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from "path";
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    watch: {
      include: 'src/**'
    },
    lib: {
      entry: {
        index: resolve(__dirname, "./src/index.ts"),
      },
      formats: ["es"],
      name: "BaseComponents",
    },
    minify: false,
    rollupOptions: {
      external: ["vue"],
      output: {
        chunkFileNames: "common/[name].js",
        entryFileNames: (file) => {
          if (file.name == "index") {
            return "index.js";
          } else {
            return "[name]/index.js";
          }
        },
        globals: {
          vue: "Vue",
        },
      },
    },
    assetsDir: "",
  },
  plugins: [
    vue(),
    dts(),
    createSvgIconsPlugin({
      // 需要自动导入的 svg 文件目录（可自行修改）我的路径如下图所示
      iconDirs: [resolve(__dirname, "src/svgIcon/svg")],
      // 执行icon name的格式（可自行修改）
      symbolId: "icon-[dir]-[name]",
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
