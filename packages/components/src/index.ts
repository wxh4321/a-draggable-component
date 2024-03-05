import type { App } from "vue";
import "virtual:svg-icons-register";
import SvgIcon from './svgIcon/index.vue';
import ADragglebleMain from "./a-draggleble-main/index.vue";
import MarginLabel from './margin-label/index.vue';

const components:any = {
    SvgIcon,
    ADragglebleMain,
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
    ADragglebleMain,
    MarginLabel
}