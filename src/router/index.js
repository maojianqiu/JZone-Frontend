import Vue from 'vue'
import Router from 'vue-router'

//1.通过 Vue.use(插件) 来安装插件
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/register', component: () => import('@/views/register/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout, // 1.在主页面的 <router-view/> 中渲染基本布局组件 Layout
    redirect: '/home',
    children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '首页', icon: 'home'}
    },
    {
      path: 'blogs',
      name: 'blogs',
      component: () => import('@/views/blogs/index'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '博文', icon: 'blogs'}
    },
    {
      // path: ':username',
      path: 'bloghome',
      name: 'bloghome',
      component: () => import('@/views/userhome/index'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '个人主页', icon: 'userhome'}
    },
    {
      path: 'qanda',
      name: 'qanda',
      component: () => import('@/views/qanda/index'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '问答', icon: 'qanda'}
    },
    {
      path: 'blog',
      name: 'blog',
      component: () => import('@/views/blogs/blogcheck'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '博文查看', icon: 'blog'}
    },
    {
      path: 'blogAdd',
      name: 'blogAdd',
      component: () => import('@/views/blogs/blogAdd'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '新增博文', icon: 'blogAdd'}
    },
    {
      path: 'blogEdit',
      name: 'blogEdit',
      component: () => import('@/views/blogs/blogEdit'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '编辑博文', icon: 'blogEdit'}
    },
    {
      path: 'usermanage',
      name: 'usermanage',
      component: () => import('@/views/usermanage/index'),//2.Appmain 中的 <router-view/> 中渲染指定组件
      meta: {title: '个人中心', icon: 'manage'}
    },
    

  ]
  }
]


//2.创建路由对象
export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  //配置路由和组件之间的应用关系
  routes: constantRouterMap
})

