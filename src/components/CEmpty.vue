<template>
  <div class="empty">
    <div class="empty" v-if="showEmpty">
      <img class="empty-img" src="../assets/images/common/no-data.png" alt="">
      <div class="empty-text">{{emptyText}}</div>
    </div>
  </div>
</template>
<script>
export default {
  naem: 'empty',
  props: {
    showEmpty: {
      default: false,
      type: Boolean
    },
    emptyText: {
      default: '抱歉，没有搜索到您想要的商品',
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
/* 无搜索结果时 */
.empty {
  // position: absolute;
  // left: 10px;
  // right: 10px;
  margin-top: 1.08rem;
  height: 4.3rem;
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
<style lang="less">
.list-footer .weui-loadmore {
  margin: 0 auto 10px!important;
}
</style>
