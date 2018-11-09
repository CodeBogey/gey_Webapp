<template>
  <div class="goods-detail-page">
    <loading :show="loading" :text="loadingTxt"></loading>
    <div class="detail-head">
      <div class="detail-head-fixer">
        <x-header :left-options="{backText: ''}" :title="title"></x-header>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 基本信息 -->
    <div class="basic-info">
      <template v-if="groupType === 'wechat'">
        <div class="avatar-wrap">
          <img class="avatar" :src="good.fdImage ? good.fdImage.url : defaultImg" />
        </div>
        <div class="name-wrap">
          <div class="goods-name inline-block vertical-middle">{{good.fdName}}</div>
          <img v-if="good.fdVipType === '已认证'" src="../assets/images/goods/icon-wechat-identified.png" class="icon-wechat-identified"/>
        </div>
        <div class="basic-param">微信号：{{good.fdCode}}</div>
        <div class="basic-param">微信认证：{{good.fdVipType}}</div>
        <div class="basic-param">简介：{{good.remarks}}</div>
        <div class="basic-param">活跃粉丝：{{good.fdFunsCount}}</div>
        <div class="basic-param">分类：
          <div v-for="(item, index) in good.fdAttr1Array" :key="item.id" v-if="index < 3" class="label">{{item}}</div>
        </div>
        <div class="price-wrap">
          <div class="price-item" v-for="item in good.fdGoodsProducts" :key="item.id">
            <div class="price-name">{{item.fdGoodsSpecification.fdName}}</div>
            <div class="price-num" v-if="item.fdPrice">
              <img src="../assets/images/goods/cart-money.png" class="image-cart-money" />
              <span class="price-val">{{item.fdPrice}}</span>
            </div>
            <div v-else class="inline-block">暂不接单</div>
          </div>
        </div>
      </template>

      <template v-if="groupType === 'weibo'">
        <div class="avatar-wrap">
          <img class="avatar" :src="good.fdImage ? good.fdImage.url : defaultImg" />
        </div>
        <div class="name-wrap">
          <div class="goods-name inline-block vertical-middle">{{good.fdName}}</div>
          <img v-if="good.fdVipType === '金V'" src="../assets/images/goods/icon-jv.png" class="icon-wechat-identified"/>
          <img v-if="good.fdVipType === '黄V'" src="../assets/images/goods/icon-hv.png" class="icon-wechat-identified"/>
          <img v-if="good.fdVipType === '蓝V'" src="../assets/images/goods/icon-lv.png" class="icon-wechat-identified"/>
          <img v-if="good.fdVipType === '达人'" src="../assets/images/goods/icon-daren.png" class="icon-wechat-identified"/>
        </div>
        <div class="remarks">{{good.remarks}}</div>
        <div class="basic-param">微博认证：{{good.fdVipType}}</div>
        <div class="basic-param">简介：{{good.remarks}}</div>
        <div class="basic-param">活跃粉丝：{{good.fdFunsCount}}</div>
        <div class="basic-param">分类：
          <div v-for="(item, index) in good.fdAttr1" :key="item.id" v-if="index < 3" class="label">{{item}}</div>
        </div>
        <div class="price-wrap">
          <div class="price-item" v-for="item in good.fdGoodsProducts" :key="item.id">
            <div class="price-name">{{item.fdGoodsSpecification.fdName}}</div>
            <div class="price-num" v-if="item.fdPrice">
              <img src="../assets/images/goods/cart-money.png" class="image-cart-money" />
              <span class="price-val">{{item.fdPrice}}</span>
            </div>
            <div v-else class="inline-block">暂不接单</div>
          </div>
        </div>
      </template>

      <template v-if="groupType === 'book'">
        <div class="avatar-wrap">
          <img class="avatar" :src="good.fdImage ? good.fdImage.url : defaultImg" />
        </div>
        <div class="name-wrap">
          <div class="goods-name inline-block vertical-middle">{{good.fdName}}</div>
        </div>
        <div class="remarks">{{good.remarks}}</div>
        <div class="basic-param">小红书认证：{{good.fdVipType}}</div>
        <div class="basic-param">简介：{{good.remarks}}</div>
        <div class="basic-param">活跃粉丝：{{good.fdFunsCount}}</div>
        <div class="basic-param">分类：
          <div v-for="(item, index) in good.fdAttr1" :key="item.id" v-if="index < 3" class="label">{{item}}</div>
        </div>
        <div class="price-wrap">
          <div class="price-item" v-for="item in good.fdGoodsProducts" :key="item.id">
            <div class="price-name">{{item.fdGoodsSpecification.fdName}}</div>
            <div class="price-num" v-if="item.fdPrice">
              <img src="../assets/images/goods/cart-money.png" class="image-cart-money" />
              <span class="price-val">{{item.fdPrice}}</span>
            </div>
            <div v-else class="inline-block">暂不接单</div>
          </div>
        </div>
      </template>
    </div>

    <div class="main-content" v-if="hasSevenData">
      <!-- tab -->
      <c-tab-list :tab="tab" @handleTab="handleTab"></c-tab-list>

      <!-- 媒体数据 -->
      <div v-if="curTab === '媒体数据'" class="tab-info-con">
        <div class="media-item">
          <div class="media-title">数据维度
            <div class="date pull-right">
              {{curDimension.date}}
            </div>
          </div>
          <div class="media-con">
            <template v-if="groupType === 'wechat'">
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdPushCount || '暂无'}}</div>
                <div class="circle-text cn">发布次数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdArticleCount || '暂无'}}</div>
                <div class="circle-text cn">发布篇数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdOhtQty || '暂无'}}</div>
                <div class="circle-text cn">10W+发布篇数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdMaxReadQty || '暂无'}}</div>
                <div class="circle-text cn">最高阅读数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdTotalHeadLineReadQty || '暂无'}}</div>
                <div class="circle-text cn">头条阅读数</div>
              </div>
            </template>
            <template v-if="groupType === 'weibo'">
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.original !== ''">{{curDimension.original}}</div>
                <div class="circle-num" v-if="curDimension.original === ''">暂无</div>
                <div class="circle-text cn">原创微博</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.avgLike !== ''">{{curDimension.avgLike}}</div>
                <div class="circle-num" v-if="curDimension.avgLike === ''">暂无</div>
                <div class="circle-text cn">篇均点赞</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.avgForward !== ''">{{curDimension.avgForward}}</div>
                <div class="circle-num" v-if="curDimension.avgForward === ''">暂无</div>
                <div class="circle-text cn">篇均转发</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.avgComment !== ''">{{curDimension.avgComment}}</div>
                <div class="circle-num" v-if="curDimension.avgComment === ''">暂无</div>
                <div class="circle-text cn">篇均评论</div>
              </div>

              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.fdArticleTotal !== ''">{{curDimension.fdArticleTotal}}</div>
                <div class="circle-num" v-if="curDimension.fdArticleTotal === ''">暂无</div>
                <div class="circle-text cn">微博总数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.fdLikeTotal !== ''">{{curDimension.fdLikeTotal}}</div>
                <div class="circle-num" v-if="curDimension.fdLikeTotal === ''">暂无</div>
                <div class="circle-text cn">点赞总数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.fdForwardTotal !== ''">{{curDimension.fdForwardTotal}}</div>
                <div class="circle-num" v-if="curDimension.fdForwardTotal === ''">暂无</div>
                <div class="circle-text cn">转发总数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num" v-if="curDimension.fdCommentTotal !== ''">{{curDimension.fdCommentTotal}}</div>
                <div class="circle-num" v-if="curDimension.fdCommentTotal === ''">暂无</div>
                <div class="circle-text cn">评论总数</div>
              </div>
            </template>
            <template v-if="groupType === 'book'">
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdArticleTotal || '暂无'}}</div>
                <div class="circle-text cn">文章总数</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdAvgRead || '暂无'}}</div>
                <div class="circle-text cn">平均阅读量</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdReadTotal || '暂无'}}</div>
                <div class="circle-text cn">总阅读量</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdAvgComment || '暂无'}}</div>
                <div class="circle-text cn">篇均评论</div>
              </div>
              <div class="circle-item text-center inline-block">
                <img src="../assets/images/goods/circle-bg.png" class="circle-bg" />
                <div class="circle-num">{{curDimension.fdCommentTotal || '暂无'}}</div>
                <div class="circle-text cn">总评论数</div>
              </div>
            </template>
          </div>
          <div class="read-wrap">
            <template v-if="groupType === 'wechat'">
              <div class="read-item inline-block">
                <div class="read-title cn inline-block">总计阅读</div>
                <div class="read-num inline-block">{{curDimension.fdTotalReadQty || '暂无'}}</div>
              </div>
              <div class="read-item inline-block">
                <div class="read-title cn inline-block">平均阅读</div>
                <div class="read-num inline-block">{{curDimension.fdAvgReadQty || '暂无'}}</div>
              </div>
              <div class="read-item inline-block">
                <div class="read-title cn inline-block">总计点赞</div>
                <div class="read-num inline-block">{{curDimension.fdTotalLikeQty || '暂无'}}</div>
              </div>
              <div class="read-item inline-block">
                <div class="read-title cn inline-block">平均点赞</div>
                <div class="read-num inline-block">{{curDimension.fdAvgLikeQty || '暂无'}}</div>
              </div>
            </template>
          </div>
        </div>

        <div class="media-item">
          <div class="media-title">
            各类数值
          </div>
          <div class="media-con">
            <template v-if="groupType === 'wechat'">
              <!-- <div class="text-center" v-if="!totalReadChartVisb && !headLineChartVisb && !maxReadChartVisb">暂无相关数据</div> -->
              <v-chart :data="totalRead" prevent-default :width="334" :height="200">
                <v-scale x :tick-count="3" />
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line />
              </v-chart>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hasSevenData" class="seven-null">
      <img src="../assets/images/goods/warning.png" class="warning-icon" />
      <div class="seven-null-text">
        该账号已有 <em class="seven-red">7</em> 天未推送图文内容,无趋势图展示
      </div>
    </div>
  </div>
</template>
<script>
import defaultImg from '../assets/images/common/gey_logo.png'
import CTabList from 'components/CTabList'
import { Loading, VChart, VTooltip, VLine, VScale, VPoint } from 'vux'
import { toMyriadSimple } from '../utils/tools'
export default {
  naem: 'goods-detail',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      title: '商品详情',
      defaultImg: defaultImg,
      id: '',
      groupType: '',
      good: [],
      tab: {
        tabList: ['媒体数据', '最新发布', '热门文章'],
        cur: '媒体数据'
      },
      curTab: '媒体数据',
      hasSevenData: true,
      curDimension: {}, // 当前数据维度

      // 获取各类数值
      date: [],
      totalRead: [] // 总阅读量

    }
  },
  mounted () {
    console.log(this.$route.params)
    // 获取路由跳转传递的参数
    this.id = this.$route.params.id
    this.groupType = this.$route.params.type
    this.fetchDetail()
    this.fetchMediaData()
  },
  methods: {
    handleTab (item) {
      console.log(item)
      if (item === '媒体数据') {
        this.curTab = '媒体数据'
      } else if (item === '最新发布') {
        this.curTab = '最新发布'
      } else if (item === '热门文章') {
        this.curTab = '热门文章'
      }
    },
    fetchDetail () {
      this.loading = true
      // 15ca575bb79c29996c3326046c6b7bb6 1641bc734b86114aba66f6a4a739a484 16425535c9021548952b8af42e2b6810
      this.$http.get(`/goods/info/${this.id}`).then((resp) => {
        toMyriadSimple('fdFunsCount', resp.data)
        this.good = resp.data
      }).finally(() => {
        this.loading = false
      })
    },
    fetchMediaData () {
      this.loading = true
      let url = ''
      if (this.groupType === 'wechat') {
        url = `/billboard/detail/daily/${this.id}`
      } else if (this.groupType === 'weibo') {
        url = `/billboard/weibo/data/${this.id}`
      } else if (this.groupType === 'book') {
        url = `/billboard/book/data/${this.id}`
      }
      this.$http.get(url).then((resp) => {
        this.hasSevenData = resp.data.hasSevenData
        if (this.groupType === 'wechat') {
          toMyriadSimple('fdMaxReadQty', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdTotalHeadLineReadQty', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdTotalReadQty', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdAvgReadQty', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdTotalLikeQty', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdAvgLikeQty', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdMaxReadQty', resp.data.dataDimension.weeklyDimension)
          this.date = resp.data.variousValues.fdDateEnd
        } else if (this.groupType === 'weibo') {
          toMyriadSimple('avgLike', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('avgForward', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('avgComment', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdLikeTotal', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdForwardTotal', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdCommentTotal', resp.data.dataDimension.dailyDimension)
          this.date = resp.data.variousValues.date
        } else if (this.groupType === 'book') {
          toMyriadSimple('fdArticleTotal', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdAvgRead', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdReadTotal', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdAvgComment', resp.data.dataDimension.dailyDimension)
          toMyriadSimple('fdCommentTotal', resp.data.dataDimension.dailyDimension)
          this.date = resp.data.variousValues.date
        }
        this.curDimension = resp.data.dataDimension.dailyDimension

        let totalRead = resp.data.variousValues.fdTotalReadQty

        // 获取各类数值
        this.date.forEach((item, index) => {
          this.totalRead.push({date: item, value: totalRead[index]})
        })
      }).finally(() => {
        this.loading = false
      })
    }
  },
  components: {
    Loading,
    CTabList,
    VChart,
    VTooltip,
    VLine,
    VScale,
    VPoint
  }
}
</script>
<style lang="less" scoped>
.goods-detail-page {
  @rem: 50rem;
  background-color: #f5f5f5;
  min-height: 100vh;
  .detail-head {
    width: 100%;
    height: 46px;
  }
  .detail-head-fixer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 46px;
  }
  .inline-block {
    display: inline-block;
  }
  .divider {
    height: 1px;
    background: #ededed;
  }
  // 基本信息
  .basic-info {
    background: #fff;
    padding: 16px 0;
    margin-bottom: 18/@rem;
    .avatar-wrap {
      height: 100px;
      height: 100px;
      text-align: center;
      margin: 16/@rem 0 24/@rem 0;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .name-wrap {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .goods-name {
        font-size: 16px;
        height: 26px;
        line-height: 26px;
        margin-right: 8px;
      }
      img {
        width: 14px;
        height: 14px;
        margin-top: 5px;
      }
    }
    .remarks {
      padding: 0 40px;
      margin: 20px auto 15px;
      font-size: 14px;
      text-align: center;
    }
    .basic-param {
      margin: 16px 0;
      padding: 0 40px;
      font-size: 14px;
      color: #666666;
    }
    .label {
      display: inline-block;
      margin-right: 20px;
      margin-bottom: 5px;
      padding: 2px 6px;
      background-color: #ee3a3c;
      color: #ffffff;
      font-size: 14px;
    }
    .price-wrap {
      padding: 0 40px;
      .price-item {
        width: 50%;
        margin: 10/@rem 0;
        display: inline-block;
        }
        .price-name {
          width: 72px;
          font-size: 14px;
          color: #666666;
          display: inline-block;
        }
        .price-num {
          font-size: 14px;
          font-weight: bold;
          display: inline-block;
        }
        .image-cart-money {
          float: left;
          width: 12px;
          height: 12px;
          margin: 2px 2px 0 6px;
        }
    }
  }
  // 主体
  .main-content {
    background-color: #fff;
    font-size: 16px;
  }
  /* 媒体数据 */
  .tab-info-con {
    .media-item {
      padding: 15/@rem 20/@rem;
    }
    .media-title {
      font-size: 16px;
    }
    .media-con {
      padding: 10px 0;
    }

    .circle-item {
      width: 84px;
    }
    .circle-bg,
    .circle-num {
      width: 84px;
      height: 84px;
    }
    .circle-item {
      position: relative;
      margin: 12px 12px;
    }
    .circle-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .circle-num {
      font-size: 14px;
      line-height: 84px;
      margin: auto;
    }
    .circle-text {
      margin-top: 15px;
      font-size: 12px;
    }
    .cn {
      color: #8c8c8c;
    }
    .read-view {
      padding: 10px 30px;
    }
    .read-title {
      margin-right: 18px;
    }
    .read-item {
      font-size: 14px;
      width: 48%;
    }
  }

  /* 无数据 */
  .seven-null {
    width: 100%;
    padding: 75px 10px 100px 10px;
    margin-top: 10rpx;
    background-color: #ffffff;
    text-align: center;
  }
  .seven-null-text {
    font-size: 16px
  }
  .seven-red {
    color: #ef4e4f;
    font-size: 18px;
  }
  .warning-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
