import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  console.log("``````````");
  console.log(to.path);
  if (getToken()) {
    console.log("@@@@@");
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }
    store.dispatch('GetInfo').then(res => { // 拉取用户信息
    })
    console.log("@3");
    next();
    NProgress.done();
  }else{
    console.log("@1");
    if (to.path === '/usermanage') {
      console.log("@2");
      Message.error('请先登录')
      // next({ path: '/login' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }
    next();
    NProgress.done();
  }

  
 



})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
