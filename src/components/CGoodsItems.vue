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
.goods-item {
  position: relative;
  padding: 0.4rem;
  font-size: 12px;
  background: #ffffff;
}
.avatar {
  width: 1.84rem;
  height: 1.84rem;
  float: left;
}
.goods-info {
  position: relative;
  width: 4rem;
  margin-left: 0.2rem;
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
  margin: 0.12rem 0;
  display:inline-block;
  color:#8c8c8c;
  font-size:13px;
}
.wechat-code, .goods-fan {
  margin:0.12rem 0;
}
.goods-trades {
  display: flex;
  align-items: center;
}
.trade-label {
  background-color:#ededed;
  padding:0.05rem;
  margin-right:0.05rem;
  font-size:13px;
}
.goods-fan {
  width: 2.1rem;
}
.goods-price-date {
  display: inline-block;
  font-size:13px;
  color:#8c8c8c;
  float:right;
  margin:0.12rem -0.55rem 0rem 0;
}
.goods-price {
  padding:0.1rem 0 0 0;
  display:flex;
  flex-wrap:wrap;
  width:100%;
  align-items:center;
}
.goods-price-item {
  margin-top:0.2rem;
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
  width:0.2rem;
  height:0.24rem;
  margin-right:0.2rem;
  margin:0.03rem 0.08rem 0 0;
}
</style>
