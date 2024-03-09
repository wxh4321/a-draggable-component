import { ExtractPropTypes } from "vue";
import ADraggableMain from "./index.vue";

export type ADraggableMainProps = ExtractPropTypes<typeof ADraggableMain>;

// 接口定义
export interface childProp {
  key: string;
  name: string;
  position: string;
  [key: string]: any;
}
export type ListProps = Partial<childProp>[];

export interface MainContainerStyleProps{
  height:number;
  width:number;
  zIndex:number;
}