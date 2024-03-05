<script setup lang="ts">
import { reactive, ref } from "vue"
import { ADragglebleMain } from "a-draggleble-component"
import { ListProps } from "a-draggleble-component/dist/a-draggleble-main/type.d"

const demoList: ListProps = reactive([])
const childNum = ref(3) // 自定义显示个数 改成4 试试
for (let i = 0; i < childNum.value; i++) {
  demoList[i] = {
    age: 18 + i,
    pro: 'worker' + i
  }
}
</script>

<template>
  <div class="page-bk"></div>
  <ADragglebleMain :containerIndex="10" :childList="demoList" :childNum="childNum">
    <template v-slot:childSlot1>
      <div class="demo-child demo-child-1">默认</div>
    </template>
    <template v-slot:childSlot2="{ data }">
      <div class="demo-child demo-child-2">传参: {{ data.name }}</div>
    </template>
    <template v-slot:childSlot3="{ data }">
      <div class="demo-child demo-child-3">自定义传参: {{ data.age }}</div>
    </template>
    <template v-slot:childSlot4="{ data }">
      <div class="demo-child demo-child-4">自定义传参: {{ data.pro }}</div>
    </template>
  </ADragglebleMain>
</template>

<style lang="less" scoped>
.demo-child {
  height: 200px;
  width: 200px;
  // flex: 1;
}

.demo-child-1 {
  background: rebeccapurple;
}

.demo-child-2 {
  background: green;
}

.demo-child-3 {
  background: greenyellow;
}

.demo-child-4 {
  background: rgb(47, 95, 255);
}

.page-bk {
  width: 100vw;
  height: 100vh;
  background: #646cffaa;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
