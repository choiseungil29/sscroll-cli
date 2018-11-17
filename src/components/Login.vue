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
        axios.post('/api/login', {accessToken: naverLogin.accessToken.accessToken, loginType: 'naver'})
        .then((res) => {
          if (res.status == 201) {
            // signup
            this.$router.push({ path: '/signup' })
          } else if (res.status == 200) {
            // user
            this.$router.push({ path: '/' })
          }
        }).catch((err) => {
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
