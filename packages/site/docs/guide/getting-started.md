### a-draggleble-component
- 一个可以托拽的vue3+typescript组件，主要应用场景：两个子空间的拖拽状态的相互转换
- 有需要之后会增加其他拓展组件
- 本组件致力于纯手敲代码，不引用任何依赖（尽力）

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
* 例1 整体效果展示
<demo src="../demo/main/demo1.vue" title="demo1" desc="整体展示"></demo>
* 例2 MarginLabel边框组件效果展示
<demo src="../demo/margin-label/demo2.vue" title="demo1" desc="margin-label展示"></demo>
### 声明
本项目只是模板项目，可以直接使用，也可以拷贝到自己的项目中进行自定义修改

