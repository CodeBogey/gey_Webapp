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
              <div class="text-center chart-empty" v-if="!totalRead.length && !headTotalRead.length && !maxRead.length">暂无相关数据</div>
              <v-chart v-if="totalRead.length" :data="totalRead" :width="300" :height="200" class="chart-wrap">
                <v-scale x :tick-count="3" />
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  :colors="['#ee3a3d']"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line :colors="'#ee3a3d'" series-field="type"/>
                <v-legend :options="{position:'bottom', align: 'center'}"/>
              </v-chart>

              <v-chart v-if="headTotalRead.length" :data="headTotalRead" :width="300" :height="200" class="chart-wrap">
                <v-scale x :tick-count="3" />
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  :colors="['#ee3a3d']"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line :colors="'#ee3a3d'" series-field="type"/>
                <v-legend :options="{position:'bottom', align: 'center'}"/>
              </v-chart>

              <v-chart v-if="maxRead.length" :data="maxRead" :width="300" :height="200" class="chart-wrap">
                <v-scale x :tick-count="3"/>
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  :colors="['#ee3a3d']"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line :colors="'#ee3a3d'" series-field="type"/>
                <v-legend :options="{position:'bottom', align: 'center'}"/>
              </v-chart>
            </template>

            <template v-if="groupType === 'weibo'">
              <div class="text-center chart-empty" v-if="!dailyForward.length && !dailyComment.length && !dailyLike.length">暂无相关数据</div>
              <v-chart v-if="dailyForward.length" :data="dailyForward" :width="300" :height="200" class="chart-wrap">
                <v-scale x :tick-count="3" />
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  :colors="['#ee3a3d']"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line :colors="'#ee3a3d'" series-field="type"/>
                <v-legend :options="{position:'bottom', align: 'center'}"/>
              </v-chart>

              <v-chart v-if="dailyComment.length" :data="dailyComment" :width="300" :height="200" class="chart-wrap">
                <v-scale x :tick-count="3" />
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  :colors="['#ee3a3d']"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line :colors="'#ee3a3d'" series-field="type"/>
                <v-legend :options="{position:'bottom', align: 'center'}"/>
              </v-chart>

              <v-chart v-if="dailyLike.length" :data="dailyLike" :width="300" :height="200" class="chart-wrap">
                <v-scale x :tick-count="3"/>
                <v-point
                  :style="{
                    stroke: '#fff',
                    lineWidth: 1
                  }"
                  :colors="['#ee3a3d']"
                  shape="smooth" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-line :colors="'#ee3a3d'" series-field="type"/>
                <v-legend :options="{position:'bottom', align: 'center'}"/>
              </v-chart>
            </template>

             <template v-if="groupType === 'book'">
              <div class="text-center chart-empty">暂无相关数据</div>
            </template>
          </div>
        </div>
      </div>
      <!-- 最近发布 -->
      <div v-if="curTab === '最新发布'" class="article-list">
        <template v-if="latest.length && groupType === 'wechat'">
          <div class="article-item clearfix" v-for="item in latest" :key="item.id">
            <div class="article-img-wrap"><img mode="aspectFill" :src="defaultWechatImg" class="article-img"/></div>
            <div class="article-right">
              <div class="article-title ellipsis-two">{{item.fdTitle}}</div>
              <div class="article-info">
                <div class="cn article-scan inline-block">浏览：{{item.readQty}}</div>
                <div class="cn article-thumb-up inline-block">点赞：{{item.likeQty}}</div>
                <div class="cn article-date">{{item.articleCreatedDate}}</div>
              </div>
            </div>
            <div class="split-line"></div>
          </div>

        </template>
        <template  v-if="latest.length && groupType === 'weibo'">
          <div class="article-item clearfix" v-for="item in latest" :key="item.id">
            <div class="article-img-wrap"><img mode="aspectFill" :src="item.fdImage.small || defaultWeiboImg" class="article-img"/></div>
              <div class="article-right">
                  <div class="article-title ellipsis-two">{{item.fdTitle}}</div>
                  <div class="article-info">
                    <div class="cn article-scan inline-block">评论：{{item.fdCommentNum}}</div>
                    <div class="cn article-thumb-up inline-block">点赞：{{item.fdLikeNum}}</div>
                    <div class="cn article-date">{{item.fdPubDate}}</div>
                  </div>
              </div>
              <div class="split-line"></div>
          </div>
        </template>
      </div>
      <!-- 热门文章 -->
      <div v-if="curTab === '热门文章'" class="article-list">
        <template v-if="hotest.length && groupType === 'wechat'">
          <div class="article-item clearfix" v-for="item in hotest" :key="item.id">
            <div class="article-img-wrap"><img mode="aspectFill" :src="defaultWechatImg" class="article-img"/></div>
            <div class="article-right">
              <div class="article-title ellipsis-two">{{item.fdTitle}}</div>
              <div class="article-info">
                <div class="cn article-scan inline-block">浏览：{{item.readQty}}</div>
                <div class="cn article-thumb-up inline-block">点赞：{{item.likeQty}}</div>
                <div class="cn article-date">{{item.articleCreatedDate}}</div>
              </div>
            </div>
            <div class="split-line"></div>
          </div>

        </template>
        <template  v-if="hotest.length && groupType === 'weibo'">
          <div class="article-item clearfix" v-for="item in hotest" :key="item.id">
            <div class="article-img-wrap"><img mode="aspectFill" :src="item.fdImage.small || defaultWeiboImg" class="article-img"/></div>
              <div class="article-right">
                  <div class="article-title ellipsis-two">{{item.fdTitle}}</div>
                  <div class="article-info">
                    <div class="cn article-scan inline-block">评论：{{item.fdCommentNum}}</div>
                    <div class="cn article-thumb-up inline-block">点赞：{{item.fdLikeNum}}</div>
                    <div class="cn article-date">{{item.fdPubDate}}</div>
                  </div>
              </div>
              <div class="split-line"></div>
          </div>
        </template>
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
import defaultWechatImg from '../assets/images/goods/cover_wechat.png'
import defaultWeiboImg from '../assets/images/goods/cover_weibo.png'
import CTabList from 'components/CTabList'
import { Loading, VChart, VTooltip, VLine, VScale, VPoint, VLegend } from 'vux'
import { toMyriadSimple } from '../utils/tools'
export default {
  naem: 'goods-detail',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      title: '商品详情',
      defaultImg,
      defaultWechatImg,
      defaultWeiboImg,
      id: '',
      groupType: '',
      good: [],
      tab: {
        tabList: ['媒体数据', '最新发布', '热门文章'],
        cur: '媒体数据'
      },
      curTab: '媒体数据',
      hasSevenData: false,
      curDimension: {}, // 当前数据维度

      // 获取各类数值
      date: [],
      // 微信
      totalRead: [],
      headTotalRead: [],
      maxRead: [],
      // 微博
      dailyForward: [],
      dailyComment: [],
      dailyLike: [],
      latest: [], // 最新文章
      hotest: [] // 热门文章
    }
  },
  mounted () {
    // 获取路由跳转传递的参数
    this.id = this.$route.params.id
    this.groupType = this.$route.params.type
    this.fetchDetail()
    this.fetchMediaData()
  },
  methods: {
    handleTab (item) {
      if (item === '媒体数据') {
        this.curTab = '媒体数据'
      } else if (item === '最新发布') {
        this.curTab = '最新发布'
        if (!this.latest.length) {
          this.fetchArticle()
        }
      } else if (item === '热门文章') {
        this.curTab = '热门文章'
        if (!this.hotest.length) {
          this.fetchArticle()
        }
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
      if (this.groupType !== 'book') {
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

          if (this.groupType === 'wechat') {
            let totalRead = resp.data.variousValues.fdTotalReadQty // 总阅读量
            let headTotalRead = resp.data.variousValues.fdTotalHeadLineReadQty // 头条阅读量
            let maxRead = resp.data.variousValues.fdMaxReadQty // 最高阅读量

            this.date.forEach((item, index) => {
              this.totalRead.push({date: item, value: totalRead[index], type: '总阅读量'})
              this.headTotalRead.push({date: item, value: headTotalRead[index], type: '头条阅读量'})
              this.maxRead.push({date: item, value: maxRead[index], type: '最高阅读量'})
            })
          }

          if (this.groupType === 'weibo') {
            let dailyForward = resp.data.variousValues.dailyForward // 每日转发
            let dailyComment = resp.data.variousValues.dailyComment // 每日评论
            let dailyLike = resp.data.variousValues.dailyLike // 每日点赞

            // 获取各类数值
            this.date.forEach((item, index) => {
              this.dailyForward.push({date: item, value: dailyForward[index], type: '每日转发'})
              this.dailyComment.push({date: item, value: dailyComment[index], type: '每日评论'})
              this.dailyLike.push({date: item, value: dailyLike[index], type: '每日点赞'})
            })
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    fetchArticle () {
      let url = ''
      if (this.groupType === 'wechat') {
        url = `/billboard/detail/article/${this.id}`
      } else if (this.groupType === 'weibo') {
        url = `/billboard/weibo/article/${this.id}`
      } else if (this.groupType === 'book') {
        url = `/billboard/book/article/${this.id}`
      }
      this.$http.get(url).then((resp) => {
        if (this.groupType === 'wechat') {
          _.each(resp.data.latest, (item) => {
            toMyriadSimple('readQty', item)
            toMyriadSimple('likeQty', item)
          })
          _.each(resp.hotest, (item) => {
            toMyriadSimple('readQty', item)
            toMyriadSimple('likeQty', item)
          })
          this.latest = resp.data.latest
          this.hotest = resp.data.hotest
        } else if (this.groupType === 'weibo') {
          _.each(resp.data.lastArticles, (item) => {
            toMyriadSimple('fdCommentNum', item)
            toMyriadSimple('fdLikeNum', item)
          })
          _.each(resp.data.hotArticles, (item) => {
            toMyriadSimple('fdCommentNum', item)
            toMyriadSimple('fdLikeNum', item)
          })
          this.latest = resp.data.lastArticles
          this.hotest = resp.data.hotArticles
        }
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
    VPoint,
    VLegend
  }
}
</script>
<style lang="less" scoped>
.goods-detail-page {
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
    margin-bottom: 0.36rem;
    .avatar-wrap {
      height: 100px;
      height: 100px;
      text-align: center;
      margin: 0.32rem 0 0.48rem 0;
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
        margin: 0.2rem 0;
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
      padding: 0.3rem 0.4rem;
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
    .chart-wrap {
      margin: 0 auto;
    }
    .chart-empty {
      padding: 0.6rem 0;
    }
  }

  /* 最近发布 */
.article-list {
  background-color: #ffffff;
  font-size: 14px;
  overflow: hidden;
  .article-scroll-view {
    padding-bottom: 30px;
  }
  .article-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    padding: 20px;
  }
  .article-img-wrap {
    width: 92px;
    height: 85px;
  }
  .article-img {
    width: 92px;
    height: 85px;
  }
  .article-right {
    width: 224px;
    margin-left: 20px;
  }
  .article-title {
    font-size: 14px;
    line-height: 20px;
    height: 40px;
  }
  .article-info > div {
    margin: 4px 0;
  }
  .article-scan {
    width: 90px;
  }
  .article-thumb-up {
    width: 80px;
  }
  .split-line {
    position: absolute;
    right: -20px;
    bottom: 0;
    width: 225px;
    height: 1px;
    background-color: #ededed;
  }
}

  /* 无数据 */
  .seven-null {
    width: 100%;
    padding: 75px 10px 100px 10px;
    margin-top: 10px;
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
