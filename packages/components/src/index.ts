import type { App } from "vue";
import "virtual:svg-icons-register";
import SvgIcon from './svgIcon/index.vue';
import ADraggableMain from "./a-draggable-main/index.vue";
import MarginLabel from './margin-label/index.vue';

const components:any = {
    SvgIcon,
    ADraggableMain,
    MarginLabel
}
export default{
    install(app:App){
        Object.keys(components).forEach(component=>{
            app.component(component,components[component]);
        });
    }
}
export {
    SvgIcon,
    ADraggableMain,
    MarginLabel
}