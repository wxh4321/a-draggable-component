<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { moveDraggableElement } from '../utils'
import { childProp, ListProps, MainContainerStyleProps } from './type'
import { EventBus } from '../utils/EventBus';
type PartialChildProp = Partial<childProp>;

const emmiter = EventBus();

/**
 * 父级传参
 * childNum 子组件数量 可选
 * childList 组件列表自定义参数
 */

const props = withDefaults(defineProps<{
    childNum?: number,
    squareBottomIndex?: number | string,
    squareContentIndex?: number | string,
    squareBottomHeight?: number,
    mainContainerStyle?: MainContainerStyleProps,
    childList?: ListProps,
}>(), {
    childNum: 4,
    squareBottomIndex: 10,
    squareContentIndex: 10,
    squareBottomHeight: 200,
    mainContainerStyle: { height: window.innerHeight, width: window.innerWidth, zIndex: 10 }
})
let defalutSquareBottomHeight = ref(props.squareBottomHeight)
const comSquareBottomHeight = computed(() => {
    const height = defalutSquareBottomHeight.value
    if (typeof height === 'string') {
        if ((height as string).includes('%')
            || (height as string).includes('vh')
        ) { // 支持百分号 vh等
            const num = (height as string).replace('vh', '').replace('%', '')
            return window.innerHeight * (Number(num) / 100);
        }
        else {
            return 200;
        }
    }
    else {
        return Number(props.squareBottomHeight)
    }
});

const list: ListProps = reactive([])
const topList: ListProps = reactive([])
const topSquareRef = ref(null)
const bottomSquareRef = ref(null)

const mainHeight = computed(() => {
    return (props.mainContainerStyle as any).height - comSquareBottomHeight.value
});

// 定义方法
function init() {
    for (let i = 0; i < props.childNum; i++) {
        list[i] = {
            key: 'square-bottom' + (i + 1),
            name: 'childSlot' + (i + 1)
        }
    }
    // 增加自定义参数
    if (props?.childList) {
        list.forEach((lObj: PartialChildProp, i: number) => {
            list[i].position = 'bottom'; // 初始化位置在下面
            const others = (props.childList!)[i] || {}
            list[i] = {
                ...lObj,
                ...others
            }
        })
    }
}

init()
const bottomDraggable = ref(true);
const topDraggable = ref(true);
const draggableIndex = ref(-1);
const draggableType = ref('');
const draggableKey = ref('-1');
emmiter.on('clickContainer', (key: string) => {
    console.log('key ', key);
    draggableKey.value = key;
});
// 监听是否在边上，解决不能扩大边长度的问题
emmiter.on('mouseEnter', (state: boolean) => {
    topDraggable.value = !state;
});

const emits = defineEmits(['dragType']);

/**拖拽事件 
 * dragstart,dragend,dragenter,dragover,dragleave
*/
const sqaureDragStart = (type: string, _: any, i: number) => {
    draggableIndex.value = i;
    draggableType.value = type;
}
const sqaureDragEnter = (type: string,) => {
    moveDraggableElement(type, list, topList, draggableIndex, draggableType);
    emits('dragType', { type, i: draggableIndex.value, key: draggableKey.value });
}



</script>
<template>
    <div class="main-container" :style="{
        height: mainContainerStyle?.height + 'px',
        width: mainContainerStyle?.width ? mainContainerStyle?.width + 'px' : '100%',
        zIndex: mainContainerStyle?.zIndex
    }">
        <div class="square-content" ref="topSquareRef" @dragenter="(e: any) => { sqaureDragEnter('top', e) }"
            :style="{ height: mainHeight + 'px', zIndex: squareContentIndex, }">
            <div :key="child.key" v-for="(child, i) in topList" @dragstart="(e: any) => { sqaureDragStart('top', e, i) }"
                :draggable="topDraggable">
                <slot :data="child" :name="child.name"></slot>
            </div>
        </div>
        <div class="square-bottom" :style="{ height: comSquareBottomHeight + 'px', zIndex: squareBottomIndex }"
            ref="bottomSquareRef" @dragenter="(e: any) => { sqaureDragEnter('bottom', e) }">
            <div :key="child.key" v-for="(child, i) in list" @dragstart="(e: any) => { sqaureDragStart('bottom', e, i) }"
                :draggable="bottomDraggable">
                <slot :data="child" :name="child.name"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
// 公共样式更改
body {
    position: relative;
}

div {
    user-select: none;
    transition: height 0.5s ease;
}

// 组件样式更改

.main-container {
    /* z-index: 1000; */
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
}

.square-content {
    position: absolute;
    top: 0px;
    left: 0px;
    width: inherit;
    background: red;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
}

.square-bottom {
    width: inherit;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    // border: 2px solid #ccc;
    position: absolute;
    bottom: 0px;
    left: 0px;
}
</style>