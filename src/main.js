// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './http'
import 'normalize.css/normalize.css'
import { XButton, XHeader, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'

Vue.prototype.$http = http

// 安装全局 vux 组件
Vue.component('x-button', XButton)
Vue.component('x-header', XHeader)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
