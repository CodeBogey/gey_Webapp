<template>
  <div class="home-page">
    <loading :show="loading" :text="loadingTxt"></loading>
    <!-- CSearch部分 -->
    <div class="search-head">
      <div class="search-head-fixer">
        <c-search :showBack="false"></c-search>
      </div>
    </div>

    <!-- swiper轮播部分 -->
    <div class="swiper">
      <swiper dots-position="center" loop auto>
        <swiper-item v-for="item in imgObjectList" :key="item.id">
          <img :src="item" width="100%">
        </swiper-item>
      </swiper>
    </div>
    <div class="adv">
    <div class="punsterAndBillboard">
      <img src="../assets/images/index/punster.png">
      <img src="../assets/images/index/billboard.png">
    </div>
    <img src="../assets/images/index/headline.png" class="headline">
    </div>
    <!-- CGoodItems部分 -->
    <c-tab-list :tab="tab" @handleTab="handleTab"></c-tab-list>
    <c-goods-items v-for="item in goodsList" :key="item.id" :goodsItem="item" :type="type"></c-goods-items>
    <!-- CListFooter部分 -->
    <div id='loadMore' class="load-more">
      <c-list-footer :showLoading="showLoadMore" :showEnd="showEnd" :showEmpty="goodsList.length === 0" :emptyText="emptyText"></c-list-footer>
    </div>
  </div>
</template>
<script>
import CTabList from 'components/CTabList'
import CGoodsItems from 'components/CGoodsItems'
import CSearch from 'components/CSearch'
import CListFooter from 'components/CListFooter'
import {Swiper, SwiperItem, XImg, Loading} from 'vux'
import {mapState} from 'vuex'
import img1 from '../assets/images/index/banner01.png'
import img2 from '../assets/images/index/banner02.png'
import img3 from '../assets/images/index/banner03.png'
import img4 from '../assets/images/index/banner04.png'
import img5 from '../assets/images/index/banner05.png'
export default {
  naem: 'home',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      endText: '我是有底线的',
      emptyText: '抱歉，暂无数据',
      curGroupId: '153ee98b2a8f8b86d0c51ee4a68a492d',
      type: 'wechat',
      imgObjectList: [
        img1,
        img2,
        img3,
        img4,
        img5
      ],
      tab: {
        tabList: ['微信专题', '微博专题', '小红书专题'],
        cur: '微信专题'
      },
      params: {
        pageIndex: 1,
        sortName: '',
        sortOrder: ''
      },
      goodsList: [],
      pageCount: 1,
      timer: '',
      showLoadMore: false,
      showEnd: false,
      resetOrder: false
    }
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
  mounted () {
    this.fetchGoodsList()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
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
    resetParams () {
      this.params = {
        pageIndex: 1,
        sortName: '',
        sortOrder: ''
      }
    },
    fetchGoodsList (reset = true) {
      if (reset) {
        // window.scrollTo(0, 0)
        this.loading = true
      }
      this.$http.post(`/goods/list/${this.curGroupId}`, this.params).then((resp) => {
        this.pageCount = resp.data.pageCount
        if (reset) {
          this.goodsList = resp.data.data
        } else {
          this.goodsList = this.goodsList.concat(resp.data.data)
        }
      }).finally(() => {
        this.loading = false
        this.resetOrder = false
        this.showLoadMore = false
      })
    },
    handleScroll () {
      if ($(document).scrollTop() > 10) {
        $('.vux-header').css({background: '#fff'})
      }
      if ($(document).scrollTop() < 100) {
        $('.vux-header').css({background: 'transparent'})
      }
      if (this.timerLoadMore) {
        clearTimeout(this.timerLoadMore)
      }
      this.timerLoadMore = setTimeout(() => { // 优化滚动事件
        if ($(window).height() + $(document).scrollTop() > $('#loadMore').offset().top && !this.loading) {
          if (this.goodsList.length !== 0) {
            ++this.params.pageIndex
            if (this.params.pageIndex > this.pageCount) {
              this.showEnd = true
              return false
            }
            this.showLoadMore = true
            this.fetchGoodsList(false)
          }
        }
      }, 50)
    }
  },
  components: {
    CTabList,
    Swiper,
    SwiperItem,
    XImg,
    CGoodsItems,
    Loading,
    CSearch,
    CListFooter
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
.adv {
  background: #f5f5f5;
}
.punsterAndBillboard {
  padding: 7/@rem;
  display: flex;
  justify-content: space-around
}
.punsterAndBillboard img {
  height: 104/@rem;
}
.headline {
  width: 375/@rem;
  height: 84/@rem;
  margin: 0 auto 10/@rem auto
}
.search-head{
  width: 100%;
}
.search-head-fixer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 46px;
}
.load-more {
    height: 40px;
  }
</style>
<style lang="less">
.home-page .vux-header {
  background-color: transparent;
  transition: 0.1s linear;
}
</style>
