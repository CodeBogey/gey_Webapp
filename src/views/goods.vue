<template>
  <div class="goods-page">

    <loading :show="loading" :text="loadingTxt"></loading>

    <div class="search-head">
      <div class="search-head-fixer">
        <c-search></c-search>
        <div class="divider"></div>
        <!-- 分类 -->
        <c-tab-list :tab="tab" @handleTab="handleTab"></c-tab-list>
        <!-- 排序 -->
        <c-order :orderList="orderList" @orderChange="orderChange" :resetOrder='resetOrder'></c-order>
      </div>
    </div>

    <div class="goods-list">
      <c-goods-item v-for="item in goodsList" :key="item.id" :goodsItem="item" :type="type"></c-goods-item>
    </div>

    <div id='loadMore' class="load-more">
      <c-list-footer v-if="!!goodsList.length" :showLoading="showLoadMore"></c-list-footer>
      <c-empty v-else :showEmpty="!goodsList.length" :emptyText="emptyText"></c-empty>
    </div>

  </div>
</template>
<script>
import CTabList from 'components/CTabList'
import COrder from 'components/COrder'
import CListFooter from 'components/CListFooter'
import CEmpty from 'components/CEmpty'
import CSearch from 'components/CSearch'
import CGoodsItem from 'components/CGoodsItems'
import { Loading, LoadMore, Divider } from 'vux'
import {mapState} from 'vuex'
export default {
  naem: 'goods',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      endText: '我是有底线的',
      emptyText: '抱歉，暂无数据',
      curGroupId: '153ee98b2a8f8b86d0c51ee4a68a492d',
      type: 'wechat',
      goodsList: [],
      pageCount: 1,
      timer: '',
      showLoadMore: true,
      tab: {
        tabList: ['微信专题', '微博专题', '小红书专题'],
        cur: '微信专题'
      },
      resetOrder: false,
      orderList: [
        {
          title: '粉丝',
          prop: 'g.fdFunsCount'
        },
        {
          title: '价格',
          prop: 'gp.fdPrice'
        },
        {
          title: '时间',
          prop: 'g.fdUpdatePriceDate'
        }
      ],
      params: {
        pageIndex: 1,
        sortName: '',
        sortOrder: ''
      }
    }
  },
  mounted () {
    this.fetchGoodsList()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    ...mapState({
      wechat (state) {
        return state.common.goodsGroups.wechat
      },
      weibo (state) {
        return state.common.goodsGroups.weibo
      },
      book (state) {
        return state.common.goodsGroups.book
      }
    })
  },
  methods: {
    handleTab (item) {
      if (item === '微信专题') {
        this.curGroupId = this.wechat
        this.type = 'wechat'
      } else if (item === '微博专题') {
        this.curGroupId = this.weibo
        this.type = 'weibo'
      } else if (item === '小红书专题') {
        this.curGroupId = this.book
        this.type = 'book'
      }
      // reset参数
      this.resetParams()
      this.resetOrder = true
      this.fetchGoodsList()
    },
    orderChange (item) {
      this.params.sortName = item.prop.prop
      this.params.sortOrder = item.order
      this.pageIndex = 1
      this.fetchGoodsList()
    },
    toSearch () {
      this.$router.push('search')
    },
    resetParams () {
      this.params = {
        pageIndex: 1,
        sortName: '',
        sortOrder: ''
      }
    },
    fetchGoodsList (reset = true) {
      if (reset) {
        window.scrollTo(0, 0)
        this.loading = true
      }
      this.$http.post(`/goods/list/${this.curGroupId}`, this.params).then((resp) => {
        this.pageCount = resp.data.pageCount
        if (reset) {
          this.goodsList = resp.data.data
        } else {
          this.goodsList = this.goodsList.concat(resp.data.data)
        }

        if (resp.data.data.length < 15) {
          this.showLoadMore = false
        } else {
          this.params.pageIndex++
        }
      }).finally(() => {
        this.loading = false
        this.resetOrder = false
      })
    },
    handleScroll () {
      if (this.timerLoadMore) {
        clearTimeout(this.timerLoadMore)
      }
      if (this.showLoadMore) {
        this.timerLoadMore = setTimeout(() => { // 优化滚动事件
          if ($(window).height() + $(document).scrollTop() > $('#loadMore').offset().top && !this.loading) {
            if (this.goodsList.length !== 0) {
              // ++this.params.pageIndex
              // if (this.params.pageIndex > this.pageCount) {
              //   this.showLoadMore = false
              //   return false
              // }
              this.fetchGoodsList(false)
            }
          }
        }, 50)
      }
    }
  },
  components: {
    CTabList,
    COrder,
    CListFooter,
    CSearch,
    CGoodsItem,
    Loading,
    LoadMore,
    Divider,
    CEmpty
  }
}
</script>
<style lang="less" scoped>
.goods-page {
  .search-head {
    width: 100%;
    height: 132px;
  }
  .search-head-fixer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 132px;
  }
  .divider {
    height: 2px;
    background: #ededed;
  }
  .load-more {
    height: 40px;
  }
}
</style>
