<template>
  <div class="search-page">
    <loading :show="loading" :text="loadingTxt"></loading>
    <div class="search-head">
      <div class="search-head-fixer">
        <div class="search-view">
          <div class="search-box">
            <img class="icon-search" src="../assets/images/common/icon-search.png">
            <input type="search" @keydown="search" v-model.trim="keyword" class="search-input" placeholder="请输入名称，搜索内容长度最多为139">
          </div>
          <div class="search-cancel" @click="search" v-if="showFlag">搜索</div>
          <div class="search-cancel" @click="cancel" v-if="!showFlag">取消</div>
        </div>
        <c-tab-list :tab="tab" @handleTab="handleTab"></c-tab-list>
        <div class="history-title" v-if="showFlag">
        历史记录
        <div class="clearBtn" @click="clearBtn">清除</div>
        <ul>
          <li class="history-item" @click="clickSearchLogList(item)" v-for="item in searchLogList" :key="item.id">{{item}}</li>
        </ul>
      </div>
      <div class="hotSearch-title" v-if="showFlag">
        热门搜索
        <ul>
          <li class="hotSearch-item" v-for="item in hotSearchList" :key="item.id">{{item.fdName}}</li>
        </ul>
      </div>
      </div>
    </div>
    <template v-if="curTab === '全部'">
      <div v-if="wechatList.length">
        <div class="result-title">微信媒体</div>
        <c-goods-items v-for="(item,index) in wechatList" :key="item.id" v-if="index < 3 " :goodsItem="item" :type="'wechat'"></c-goods-items>
        <div class="more-media" @click="moreList('微信')">更多微信媒体></div>
      </div>
      <div v-if="weiboList.length">
        <div class="result-title">微博媒体</div>
        <c-goods-items v-for="(item,index) in weiboList" :key="item.id" v-if="index < 3 " :goodsItem="item" :type="'weibo'"></c-goods-items>
        <div class="more-media" @click="moreList('微博')">更多微博媒体></div>
      </div>
      <div v-if="bookList.length">
        <div class="result-title">小红书</div>
        <c-goods-items v-for="(item,index) in bookList" :key="item.id" v-if="index < 3 " :goodsItem="item" :type="'book'"></c-goods-items>
        <div class="more-media" @click="moreList('小红书')">更多小红书媒体></div>
      </div>
    </template>

    <template v-if="curTab === '微信'">
      <c-goods-items v-for="item in wechatList" :key="item.id" :goodsItem="item" :type="'wechat'"></c-goods-items>
      <div id='loadMore' class="load-more" v-if="!showFlag">
        <c-list-footer v-if="!!wechatList.length" :showLoading="showLoadMore"></c-list-footer>
        <c-empty v-else :showEmpty="!wechatList.length" :emptyText="emptyText"></c-empty>
      </div>
    </template>

    <template v-if="curTab === '微博'">
      <c-goods-items v-for="item in weiboList" :key="item.id" :goodsItem="item" :type="'weibo'"></c-goods-items>
      <div id='loadMore' class="load-more" v-if="!showFlag">
        <c-list-footer v-if="!!weiboList.length" :showLoading="showLoadMore"></c-list-footer>
        <c-empty v-else :showEmpty="!weiboList.length" :emptyText="emptyText"></c-empty>
      </div>
    </template>

    <template v-if="curTab === '小红书'">
      <c-goods-items v-for="item in bookList" :key="item.id" :goodsItem="item" :type="'book'"></c-goods-items>
      <div id='loadMore' class="load-more" v-if="!showFlag">
        <c-list-footer v-if="!!bookList.length" :showLoading="showLoadMore"></c-list-footer>
        <c-empty v-else :showEmpty="!bookList.length" :emptyText="emptyText"></c-empty>
      </div>
    </template>
  </div>
</template>
<script>
import CTabList from 'components/CTabList'
import CGoodsItems from 'components/CGoodsItems'
import CListFooter from 'components/CListFooter'
import CEmpty from 'components/CEmpty'
import {Loading} from 'vux'
import {mapState} from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      endText: '我是有底线的',
      emptyText: '抱歉，没有搜到你想要的商品',
      keyword: '',
      // showSearch: true,
      // showHistory: true,
      showFlag: true,
      // showTitle: false,
      pageCount: 1,
      // goodsList: [],
      searchLogList: [],
      hotSearchList: [],
      timer: '',
      showLoadMore: true,
      resetOrder: false,
      params: {
        pageIndex: 1,
        s_fdName: ''
      },
      tab: {
        tabList: ['全部', '微信', '微博', '小红书'],
        cur: '全部'
      },
      curTab: '全部',
      wechatList: [],
      weiboList: [],
      bookList: []
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
    this.getSearchLog()
    this.hotSearch()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 热门信息
    hotSearch () {
      this.$http.get(`/goods/fdGoodsGroupId/${this.wechat}/goodsByWeightWeekList`).then((resp) => {
        this.hotSearchList = resp.data
        // console.log(resp.data)
      })
    },
    // 更多列表
    moreList (type) {
      this.curTab = type
      this.tab.cur = type
      window.scrollTo(0, 0)
    },
    // 缓存搜索记录
    setSearchLog (val) {
      let value = this.keyword
      let logList = this.searchLogList
      if (value) {
        // 去重
        logList.forEach((item, idx) => {
          if (item === value) {
            logList.splice(idx, 1)
          }
        })
        logList.unshift(value)
        if (logList.length > 10) {
          logList.pop()
        }
        localStorage.setItem('logList', JSON.stringify(logList))
      }
    },
    // 获取本地缓存
    getSearchLog () {
      let logList = JSON.parse(localStorage.getItem('logList'))
      if (logList) {
        this.searchLogList = logList
      }
    },
    // 清除记录
    clearBtn () {
      this.searchLogList = []
      localStorage.removeItem('logList')
    },
    handleTab (item) {
      if (item === '全部') {
        this.curTab = '全部'
      } else if (item === '微信') {
        this.curTab = '微信'
      } else if (item === '微博') {
        this.curTab = '微博'
      } else if (item === '小红书') {
        this.curTab = '小红书'
      }
    },
    fetchWxData (reset = true) {
      if (reset) {
        this.loading = true
      }
      this.$http.post(`/goods/list/${this.wechat}`, this.params).then((resp) => {
        this.pageCount = resp.data.pageCount
        if (reset) {
          this.wechatList = resp.data.data
        } else {
          this.wechatList = this.wechatList.concat(resp.data.data)
        }
        if (resp.data.data.length < 15) {
          this.showLoadMore = false
        } else {
          this.params.pageIndex++
        }
      }).finally(() => {
        this.loading = false
      })
    },
    fetchWbData (reset = true) {
      if (reset) {
        this.loading = true
      }
      this.$http.post(`/goods/list/${this.weibo}`, this.params).then((resp) => {
        this.pageCount = resp.data.pageCount
        if (reset) {
          this.weiboList = resp.data.data
        } else {
          this.weiboList = this.weiboList.concat(resp.data.data)
        }
        if (resp.data.data.length < 15) {
          this.showLoadMore = false
        } else {
          this.params.pageIndex++
        }
      }).finally(() => {
        this.loading = false
      })
    },
    fetchbookData (reset = true) {
      if (reset) {
        this.loading = true
      }
      this.$http.post(`/goods/list/${this.book}`, this.params).then((resp) => {
        this.pageCount = resp.data.pageCount
        if (reset) {
          this.bookList = resp.data.data
        } else {
          this.bookList = this.bookList.concat(resp.data.data)
        }
        if (resp.data.data.length < 15) {
          this.showLoadMore = false
        } else {
          this.params.pageIndex++
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 搜索
    search () {
      if (this.keyword !== '') {
        this.showFlag = false
        // this.showTitle = true
        this.setSearchLog()
      }
      // 三次请求
      if (this.keyword) {
        this.params.s_fdName = this.keyword
        this.fetchWxData()
        this.fetchWbData()
        this.fetchbookData()
      }
    },
    // 点击历史记录搜索
    clickSearchLogList (item) {
      if (item !== '') {
        this.showFlag = false
        // this.showTitle = true
        this.setSearchLog()
      }
      // 三次请求
      if (item) {
        this.params.s_fdName = item
        this.fetchWxData()
        this.fetchWbData()
        this.fetchbookData()
      }
    },
    // 取消
    cancel () {
      this.showFlag = true
      this.keyword = ''
      // this.showTitle = false
      this.wechatList = []
      this.weiboList = []
      this.bookList = []
    },
    // 滚动条(目前有错误,没效果)
    handleScroll () {
      if (this.timerLoadMore) {
        clearTimeout(this.timerLoadMore)
      }
      if (this.showLoadMore) {
        this.timerLoadMore = setTimeout(() => { // 优化滚动事件
          if ($(window).height() + $(document).scrollTop() > $('#loadMore').offset().top && !this.loading) {
            if (this.wechatList.length !== 0 && this.curTab === '微信') {
              this.fetchWxData(false)
            }
          }
          if ($(window).height() + $(document).scrollTop() > $('#loadMore').offset().top && !this.loading) {
            if (this.weiboList.length !== 0 && this.curTab === '微博') {
              this.fetchWbData(false)
            }
          }
          if ($(window).height() + $(document).scrollTop() > $('#loadMore').offset().top && !this.loading) {
            if (this.bookList.length !== 0 && this.curTab === '小红书') {
              this.fetchbookData(false)
            }
          }
        }, 50)
      }
    }
  },
  components: {
    CTabList,
    CGoodsItems,
    Loading,
    CEmpty,
    CListFooter
  }
}
</script>
<style lang="less" scoped>
.search-head {
  width: 100%;
  height: 95px;
}
.search-head-fixer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}
.search-view {
  display: flex;
  align-items:center;
  padding:6px 0.25rem;
  border-bottom:1px solid #ededed;
  background: #ffffff;
}
.search-box {
  width: 6rem;
  display:flex;
  align-items:center;
  position:relative;
  padding:6px 0.2rem;
  background-color:#ededed;
  border-radius:0.06;
}
.icon-search {
  width:0.33rem;
  height:0.34rem;
}
.search-input {
  display:inline-block;
  width:534rem;
  height:26px;
  margin-left:0.16rem;
  color:#232323;
  font-size:12px;
  min-height:auto;
  background:none;
  outline:none;
  border:0px;
}
.search-cancel {
  width:2rem;
  font-size:18px;
  text-align:center;
}
.history-title, .hotSearch-title {
  font-size:13;
  color:#8c8c8c;
  font-weight:bold;
  padding:0.2rem;
}
.history-title {
  margin-bottom: 1rem;
}
.clearBtn {
  float: right;
}
// .history-item {
//   width:100%;
//   padding:0.2rem;
//   font-size:13px;
//   color:#8c8c8c;
//   border-bottom:1px solid #dddddd;
// }
.result-title {
  padding:0.16rem 0.38rem;
  font-size:17px;
  background-color: #dddddd;
}
.more-media {
  padding:0.25rem 0.4rem;
  text-align:center;
  font-size:17px;
  font-weight: bold;
  color:#8c8c8c;
  background-color:#ffffff;
}
.hotSearch-item, .history-item {
  font-size:12px;
  color:#8c8c8c;
  background: #f3f0f0;
  float: left;
  padding: 0.1rem;
  border-radius: 0.2rem;
  margin: 0.1rem;
}

</style>
