### a-draggleble-component
- 一个可以托拽的vue3+typescript组件，主要应用场景：两个子空间的拖拽状态的相互转换
- 有demo demo1 和 demo2 详细场景可用
- 本组件完全开源，可以很容易迁移

### vue3项目引用
#### 方式一：

在main.ts文件中添加如下代码：
```ts
import 'a-draggleble-component/dist/style.css'
import dragglebleComponents from 'draggleble-components'
// const app = createApp(App)
app.use(dragglebleComponents)
```
#### 方式二：
在main.ts文件中添加如下代码：
```ts
import 'a-draggleble-component/dist/style.css'
```
在.vue文件中导入：
```vue
<script setup lang="ts">
import { ADragglebleMain }  from "a-draggleble-component"
</script>

<template>
<ADragglebleMain/>
</template>
```

### 安装项目依赖
```shell
pnpm i
```
### 启动并调试项目demo
```shell
pnpm dev
```
### 效果展示
* 整体效果展示
[demo](../demo/main/demo.md)
* 例1 ADragglebleMain展示
[demo1](../demo/main/demo1.md)
* 例2 MarginLabel边框组件效果展示
[demo2](../demo/margin-label/demo2.md)
### 声明
本项目只是模板项目，可以直接使用，也可以拷贝到自己的项目中进行自定义修改

<style>

</style>

