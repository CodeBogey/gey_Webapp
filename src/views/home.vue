<template>
  <div class="home-page">
    home
  </div>
</template>
<script>
export default {
  naem: 'home',
  mounted () {
    console.log($('.home-page'))
    console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.$http.post('/goods/list/153ee98b2a8f8b86d0c51ee4a68a492d', {
      pageIndex: 1
    }).then((resp) => {
      console.log(resp)
    }).finally(() => {
      this.$vux.loading.hide()
    })

    this.$http.post('/goods/collection/list', {
      pageIndex: 1,
      s_fdGoodsGroupId: '153ee98b2a8f8b86d0c51ee4a68a492d',
      s_smallWechat: '1',
      sortName: '',
      sortOrder: ''
    }).then((resp) => {
      console.log(resp)
    }).finally(() => {
      this.$vux.loading.hide()
    })
  }
}
</script>
<style lang="less" scoped>

</style>
