import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'   //如果该目录下有index文件，那么就会自动引入index文件
import store from './store';
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,  //挂载router
  store,
  render: h => h(App),
}).$mount('#app')
