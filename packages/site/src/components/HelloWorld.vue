<script setup lang="ts">

withDefaults(defineProps<{ msg?: string }>(), {
  msg: '可拖拽组件展示'
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    <a href="/#/demo" target="_blank">demo</a>
  </p>
  <p>
    <a href="/#/demo1" target="_blank">demo1</a>
  </p>
  <p>
    <a href="/#/demo2" target="_blank">demo2</a>
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
