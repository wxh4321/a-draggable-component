import { ExtractPropTypes } from "vue";
import ADragglebleMain from "./index.vue";

export type ADragglebleMainProps = ExtractPropTypes<typeof ADragglebleMain>;

// 接口定义
export interface childProp {
  key: string;
  name: string;
  position: string;
  [key: string]: any;
}
export type ListProps = Partial<childProp>[];
