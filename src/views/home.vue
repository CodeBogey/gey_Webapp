<template>
  <div class="home-page">
    <c-tab-list :tab="tab" @handleTab="handleTab"></c-tab-list>
    <c-order :orderList="orderList" @orderChange="orderChange"></c-order>
    home
  </div>
</template>
<script>
import CTabList from 'components/CTabList'
import COrder from 'components/COrder'
export default {
  naem: 'home',
  data () {
    return {
      curGroupType: 'wechat',
      tab: {
        tabList: ['微信专题', '微博专题', '小红书专题'],
        cur: '微信专题'
      },
      orderList: [
        {
          title: '作品数',
          prop: 'fd_all_publish_num'
        },
        {
          title: '评论数',
          prop: 'fd_all_commit_num'
        },
        {
          title: '点赞数',
          prop: 'fd_all_like_num'
        }
      ]
    }
  },
  mounted () {
    console.log($('.home-page'))
    console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.$http.post('/goods/list/153ee98b2a8f8b86d0c51ee4a68a492d', {
      pageIndex: 1
    }).then((resp) => {
      console.log(resp)
    }).finally(() => {
      this.$vux.loading.hide()
    })

    // this.$http.post('/goods/collection/list', {
    //   pageIndex: 1,
    //   s_fdGoodsGroupId: '153ee98b2a8f8b86d0c51ee4a68a492d',
    //   s_smallWechat: '1',
    //   sortName: '',
    //   sortOrder: ''
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
    }
  },
  components: {
    CTabList,
    COrder
  }
}
</script>
<style lang="less" scoped>

</style>
