<template>
  <tabbar class="footer">
    <tabbar-item selected >
      <img slot="icon" src="../assets/images/common/tabbar-index.png">
      <img slot="icon-active" src="../assets/images/common/tabbar-index-active.png">
      <router-link :to="{name: 'home'}" slot="label">首页</router-link>
    </tabbar-item>
    <tabbar-item>
      <img slot="icon" src="../assets/images/common/tabbar-category.png">
      <img slot="icon-active" src="../assets/images/common/tabbar-category-active.png">
      <router-link :to="{name: 'category'}" slot="label">分类</router-link>
    </tabbar-item>
    <!-- <tabbar-item>
      <img slot="icon" src="../assets/images/common/tabbar-shopcart.png">
      <img slot="icon-active" src="../assets/images/common/tabbar-shopcart-active.png">
      <span slot="label">购物车</span>
    </tabbar-item>
    <tabbar-item>
      <img slot="icon" src="../assets/images/common/tabbar-pcenter.png">
      <img slot="icon-active" src="../assets/images/common/tabbar-pcenter-active.png">
      <span slot="label">个人</span>
    </tabbar-item> -->
  </tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  naem: 'footer',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
<style lang="less" scoped>

</style>
