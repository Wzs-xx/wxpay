import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import eventBus from '@/lib/eventBus.js'     // 引入Bus组件
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$eventBus = eventBus;
Vue.prototype.$http = window.axios;
Vue.prototype.$api = window.api;
Vue.prototype.$weixin = window.weixin;

var token = window.api.getQueryArgVal("token");
if(!token){
    token = sessionStorage.getItem("token");
}
if(token){
  window.api.setAccessToken(token);
  window.axios.get("/api/selfinfo2?accessToken="+token).then((res)=>{
    window.api.setContext(res.data);
      new Vue({
        router,
        render: h => h(App)
      }).$mount('#app');
  });
}else{
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
}



