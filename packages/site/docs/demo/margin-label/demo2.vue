<script setup lang="ts">
import { MarginLabel } from "a-draggleble-component"
import { reactive } from "vue";
const win = reactive({
  height: window.innerHeight,
  width: window.innerWidth
});
</script>

<template>
  <div class="page-container">
    <MarginLabel :containerIndex="12" :height="win.height * 0.4" :width="win.width" :top="win.height * 0.6">
      <template v-slot:default>
        <div class="page-bk">
          <!-- <MarginLabel :containerIndex="11" 
              :topStyle="{background:'red'}"
              :leftStyle="{background:'red'}"
              :bottomStyle="{background:'red'}"
              :rightStyle="{background:'red'}"
            > -->
          <MarginLabel :containerIndex="11" :height="200" :width="200" :canDragSquare="true">
            <template v-slot:default>
              <div class="demo-child demo-child-1 pos-1">默认</div>
            </template>
          </MarginLabel>
          <MarginLabel :containerIndex="11" :height="200" :width="200" :canDragSquare="true"
            :componentStyle="{ left: '450px' }">
            <template v-slot:default>
              <div class="demo-child demo-child-2 pos-2">我是测试border-radius</div>
            </template>
          </MarginLabel>
        </div>
      </template>
    </MarginLabel>
  </div>
</template>

<style lang="less" scoped>
.body {
  position: relative;
}

.demo-child {
  // height: 200px;
  // width: 200px;
  // flex: 1;
  width: 100%;
  height: 100%;
}

.demo-child-1 {
  background: rebeccapurple;
}

.demo-child-2 {
  border-radius: 20px;
  background: rgb(159, 121, 196);
}

.page-bk {
  // top: 60vh; 不要写在这里
  position: relative;
  // width: 100vw; 不要写vh vw
  // height: 80vh;
  width: 100%;
  height: 100%;
  background: #646cffaa;
}

.page-container {
  width: 100vw;
  height: 100vh;
}
</style>
