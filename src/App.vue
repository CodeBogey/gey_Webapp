<template>
  <div id="app">
    <router-view/>
    <c-footer></c-footer>
  </div>
</template>

<script>
import CFooter from 'components/CFooter'
export default {
  name: 'App',
  components: {
    CFooter
  }
}
</script>
<style lang="less">
@import 'assets/styles/common.less';
.weui-tabbar {
  position: fixed!important;
}
</style>
