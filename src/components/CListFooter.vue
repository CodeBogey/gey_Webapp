<template>
  <div class="list-footer">
    <load-more :tip="tips" v-if="showLoading"></load-more>
    <divider v-if="!showLoading">{{ endText }}</divider>
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
      default: false,
      type: Boolean
    },
    endText: {
      default: '我是有底线的',
      type: String
    }
  },
  components: {
    LoadMore,
    Divider
  }
}
</script>
