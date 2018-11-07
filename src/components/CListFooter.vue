<template>
  <div class="list-footer">

    <load-more :tip="tips" v-if="showLoading"></load-more>

    <divider v-if="showEnd">{{ endText }}</divider>

    <div class="empty" v-if="showEmpty">
      <img class="empty-img" src="../assets/images/common/no-data.png" alt="">
      <div class="empty-text">{{emptyText}}</div>
    </div>
  </div>
</template>
<script>
import { LoadMore, Divider } from 'vux'
export default {
  naem: 'list-footer',
  props: {
    tips: {
      default: '正在加载，请稍后',
      type: String
    },
    showLoading: {
      default: true,
      type: Boolean
    },
    showEnd: {
      default: true,
      type: Boolean
    },
    showEmpty: {
      default: true,
      type: Boolean
    },
    endText: {
      default: '我是有底线的',
      type: String
    },
    emptyText: {
      default: '抱歉，没有搜索到您想要的商品',
      type: String
    }
  },
  components: {
    LoadMore,
    Divider
  }
}
</script>
<style lang="less" scoped>
/* 无搜索结果时 */
.empty {
  position: absolute;
  left: 10px;
  right: 10px;
  margin-top: 40px;
  z-index: 99;
  text-align: center;
}
.empty-img {
  width: 100px;
  height: 96px;
}
.empty-text {
  margin-top: 30px;
}
</style>
