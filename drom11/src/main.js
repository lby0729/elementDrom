import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$axios = axios

import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, {
    tagName: 'svg-icon'
});



router.beforeEach((to, from, next) => {
      let isLogin=sessionStorage.getItem('token');
          if(isLogin){
            next()
          }else{
            if(to.path==="/home"){
              next()
            }else{
              alert("还没有登录，请先登录！");
              next('/home')
            }
          }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


