/// <reference types="vite/client" />
declare module 'a-draggable-component'
declare module 'qs'
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
}
