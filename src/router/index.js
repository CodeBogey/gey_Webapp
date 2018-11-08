import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('@/views/home.vue')
const category = () => import('@/views/category.vue')
const goods = () => import('@/views/goods.vue')
const goodsDetail = () => import('@/views/goodsDetail.vue')
const search = () => import('@/views/search.vue')
const login = () => import('@/views/login.vue')

Vue.use(Router)

const redirect = {
  path: '*',
  redirect: '/'
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '首页'
      }
    }, {
      path: '/category',
      name: 'category',
      component: category,
      meta: {
        title: '分类'
      }
    }, {
      path: '/goods',
      name: 'goods',
      component: goods,
      meta: {
        title: '商品列表'
      }
    }, {
      path: '/goods-detail/:id',
      name: 'goods-detail',
      component: goodsDetail,
      meta: {
        title: '商品详情'
      }
    }, {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        title: '搜索'
      }
    }, {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    redirect
  ]
})
