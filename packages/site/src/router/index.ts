import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/**
 * RouteRecordRaw的meta类型
 * title:string; 页面标题，通常必选。
 * icon?:string; 图标，一般配合菜单使用。
 * auth?:boolean; 是否需要登录权限。
 * ignoreAuth?:boolean; 是否忽略权限。
 * roles?:RoleEnum[]; 可以访问的角色
 * keepAlive?:boolean; 是否开启页面缓存
 * hideMenu?:boolean; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
 * order?:number; 菜单排序。
 * frameUrl?:string; 嵌套外链。
 * */
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'show demo list',
    component: () => import('@/components/HelloWorld.vue'),
    meta: {
      title: 'hello world',
      icon: 'el-icon-s-home',
      keepAlive: false, // 没有缓存
    },
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../../docs/demo/main/demo.vue'),
    meta: {
      title: 'demo',
      icon: 'el-icon-s-home',
      keepAlive: false, // 没有缓存
    },
  },
  {
    path: '/demo1',
    name: 'Demo1',
    component: () => import('../../docs/demo/main/demo1.vue'),
    meta: {
      title: 'demo1',
      icon: 'el-icon-s-home',
      keepAlive: false, // 没有缓存
    },
  },
  {
    path: '/demo2',
    name: 'Demo2',
    component: () => import('../../docs/demo/margin-label/demo2.vue'),
    meta: {
      title: 'demo2',
      icon: 'el-icon-s-home',
      keepAlive: false, // 没有缓存
    },
  }
]

const createRouters = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }), //  return 期望滚动到哪个的位置
})

const router = createRouters
export function resetRouter(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
