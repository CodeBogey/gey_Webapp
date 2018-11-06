/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'

// 使用自定义配置 创建一个 axios 实例
const instance = axios.create({
  baseURL: '/buyer2',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT' // 避免 IE10 返回 304
  }
})

// 添加响应拦截器
instance.interceptors.response.use((resp) => {
  if (_.isString(resp.data)) {
    return Promise.reject(new Error('解析异常'))
  } else {
    return Promise.resolve(resp)
  }
}, (error) => {
  if (error.response && error.response.data) {
    if (error.response.data.code === 0) {
      Vue.$vux.toast.text(error.response.data.content)
    } else if (error.response.data.code === 401) {
      Vue.$vux.confirm.show({
        title: '提示',
        content: '您还未登录，请先登录。',
        onHide () {},
        onCancel () {},
        onConfirm () {
          window.location.assign('/#/login')
        }
      })
    } else {
      Vue.$vux.toast.text('服务器忙，请稍候再试...')
    }
  }
  return Promise.reject(error)
})

export default instance
