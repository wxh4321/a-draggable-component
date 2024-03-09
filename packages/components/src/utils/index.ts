import { ListProps } from "@/a-draggable-main/type";
import { CSSProperties, Ref } from "vue";

// 接口定义
export interface RefOptions {
  width:Ref;
  height:Ref;
  top:Ref;
  left:Ref;
  topStyle:CSSProperties;
  leftStyle:CSSProperties;
  bottomStyle:CSSProperties;
  rightStyle:CSSProperties;
}
export interface CallbackProps {
  mousemoveFn: (Event: any,dom?:any) => void;
  mouseupFn: (Event: any,dom?:any) => void;
  mousedownFn: (Event: any,dom?:any) => void;
}
export interface ActionProps extends Partial<CallbackProps>{
  initX: number;
  initY: number;
  state: string;
  type: string;
}

// 方法定义
const CallbackMap = new WeakMap();
export const mouseAddListener = (dom: any, callbackObj: Partial<CallbackProps>) => {
  if (CallbackMap.has(dom)) {
    const list = CallbackMap.get(dom);
    list.push(callbackObj);
    CallbackMap.set(dom,list);
  }
  else{
    CallbackMap.set(dom,[callbackObj]);
  }
  
  /**
   * 鼠标移动
   */
  if (callbackObj.mousemoveFn) {
    dom.addEventListener("mousemove", (e:any)=>{
      (callbackObj as CallbackProps).mousemoveFn(e,dom);
    });
  }
  if (callbackObj.mouseupFn) {
    dom.addEventListener("mouseup", (e:any)=>{
      (callbackObj as CallbackProps).mouseupFn(e,dom);
    });
  }
  if (callbackObj.mousedownFn) {
    dom.addEventListener("mousedown", (e:any)=>{
      (callbackObj as CallbackProps).mousedownFn(e,dom);
    });
  }
};
export type CallbackListProps = CallbackProps[];
export const mouseRemoveListener = (dom:any) => {
  const callbackObjList: CallbackListProps = CallbackMap.get(dom);
  if (callbackObjList && callbackObjList.length) {
    callbackObjList.forEach((callbackObj)=>{
      if (callbackObj.mousemoveFn) {
        dom.removeEventListener("mousemove", callbackObj.mousemoveFn);
      }
      if (callbackObj.mouseupFn) {
        dom.removeEventListener("mouseup", callbackObj.mouseupFn);
      }
      if (callbackObj.mousedownFn) {
        dom.removeEventListener("mousedown", callbackObj.mousedownFn);
      }
    });
    CallbackMap.delete(dom);
  }
};
// 判断方向
// 浏览器 从上到下 clientY逐步增大
// 浏览器 从左到右 clientX逐步增大

const isUp = (newDisY:number,disY:number) => {
  return newDisY - disY < 0;
}
const isDown = (newDisY:number,disY:number) => {
  return newDisY - disY > 0;
}
const isLeft = (newDisX:number,disX:number) => {
  return newDisX - disX < 0;
}
const isRight = (newDisX:number,disX:number) => {
  return newDisX - disX > 0;
}
// 是否为默认方框可拖拽区域
// export const isDefaultShouldMove = (X:number,Y:number,options:Partial<RefOptions>) => {
//   const { top,left,width,height,topStyle={},leftStyle={},bottomStyle={},rightStyle={},} = options || {}
//   // 默认边的宽高度为12px
//   const topH = Number((topStyle!.height+'' || '0').replace('px','')) || 12;
//   const bottomH = Number((bottomStyle!.height+'' || '0').replace('px','')) || 12;
//   const leftW = Number((leftStyle!.width+'' || '0').replace('px','')) || 12;
//   const rightW = Number((rightStyle!.width+'' || '0').replace('px','')) || 12;
//   const topValue = Number((top!.value+'' || '0').replace('px','')) || 0;
//   const leftValue = Number((left!.value+'' || '0').replace('px','')) || 0;
//   const widthValue = Number((width!.value+'' || '0').replace('px','')) || 400;
//   const heightValue = Number((height!.value+'' || '0').replace('px','')) || 400;
//   // 判断是否在方框可移动范围内
//   if(topValue+topH < Y && Y < topValue+heightValue-bottomH
//   && leftValue+leftW < X && X < leftValue+widthValue-rightW
//   ){
//     return true;
//   }
//   return false;
// }
// 移动方框边距
export const moveDefalutElement = (e:any,actions:ActionProps,options:Partial<RefOptions>) => {
  const { width,height,top,left,topStyle={},leftStyle={},bottomStyle={},rightStyle={} } = options || {}
  const moveDisX = e.clientX - actions.initX;
  const moveDisY = e.clientY - actions.initY;
  const w = width!.value||0;
  const h = height!.value||0;
  const t = top!.value||0;
  const l = left!.value||0;
  
  if(actions.type === 'default'){ 
    top!.value = t + moveDisY;
    left!.value = l + moveDisX;
    actions.initX = e.clientX;
    actions.initY = e.clientY;
  }
  // 移动边框
  else{
    if(isUp(e.clientY,actions.initY)
    && (actions.type === 'top' || actions.type === 'bottom')
    ){
      console.log('direction isUp')
      if(actions.type === 'top'){
        height!.value = h - moveDisY;
        top!.value = t + moveDisY;
      }
      if(actions.type === 'bottom'){
        height!.value = h + moveDisY;
      }
      actions.initY = e.clientY;
    }
    if(isDown(e.clientY,actions.initY)
    && (actions.type === 'top' || actions.type === 'bottom')
    ){
      console.log('direction isDown')
      if(actions.type === 'top'){
        height!.value = h - moveDisY;
        top!.value = t + moveDisY;
      }
      if(actions.type === 'bottom'){
        height!.value = h + moveDisY;
      }
      actions.initY = e.clientY;
    }
    if(isLeft(e.clientX,actions.initX)
    && (actions.type === 'left' || actions.type === 'right')
    ){
      console.log('direction isLeft')
      if(actions.type === 'left'){
        width!.value = w - moveDisX;
        left!.value = l + moveDisX;
      }
      if(actions.type === 'right'){
        width!.value = w + moveDisX;
      }
      actions.initX = e.clientX;
    }
    if(isRight(e.clientX,actions.initX)
    && (actions.type === 'left' || actions.type === 'right')
    ){
      console.log('direction isRight')
      if(actions.type === 'left'){
        width!.value = w - moveDisX;
        left!.value = l + moveDisX;
      }
      if(actions.type === 'right'){
        width!.value = w + moveDisX;
      }
      actions.initX = e.clientX;
    }
  }
  
}
// 初始化动作
export const initActions = (actions:ActionProps) => {
  actions.initX = 0;
  actions.initY = 0;
  actions.state = '';
  actions.type = '';
}
// 元素穿梭
export const moveDraggableElement = (type:string,list:ListProps,topList:ListProps,draggableIndex:Ref,draggableType:Ref) => {
  if(type==='top' && draggableType.value!==type){
    const ele = list[draggableIndex.value];
    if(draggableIndex.value!==-1){
      ele.position = type;
      list.splice(draggableIndex.value,1);
      topList.push(ele);
      draggableIndex.value = -1;
    }
  }
  if(type==='bottom' && draggableType.value!==type){
    const ele = topList[draggableIndex.value];
    if(draggableIndex.value!==-1){
      ele.position = type;
      topList.splice(draggableIndex.value,1);
      list.push(ele);
      draggableIndex.value = -1;
    }
  }
}
