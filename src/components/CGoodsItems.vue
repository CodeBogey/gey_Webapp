<template>
    <router-link :to="{name: 'goods-detail', params: {type: type, id: goodsItem.id}}">
      <div class="goods-item">
        <img class="avatar" :src="goodsItem.fdImageJson.url">
        <div class="goods-info">
          <div class="goods-name">
            <div class="goods-name-text">{{goodsItem.fdName}}</div>
          </div>
          <div class="wechat-code">{{goodsItem.fdCode}}</div>
          <div class="goods-trades">
            <div class="trade-label" v-for="item in goodsItem.fdAttr1Array" :key="item.id">{{item}}</div>
          </div>
          <div class="goods-fan">粉丝数:{{formartNum(goodsItem.fdFunsCount)}}</div>
          <div class="goods-price-date">有效日:{{goodsItem.fdNextUpdatePriceDate.substr(0,10)}}</div>
        </div>
        <div class="goods-price">
          <template v-if="type === 'wechat'">
            <div class="goods-price-item">
              <div class="goods-price-name">头条</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice1 === 0 ? '暂无报价' : goodsItem.fdPrice1}}
              </div>
            </div>
            <div class="goods-price-item">
              <div class="goods-price-name">二条</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png">
                {{goodsItem.fdPrice2 === 0 ? '暂无报价' : goodsItem.fdPrice2}}
              </div>
            </div>
          </template>
          <template  v-if="type === 'weibo'">
            <div class="goods-price-item">
              <div class="goods-price-name">防屏直发</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice1 === 0 ? '暂无报价' : goodsItem.fdPrice1}}
              </div>
            </div>
            <div class="goods-price-item">
              <div class="goods-price-name">防屏转发</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice2 === 0 ? '暂无报价' : goodsItem.fdPrice2}}
              </div>
            </div>
            <div class="goods-price-item">
              <div class="goods-price-name">直发</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice3 === 0 ? '暂无报价' : goodsItem.fdPrice3}}
              </div>
            </div>
            <div class="goods-price-item">
              <div class="goods-price-name">转发</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice4 === 0 ? '暂无报价' : goodsItem.fdPrice4}}
              </div>
            </div>
          </template>
          <template v-if="type === 'book'">
            <div class="goods-price-item">
              <div class="goods-price-name">出境图文价</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice1 === 0 ? '暂无报价' : goodsItem.fdPrice1}}
              </div>
            </div>
            <div class="goods-price-item">
              <div class="goods-price-name">视频价</div>
              <div class="goods-price-num">
                <img class="image-cart-money" src="../assets/images/goods/cart-money.png" >
                {{goodsItem.fdPrice2 === 0 ? '暂无报价' : goodsItem.fdPrice2}}
              </div>
            </div>
          </template>
        </div>
      </div>
    </router-link>
</template>
<script>
import {format} from '../utils/tools.js'
export default {
  props: {
    goodsItem: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.noImg()
  },
  methods: {
    formartNum (num) {
      if (num > 10000) {
        num = parseInt(num / 10000).toFixed(0) + '万'
      }
      return num
    },
    formatTime (time) {
      return format(time)
    },
    noImg () {
      if (this.goodsItem.fdImageJson.url === null) {
        this.goodsItem.fdImageJson.url = '../assets/images/common/no-data.png'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
.goods-item {
  position: relative;
  padding: 20/@rem;
  font-size: 12px;
  background: #ffffff
}
.avatar {
  width: 92/@rem;
  height: 92/@rem;
  float: left;
}
.goods-info {
  position: relative;
  width: 200/@rem;
  margin-left: 10/@rem;
  display: inline-block;
}
.goods-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.goods-name-text {
  max-width:115%;
  font-size: 16px;
  vertical-align: middle;
  display: inline-block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
}
.wechat-code, .goods-fan, .goods-price-name{
  margin: 6/@rem 0;
  display:inline-block;
  color:#8c8c8c;
  font-size:13px;
}
.wechat-code, .goods-fan {
  margin:6/@rem 0;
}
.goods-trades {
  display: flex;
  align-items: center;
}
.trade-label {
  background-color:#ededed;
  padding:2.5/@rem;
  margin-right:2.5/@rem;
  font-size:13px;
}
.goods-fan {
  width: 105/@rem;
}
.goods-price-date {
  display: inline-block;
  font-size:13px;
  color:#8c8c8c;
  float:right;
  margin:6/@rem -27.5/@rem 0 0;
}
.goods-price {
  padding:5/@rem 0 0 0;
  display:flex;
  flex-wrap:wrap;
  width:100%;
  align-items:center;
}
.goods-price-item {
  margin-top:10/@rem;
  width:50%;
}
.goods-price-num {
  display:inline-block;
  align-items:center;
  font-weight:bold;
  font-size:13px;
}
.goods-price-name {
  width:50%;
}
.image-cart-money {
  float:left;
  width:10/@rem;
  height:12/@rem;
  margin-right:10/@rem;
  margin:1.5/@rem 4/@rem 0 0;
}
</style>
