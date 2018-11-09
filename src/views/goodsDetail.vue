<template>
  <div class="goods-detail-page">
    <loading :show="loading" :text="loadingTxt"></loading>
    <x-header :left-options="{backText: ''}" :title="title"></x-header>
    <div class="divider"></div>
    <!-- 基本信息 -->
    <div class="basic-info">
        <div class="avatar-wrap">
          <img class="avatar" :src="defaultImg" />
        </div>
        <div class="name-wrap">
          <div class="goods-name inline-block vertical-middle">{{good.fdName}}</div>
          <!-- <img src="../assets/images/goods/icon-wechat-identified.png" class="icon-wechat-identified"/> -->
        </div>
        <div class="basic-param">微信号：{{good.fdCode}}</div>
        <div class="basic-param">微信认证：{{good.fdVipType}}</div>
        <div class="basic-param">简介：{{good.remarks}}</div>
        <div class="basic-param">活跃粉丝：{{good.fdFunsCount}}</div>
        <div class="basic-param">分类：
          <div v-for="item in good.fdAttr1Array" :key="item.id" class="label">{{item}}</div>
        </div>
        <div class="price-wrap">
          <div class="price-item" v-for="item in good.fdGoodsProducts" :key="item.id">
            <div class="price-name">{{item.fdGoodsSpecification.fdName}}</div>
            <div class="price-num" v-if="item.fdPrice">
              <img src="../assets/images/goods/cart-money.png" class="image-cart-money" />
              <span class="price-val">{{item.fdPrice}}</span>
            </div>
            <div v-else>暂不接单</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import defaultImg from '../assets/images/common/gey_logo.png'
import { Loading } from 'vux'
export default {
  naem: 'goods-detail',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      title: '商品详情',
      defaultImg: defaultImg,
      good: []
    }
  },
  mounted () {
    this.loading = true
    this.$http.get(`/goods/info/15ca575bb79c29996c3326046c6b7bb6`).then((resp) => {
      this.good = resp.data
    }).finally(() => {
      this.loading = false
    })
  },
  components: {
    Loading
  }
}
</script>
<style lang="less" scoped>
.goods-detail-page {
  @rem: 50rem;
  .divider {
    height: 1px;
    background: #ededed;
  }
  .basic-info {
    .avatar-wrap {
      height: 100px;
      height: 100px;
      text-align: center;
      margin: 16/@rem 0 24/@rem 0;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ededed;
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
        // margin-right: 8px;
      }
    }
    .remarks {
      padding: 0 40px;
      margin: 20px auto 15px;
      font-size: 16px;
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
      padding: 2px 10px;
      background-color: #ee3a3c;
      color: #ffffff;
      font-size: 14px;
    }
    .price-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 40px;
      .price-item {
        display: flex;
        flex-direction: row;
      }
      .price-num {
        font-size: 14px;
        font-weight: bold;

      }
      .price-name {
        font-size: 14px;
        color: #666666;
        margin-right: 24px;
      }
      .image-cart-money {
        float: left;
        width: 12px;
        height: 12px;
        margin-right: 10px;
        margin-top: 2px;
      }
    }
  }
}
</style>
