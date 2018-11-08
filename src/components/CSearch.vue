<template>
  <div class="search-bar-page">
    <x-header :left-options="{backText: ''}">
      <div slot="overwrite-title" class="search-box">
        <img src="../assets/images/common/icon-search.png" class="icon-search" />
        <div class="search-input" @click="toSearch">{{tips}}</div>
      </div>
    </x-header>
  </div>
</template>
<script>
export default {
  naem: 'search-bar',
  props: {
    tips: {
      default: '请输入名称，搜索内容长度最多为139',
      type: String
    }
  },
  methods: {
    toSearch () {
      this.$router.push('search')
    }
  }
}
</script>
<style lang="less" scoped>
.search-box {
  display:flex;
  align-items:center;
  position:relative;
  padding:6px 10px;
  background-color:#ededed;
  border-radius:6px;
  .icon-search {
    width: 15px;
    height: 15px;
    margin-right: 6px;
  }
  .search-input {
    color:#8c8c8c;
    font-size: 12px;
  }
}
</style>
<style lang="less">
.search-bar-page .vux-header-title-area {
  margin: 0 56px!important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
