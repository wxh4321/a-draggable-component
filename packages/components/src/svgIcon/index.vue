<script setup lang="ts" name="SvgIcon">
import { computed, CSSProperties } from "vue";

interface SvgProps {
	name: string; // 图标的名称（Svg 文件名） ==> 必传
	prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
	iconStyle?: CSSProperties; // 图标的样式 ==> 非必传
	color:string
}
// 接收父组件参数并设置默认值
const props = withDefaults(defineProps<SvgProps>(), {
	prefix: "icon",
	iconStyle: () => ({ width: "30px", height: "30px"}),
	color:"#333"
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
	<svg :style="{...iconStyle,color}" aria-hidden="true" :fill="color">
		<use :xlink:href="symbolId" :fill="color"/>
	</svg>
</template>


