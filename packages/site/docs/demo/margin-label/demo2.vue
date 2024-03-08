<script setup lang="ts">
import { MarginLabel } from "a-draggleble-component"
import 'a-draggleble-component/dist/style.css'
import { ref } from "vue";
import qs from "qs";
const params = qs.parse(window.location.hash.split('?')[1]);
const { width = '' } = params || {};
const demoHeight = ref(600);
const demoWidth = ref(1039);

if (width === 'full') {
  demoWidth.value = window.innerWidth - 18;
}

</script>

<template>
  <div class="page-container">
    <MarginLabel :containerIndex="12" :height="demoHeight" :width="demoWidth" :top="demoHeight * 0.6" :showLeft="false"
      :showRight="false" :showBottom="false">
      <template v-slot:default>
        <div class="page-bk">
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
  width: inherit;
  height: 200px;
  background: #646cffaa;
}

.page-container {
  position: relative;
  width: 100%;
  height: 600px;
}
</style>
