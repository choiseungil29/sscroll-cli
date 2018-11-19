<template>
  <div>
    <div id="naverIdLogin" class="container" style="max-width: 100px; margin-top: 1em">
      <a id="naverIdLogin_loginButton" href="#">
        <img src="https://static.nid.naver.com/oauth/big_g.PNG?version=js-2.0.0" height="60">
      </a>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import user from '../store/user'

export default {
  name: 'Login',

  created() {
    console.log('created login vue')
  },

  mounted() {
    let naverLogin = new naver.LoginWithNaverId({
      clientId: 'ZRAj_EfDpLWgznFlcf9w',
      callbackUrl: 'http://sscroll.site/login',
      loginButton: {color: 'green', type: 2, height: 60}
    });
    naverLogin.init()

    naverLogin.getLoginStatus((status) => {
      if (status) {
        user.dispatch('login', naverLogin.accessToken.accessToken)
          .then(res => {
            console.log('succeed login')
            console.log(res)
            if (res.nickname == null) {
              this.$router.push({ path: '/signup' })
            } else {
              this.$router.push({ path: '/' })
            }
          }).catch(err => {
            console.log('err')
            console.log(err)
          })
      }
    })

    $('#naverIdLogin_loginButton').attr('href', naverLogin.generateAuthorizeUrl())
  },

  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
