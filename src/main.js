// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import { setRemRatio } from '@/utils/tools'
import 'normalize.css/normalize.css'
import { Tab, TabItem, XButton, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'

Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  setRemRatio()
  next()
})

// 安装全局 vux 组件
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-button', XButton)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
