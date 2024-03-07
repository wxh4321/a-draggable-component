<script lang="ts">
const showOptions = {
    showLeft: true,
    showRight: true,
    showTop: true,
    showBottom: true,
    showTopLeft: false,
    showTopRight: false,
    showBottomLeft: false,
    showBottomRight: false,
};
</script>
<script setup lang="ts">
import { SvgIcon } from '..';
import { EventBus } from '../utils/EventBus';
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { ActionProps, CallbackProps, initActions, mouseAddListener, mouseRemoveListener, moveDefalutElement } from '../utils';
import { defaultProps } from '@/type';
const emmiter = EventBus();

const props = withDefaults(defineProps<defaultProps>(),
    {
        labelKey: '-1',
        containerIndex: 11,
        canDragSquare: false,
        ...showOptions
    }
)


const publicStyleAttrs = { zIndex: props.containerIndex + 100 }
const topStyleAttrs = props.topStyle ? { ...props.topStyle, ...publicStyleAttrs } : { ...publicStyleAttrs };
const leftStyleAttrs = props.leftStyle ? { ...props.leftStyle, ...publicStyleAttrs } : { ...publicStyleAttrs };
const bottomStyleAttrs = props.bottomStyle ? { ...props.bottomStyle, ...publicStyleAttrs } : { ...publicStyleAttrs };
const rightStyleAttrs = props.rightStyle ? { ...props.rightStyle, ...publicStyleAttrs } : { ...publicStyleAttrs };

const componentStyle = props.componentStyle || {};
const cWidth = Number((componentStyle.width as string || '0').replace('px', ''));
const cHeight = Number((componentStyle.height as string || '0').replace('px', ''));
const cTop = Number((componentStyle.top as string || '0').replace('px', ''));
const cLeft = Number((componentStyle.left as string || '0').replace('px', ''));

const width = ref(props.width || cWidth || 200);
const height = ref(props.height || cHeight || 200);
const top = ref(props.top || cTop || 0);
const left = ref(props.left || cLeft || 0);
const leftRef = ref(null);
const rightRef = ref(null);
const topRef = ref(null);
const bottomRef = ref(null);
const defaultRef = ref(null);

const actions: ActionProps = reactive({
    type: '', // 触发的边框状态 left right top down
    initX: 0,
    initY: 0,
    state: '',
    mousedownFn: (e: any) => {
        actions.state = 'down';
        actions.initX = e.clientX;
        actions.initY = e.clientY;
    },
    mouseupFn: (e: any) => {
        actions.state = 'up';
        moveDefalutElement(e, actions, { width, height, top, left });
        initActions(actions);
    },
});
const defaultActions: Partial<CallbackProps> = {
    mousedownFn: (e: any) => {
        if (actions.state === '') {
            actions.type = 'default';
            actions.state = 'default-down';
            actions.initX = e.clientX;
            actions.initY = e.clientY;
        }
    },
    mouseupFn: (e: any) => {
        if (actions.state === 'default-down') {
            actions.type = 'default';
            actions.state = 'default-up';
            moveDefalutElement(e, actions, { width, height, top, left });
        }
        initActions(actions);
    },
}
const documentActions: Partial<CallbackProps> = {
    mousemoveFn: (e: any) => {
        if (actions.state === 'down') { // 使得四边可伸缩移动
            moveDefalutElement(e, actions, {
                width, height, top, left,
                topStyle: props.topStyle, leftStyle: props.leftStyle,
                bottomStyle: props.bottomStyle, rightStyle: props.rightStyle,
            });
        }
        if (actions.state === 'default-down') { // 使得默认方块可移动
            moveDefalutElement(e, actions, {
                width, height, top, left,
                topStyle: props.topStyle, leftStyle: props.leftStyle,
                bottomStyle: props.bottomStyle, rightStyle: props.rightStyle,
            });
        }
    }
};

const mouseEventFn = (type: string, state: boolean) => {
    emmiter.emit('mouseEnter', state);
    actions.type = type; // 更新边框状态
    if (state === false) { // 边框消失失去焦点
        actions.state = '';
    }
}

const addDomListener = () => {
    // document
    mouseAddListener(document, documentActions);
    /** 边可移动 */
    // 左边
    props?.showLeft && mouseAddListener(leftRef.value, actions);
    // 右边
    props?.showRight && mouseAddListener(rightRef.value, actions);
    // 上边
    props?.showTop && mouseAddListener(topRef.value, actions);
    // 下边
    props?.showBottom && mouseAddListener(bottomRef.value, actions);
    /** 块可移动 */
    props?.canDragSquare && mouseAddListener(defaultRef.value, defaultActions);
}

const removeDomListener = () => {
    mouseRemoveListener(document);
    mouseRemoveListener(leftRef.value);
    mouseRemoveListener(rightRef.value);
    mouseRemoveListener(topRef.value);
    mouseRemoveListener(bottomRef.value);
    if (props.canDragSquare) {
        mouseRemoveListener(defaultRef.value);
    }
}

const init = () => {
    onMounted(() => {
        addDomListener();
    });
    // 卸载监听事件
    onUnmounted(() => {
        removeDomListener();
    });
}
init();

const clickContainer = () => {
    emmiter.emit('clickContainer', props.labelKey);
}
</script>

<template>
    <div class="margin-label-container" :style="{
        zIndex: containerIndex,
        ...(props.componentStyle || {}),
        ...(width && { width: width + 'px' }),
        ...(height && { height: height + 'px' }),
        ...(top && { top: top + 'px' }),
        ...(left && { left: left + 'px' }),
    }" ref="defaultRef" @mouseenter="clickContainer">
        <div class="top separator separator-horizontal" :style="topStyleAttrs" v-if="showTop"
            @mouseenter="mouseEventFn('top', true)" @mouseout="mouseEventFn('top', false)" ref="topRef">
            <SvgIcon name="arrowRight" color="#666" :iconStyle="{ width: '1em', height: '1em' }" v-if="!topStyle" />
        </div>
        <div class="left separator separator-vertical" :style="leftStyleAttrs" v-if="showLeft"
            @mouseenter="mouseEventFn('left', true)" @mouseout="mouseEventFn('left', false)" ref="leftRef">
            <SvgIcon name="arrowRight" color="#666" :iconStyle="{ width: '1em', height: '1em' }" v-if="!leftStyle" />
        </div>
        <div class="bottom separator separator-horizontal" :style="bottomStyleAttrs" v-if="showBottom"
            @mouseenter="mouseEventFn('bottom', true)" @mouseout="mouseEventFn('bottom', false)" ref="bottomRef">
            <SvgIcon name="arrowRight" color="#666" :iconStyle="{ width: '1em', height: '1em' }" v-if="!bottomStyle" />
        </div>
        <div class="right separator separator-vertical" :style="rightStyleAttrs" v-if="showRight"
            @mouseenter="mouseEventFn('right', true)" @mouseout="mouseEventFn('right', false)" ref="rightRef">
            <SvgIcon name="arrowRight" color="#666" :iconStyle="{ width: '1em', height: '1em' }" v-if="!rightStyle" />
        </div>
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
.margin-label-container {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: grab;

    .top {
        position: absolute;
        top: 0px;

        svg {
            display: none;
            transform: rotate(-90deg);
        }
    }

    .top:hover {
        svg {
            display: block;
        }
    }

    .left {
        position: absolute;
        left: 0px;

        svg {
            display: none;
            transform: rotate(180deg);
        }
    }

    .left:hover {
        svg {
            display: block;
        }
    }

    .bottom {
        position: absolute;
        bottom: 0px;

        svg {
            display: none;
            transform: rotate(90deg);
        }
    }

    .bottom:hover {
        svg {
            display: block;
        }
    }

    .right {
        position: absolute;
        right: 0px;

        svg {
            display: none;
            transform: rotate(0deg);
        }
    }

    .right:hover {
        svg {
            display: block;
        }
    }
}

.separator {
    // background-color: #f7f8f9;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.separator:hover {
    // background-color: #e3e3e6;
    background-color: #f7f8f9;
}

// 垂直方向
.separator-vertical {
    cursor: col-resize;
    width: 12px;
    height: 100%;
}

// 水平方向
.separator-horizontal {
    cursor: row-resize;
    width: 100%;
    height: 12px;
}

.separator-nesw {
    cursor: nesw-resize;
}

.separator-nwse {
    cursor: nwse-resize;
}
</style>
