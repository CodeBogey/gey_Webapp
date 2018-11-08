
import http from '@/http'

const state = {
  trades: [],
  provinceList: [],
  areaList: [],
  allAreaList: [],
  goodsGroups: {
    wechat: '153ee98b2a8f8b86d0c51ee4a68a492d',
    weibo: '153ee9861064430132ad9554b2a9c6eb',
    headline: '15d398ae2b41440246b10ee46408535a',
    writer: '25d318ae2b42140216b10ee46408535a',
    book: '35d318ae1b421402a6b10ce46408v35a',
    douyin: '54a227ae1b421402a6b10ce53421v35a'
  }
}
const mutations = {
  // 商品分类
  SET_GOODSGROUP (state, goodsGroup) {
    state.goodsGroups = goodsGroup
  },
  // 行业类型
  SET_TRADES (state, trades) {
    state.trades = trades
  },

  // 省份列表
  SET_PROVINCE_LIST (state, provinceList) {
    state.provinceList = provinceList
  },

  // 地区列表
  SET_AREA_LIST (state, areaList) {
    state.areaList = areaList
  },

  SET_ALL_AREA_LIST (state, allAreaList) {
    state.allAreaList = allAreaList
  }
}

const actions = {
  // 商品分类
  fetchGoodsGroups: ({commit, state}) => {
    return http.get('/goods_group').then((resp) => {
      let goodsGroup = {}
      goodsGroup.wechat = _.find(resp.data, (o) => { return o.fdName === '微博' }).id
      goodsGroup.weibo = _.find(resp.data, (o) => { return o.fdName === '微信' }).id
      goodsGroup.headline = _.find(resp.data, (o) => { return o.fdName === '今日头条' }).id
      goodsGroup.book = _.find(resp.data, (o) => { return o.fdName === '小红书' }).id
      goodsGroup.douyin = _.find(resp.data, (o) => { return o.fdName === '抖音' }).id
      goodsGroup.writer = _.find(resp.data, (o) => { return o.fdName === '写手' }).id
      commit('SET_GOODSGROUP', goodsGroup)
    })
  },

  // 行业类型
  fetchTrades: ({ commit, state }) => {
    return http.get('/common/trades').then((resp) => {
      commit('SET_TRADES', resp.data)
    })
  },

  // 省份列表
  fetchProvinceList: ({ commit, state }) => {
    return http.get('/common/area').then((resp) => {
      commit('SET_PROVINCE_LIST', resp.data)
    })
  },

  // 获取地区
  fetchAreaList: ({ commit, state }) => {
    if (state.areaList && state.areaList.length === 0) {
      return http.get('/common/getArea').then(resp => {
        let firstList = []
        let secondList = []
        let thirdList = []
        commit('SET_ALL_AREA_LIST', resp.data)
        resp.data.forEach((item, index) => {
          if (item.fdGrade === 0) {
            firstList.push(item)
          } else if (item.fdGrade === 1) {
            secondList.push(item)
          } else if (item.fdGrade === 2) {
            thirdList.push(item)
          }
        })
        firstList.forEach((itemFirst) => {
          itemFirst.secondList = []
          secondList.forEach((itemSecond) => {
            if (itemFirst.id === itemSecond.fdParent) {
              itemFirst.secondList.push(itemSecond)
            }
          })
        })
        secondList.forEach((item, index) => {
          secondList[index].thirdList = []
          thirdList.forEach((itm, idx) => {
            if (item.id === itm.fdParent) {
              secondList[index].thirdList.push(itm)
            }
          })
        })
        commit('SET_AREA_LIST', firstList)
      })
    }
  }
}

export default {
  state,
  actions,
  mutations
}
