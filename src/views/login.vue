<template>
  <div class="page-login">

    <input type="text"  class="login-username" placeholder="用户名或手机号" v-model.trim="user">

    <input type="password" class="login-pwd" placeholder="密码" v-model.trim="pwd">

    <input type="text" class="validate-input" placeholder="验证码" v-model.trim="imgCode">
    <div class="validate-img">
      <a class="img_box" @click="refeshCaptcha"><img src="/captcha" name="captchaImg"></a>
    </div>

    <button class="login-btn" @click.stop="userLogin">登录</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      pwd: '',
      imgCode: ''
    }
  },
  mounted () {
    this.refeshCaptcha()
  },
  methods: {
    // 获取图形验证码
    refeshCaptcha () {
      $("img[name ='captchaImg']").attr('src', '/captcha?captchaid=' + new Date().getTime() + Math.random())
    },
    // 账号密码登录
    userLogin () {
      if (!this.user) {
        this.$vux.toast.text('用户名或手机号不能为空')
        return false
      } else if (!this.pwd) {
        this.$vux.toast.text('密码不能为空')
        return false
      } else if (!this.imgCode) {
        this.$vux.toast.text('验证码不能为空')
      }
      this.$http.post('/login', {
        fdType: 0,
        username: this.user,
        password: this.pwd,
        captcha: this.imgCode
      }).then(resp => {
        if (resp) {
          this.getUserInfo()
        }
      }).catch((err) => {
        console.log(err.response)
      })
    },
    // 异步函数，处理account请求重复问题
    async getUserInfo () {
      // await this.$store.dispatch('fetchAccount')
      await this.$router.push({name: 'home'})
    }
  }
}
</script>
<style lang="less" scoped>
</style>
