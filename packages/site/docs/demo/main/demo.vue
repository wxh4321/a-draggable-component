<script setup lang="ts">
import { reactive, ref } from "vue"
import { ADragglebleMain } from "a-draggleble-component"
import { MarginLabel } from "a-draggleble-component"
import { ListProps } from "a-draggleble-component/dist/a-draggleble-main/type.d"

const demoList: ListProps = reactive([])
const childNum = ref(3) // 自定义显示个数 改成4 试试
for (let i = 0; i < childNum.value; i++) {
    demoList[i] = {
        age: 18 + i,
        pro: 'worker' + i
    }
}
const showLabel = reactive({ '-1': true });
const canDragSquare = ref(false);

/**方法 */
const dragType = ({ type, i, key }: { type: string; i: number, key: string }) => {
    console.log('dragType ', type, i, key);
    if (type === 'top') { // 从下移动到上面
        canDragSquare.value = true;
        showLabel[key] = true;
    }
    else {
        canDragSquare.value = false;
        showLabel[key] = false;
    }
}
</script>

<template>
    <div class="page-bk"></div>
    <!-- 外面再加一层可拖拽 -->
    <ADragglebleMain :containerIndex="10" :childList="demoList" :childNum="childNum" :squareBottomHeight="200"
        @dragType="dragType">
        <template v-slot:childSlot1>
            <MarginLabel :labelKey="'MarginLabel0'" :containerIndex="11" :height="200" :width="200"
                :canDragSquare="canDragSquare" :showLeft="showLabel['MarginLabel0']" :showRight="showLabel['MarginLabel0']"
                :showTop="showLabel['MarginLabel0']" :showBottom="showLabel['MarginLabel0']"
                :componentStyle="{ left: (0 * 200) + 'px' }">
                <template v-slot:default>
                    <div class="demo-child demo-child-1">默认</div>
                </template>
            </MarginLabel>
        </template>
        <template v-slot:childSlot2="{ data }">
            <MarginLabel :labelKey="'MarginLabel1'" :containerIndex="11" :height="200" :width="200"
                :canDragSquare="canDragSquare" :showLeft="showLabel['MarginLabel1']" :showRight="showLabel['MarginLabel1']"
                :showTop="showLabel['MarginLabel1']" :showBottom="showLabel['MarginLabel1']"
                :componentStyle="{ left: (1 * 200) + 'px' }">
                <template v-slot:default>
                    <div class="demo-child demo-child-2">传参: {{ data.name }}</div>
                </template>
            </MarginLabel>
        </template>
        <template v-slot:childSlot3="{ data }">
            <MarginLabel :labelKey="'MarginLabel2'" :containerIndex="11" :height="200" :width="200"
                :canDragSquare="canDragSquare" :showLeft="showLabel['MarginLabel2']" :showRight="showLabel['MarginLabel2']"
                :showTop="showLabel['MarginLabel2']" :showBottom="showLabel['MarginLabel2']"
                :componentStyle="{ left: (2 * 200) + 'px' }">
                <template v-slot:default>
                    <div class="demo-child demo-child-3">自定义传参: {{ data.age }}</div>
                </template>
            </MarginLabel>
        </template>
        <template v-slot:childSlot4="{ data }">
            <MarginLabel :labelKey="'MarginLabel3'" :containerIndex="11" :height="200" :width="200"
                :canDragSquare="canDragSquare" :showLeft="showLabel['MarginLabel3']" :showRight="showLabel['MarginLabel3']"
                :showTop="showLabel['MarginLabel3']" :showBottom="showLabel['MarginLabel3']"
                :componentStyle="{ left: (3 * 200) + 'px' }">
                <template v-slot:default>
                    <div class="demo-child demo-child-4">自定义传参: {{ data.pro }}</div>
                </template>
            </MarginLabel>
        </template>
    </ADragglebleMain>
</template>

<style lang="less" scoped>
.demo-child {
    // height: 200px;
    // width: 200px;
    // flex: 1;
    height: 100%;
    width: 100%;
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
}</style>
