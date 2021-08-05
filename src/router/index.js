import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../views/login";
//const Vue = window.Vue;
//const VueRouter = window["VueRouter"];
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"login",
    title:"登录",
    component:login,
  },
  {
    path: '/home',
    name: 'Home',
    title:"首页",
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    title:"我的",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/mine/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  var api = window.api;
  if (to.name !== 'login' && !api.isStudentAuth()) next({ name: 'login' })
  else next()
  if (to.title) {
    document.title = to.title;
  }else{
    document.title = "快速缴费"
  }
})
export default router
