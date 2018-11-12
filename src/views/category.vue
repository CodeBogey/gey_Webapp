<template>
  <div class="category-page">
    <loading :show="loading" :text="loadingTxt"></loading>

    <div class="search-head">
      <div class="search-head-fixer">
        <c-search :showBack="false"></c-search>
      </div>
    </div>

    <div class="category-list">
      <div class="category-item" v-for="item in tradesList" :key="item.id">
        <img class="category-item-img" :src="item.imgUrl">
        <div class="category-item-text">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {Loading} from 'vux'
import CSearch from 'components/CSearch'
import img1 from '../assets/images/category/icon-sort1.png'
import img2 from '../assets/images/category/icon-sort2.png'
import img3 from '../assets/images/category/icon-sort3.png'
import img4 from '../assets/images/category/icon-sort4.png'
import img5 from '../assets/images/category/icon-sort5.png'
import img6 from '../assets/images/category/icon-sort6.png'
import img7 from '../assets/images/category/icon-sort7.png'
import img8 from '../assets/images/category/icon-sort37.png'
import img9 from '../assets/images/category/icon-sort8.png'
import img10 from '../assets/images/category/icon-sort9.png'
import img11 from '../assets/images/category/icon-sort10.png'
import img12 from '../assets/images/category/icon-sort11.png'
import img13 from '../assets/images/category/icon-sort12.png'
import img14 from '../assets/images/category/icon-sort13.png'
import img15 from '../assets/images/category/icon-sort14.png'
import img16 from '../assets/images/category/icon-sort15.png'
import img17 from '../assets/images/category/icon-sort16.png'
import img18 from '../assets/images/category/icon-sort17.png'
import img19 from '../assets/images/category/icon-sort18.png'
import img20 from '../assets/images/category/icon-sort19.png'
import img21 from '../assets/images/category/icon-sort20.png'
import img22 from '../assets/images/category/icon-sort21.png'
import img23 from '../assets/images/category/icon-sort22.png'
import img24 from '../assets/images/category/icon-sort23.png'
import img25 from '../assets/images/category/icon-sort24.png'
import img26 from '../assets/images/category/icon-sort25.png'
import img27 from '../assets/images/category/icon-sort26.png'
import img28 from '../assets/images/category/icon-sort27.png'
import img29 from '../assets/images/category/icon-sort28.png'
import img30 from '../assets/images/category/icon-sort29.png'
import img31 from '../assets/images/category/icon-sort30.png'
import img32 from '../assets/images/category/icon-sort31.png'
import img33 from '../assets/images/category/icon-sort32.png'
import img34 from '../assets/images/category/icon-sort33.png'
import img35 from '../assets/images/category/icon-sort34.png'
import img36 from '../assets/images/category/icon-sort38.png'
import img37 from '../assets/images/category/icon-sort35.png'
import img38 from '../assets/images/category/icon-sort36.png'
export default {
  naem: 'category',
  data () {
    return {
      loading: false,
      loadingTxt: '加载中...',
      tradesList: [],
      imgList: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18,
        img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38]
    }
  },
  mounted () {
    this.fetchTrades()
  },
  methods: {
    fetchTrades () {
      this.loading = true
      this.$http.get('/common/trades').then((resp) => {
        let imgList = this.imgList
        resp.data.forEach((item, index) => {
          item.imgUrl = imgList[index]
        })
        this.tradesList = resp.data
      }).finally(() => {
        this.loading = false
      })
    }
  },
  components: {
    Loading,
    CSearch
  }
}
</script>
<style lang="less" scoped>
.category-item {
  width: 24%;
  display: inline-block;
  text-align: center;
  padding: 0.28rem 0;
}
.category-item-img {
  width: 0.5rem;
  height: 0.5rem;
}
.category-item-text {
  margin-top: 0.14rem;
  font-size: 12px;
}
.search-head{
  width: 100%;
  height: 46px;
}
.search-head-fixer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 46px;
}
</style>
