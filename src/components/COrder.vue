<template>
  <div class="corder">
    <div v-for="(item, index) in orderList" :key="index">
      <div class="order">
        <div class="left" @click="titleCLick(item, index)" :class="{active: item.title == activeTitle}">{{item.title}}</div>
        <div class="right">
          <div class="asc" @click="orderClick(item, index, 'asc')" :class="{active:orderFlag[index]=='asc'}"></div>
          <div class="desc" @click="orderClick(item, index, 'desc')" :class="{active:orderFlag[index]=='desc'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
使用方式
<c-order :orderList="orderList" @orderChange="orderChange"></c-order>
 orderList为配置信息，orderCHange为回调函数，返回单线排序方式，以及当前orderList里对应的信息
 orderList: [
    {title: '作品数', prop: 'fd_all_publish_num'},
    {title: '评论数', prop: 'fd_all_commit_num'},
    {title: '点赞数', prop: 'fd_all_like_num'}
  ]
  orderCHange (item) {console.log(item) // {order: 'desc',prop:{title: '作品数', prop: 'fd_all_publish_num'}}}
*/
export default {
  props: {
    orderList: {
      type: Array
    }
  },
  data () {
    return {
      orderFlag: [],
      num: [],
      activeTitle: ''
    }
  },
  mounted () {
    if (this.orderList.length) {
      this.orderList.forEach((item, index) => {
        this.$set(this.num, index, 0)
      })
    }
  },
  methods: {
    titleCLick (item, index) { // 点击title切换排序方式
      this.activeTitle = this.orderList[index].title
      this.orderList.forEach((c, i) => {
        if (i !== index) {
          this.$set(this.num, i, 0)
          this.$set(this.orderFlag, i, '')
        }
      })
      this.num[index]++
      switch (this.num[index] % 3) {
        case 0 :
          this.orderFlag[index] = ''
          this.$set(this.orderFlag, index, '')
          this.$emit('orderChange', {
            order: '',
            prop: item
          })
          break
        case 1 :
          this.orderFlag[index] = 'asc'
          this.$set(this.orderFlag, index, 'asc')
          this.$emit('orderChange', {
            order: 'asc',
            prop: item
          })
          break
        case 2 :
          this.orderFlag[index] = 'desc'
          this.$set(this.orderFlag, index, 'desc')
          this.$emit('orderChange', {
            order: 'desc',
            prop: item
          })
          break
        default:
          break
      }
    },
    orderClick (item, index, order) {
      this.activeTitle = this.orderList[index].title
      this.orderList.forEach((c, i) => {
        if (i !== index) {
          this.$set(this.num, i, 0)
          this.$set(this.orderFlag, i, '')
        }
      })
      this.$set(this.num, index, 0)
      this.$set(this.orderFlag, index, order)
      this.$emit('orderChange', {
        order: order,
        prop: item
      })
    }
  }
}
</script>
<style lang="less" scoped>
.corder {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.order {
  position: relative;
  padding-right: 20px;
  height: 40px;
  .left{
    color: #232323;
    font-size: 14px;
    line-height: 40px;
    padding: 0 5px;
    &.active {
      // color: #ee3a3d;a1
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    .asc {
      width: 20px;
      position: relative;
      height: 20px;
      &:before {
        position: absolute;
        left: 5px;
        top: 12px;
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent #8c8c8c transparent;
      }
      &.active:before {
        border-color: transparent transparent #ee3a3d transparent;
      }
    }
    .desc {
      width: 20px;
      height: 20px;
      position: relative;
      &:before {
        position: absolute;
        left: 5px;
        top: 1px;
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: #8c8c8c transparent transparent transparent;
      }
      &.active:before {
        border-color: #ee3a3d transparent transparent transparent;
      }
    }
  }
}
</style>
