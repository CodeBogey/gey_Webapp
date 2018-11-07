<template>
  <div class="goods-page">
    <c-search></c-search>
    <div class="divider"></div>
    <!-- 分类 -->
    <c-tab-list :tab="tab" @handleTab="handleTab"></c-tab-list>
    <!-- 排序 -->
    <c-order :orderList="orderList" @orderChange="orderChange"></c-order>
    <!-- 简单筛选 -->
    <!-- <c-list-footer tips="111" :showLoading="true"></c-list-footer> -->
    <!-- <div class="bfilter-view">

    </div> -->
  </div>
</template>
<script>
import CTabList from 'components/CTabList'
import COrder from 'components/COrder'
import CListFooter from 'components/CListFooter'
import CSearch from 'components/CSearch'
export default {
  naem: 'goods',
  data () {
    return {
      curGroupType: 'wechat',
      tab: {
        tabList: ['微信专题', '微博专题', '小红书专题'],
        cur: '微信专题'
      },
      orderList: [
        {
          title: '粉丝',
          prop: 'fd_all_publish_num'
        },
        {
          title: '价格',
          prop: 'fd_all_commit_num'
        },
        {
          title: '时间',
          prop: 'fd_all_like_num'
        }
      ]
    }
  },
  mounted () {
    // console.log($('.goods-page'))
    // console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
    // this.$store.dispatch('fetchGoodsGroups')
    // this.$store.dispatch('fetchTrades')
    // this.$store.dispatch('fetchProvinceList')
    // this.$store.dispatch('fetchAreaList')

    // this.$vux.loading.show({
    //   text: '加载中...'
    // })
    // this.$http.post('/goods/list/153ee98b2a8f8b86d0c51ee4a68a492d', {
    //   pageIndex: 1
    // }).then((resp) => {
    //   console.log(resp)
    // }).finally(() => {
    //   this.$vux.loading.hide()
    // })
  },
  methods: {
    handleTab (item) {
      console.log(item)
      if (item === '微信专题') {
        this.curGroupType = 'wechat'
      } else if (item === '微博专题') {
        this.curGroupType = 'weibo'
      } else if (item === '小红书专题') {
        this.curGroupType = 'book'
      }
    },
    orderChange (item) {
      console.log(item)
    },
    toSearch () {
      this.$router.push('home')
    }
  },
  components: {
    CTabList,
    COrder,
    CListFooter,
    CSearch
  }
}
</script>
<style lang="less" scoped>
.goods-page {
  .divider {
    height: 2px;
    background: #ededed;
  }
}
</style>
