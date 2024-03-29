import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { AntdTheme } from "vite-plugin-vitepress-demo/theme";
import "./index.css";
export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
      app.component("Demo", AntdTheme);
    },
  } as Theme;