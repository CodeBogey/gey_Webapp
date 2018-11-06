<template>
  <tab :line-width="lineWidth" :custom-bar-width="barWidth + 'px'">
    <tab-item
      v-for="item in tab.tabList"
      :key="item.id"
      @on-item-click="onItemClick(item)"
      :selected="item === tab.cur"
      >
      {{item}}
    </tab-item>
  </tab>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default {
  naem: 'tab-list',
  props: {
    lineWidth: {
      type: Number,
      default: 2
    },
    barWidth: {
      type: Number,
      default: 80
    },
    tab: {
      type: Object
    }
  },
  components: {
    Tab,
    TabItem
  },
  methods: {
    onItemClick (item) {
      this.$emit('handleTab', item)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
