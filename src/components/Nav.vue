<template>
  <nav id="header" class="navbar bg-primary navbar-dark sticky-top navbar-expand-lg">
    <router-link to='/' class="navbar-brand" @click.native="reset"><span >쓰끄롤</span></router-link>
    <!-- <a class="navbar-brand" href="/">쓰크롤</a> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="nav navbar-nav ml-auto">
        <li v-if='isLogin === false'><router-link to='/login' class="nav-link">로그인</router-link></li>
        <li><router-link to='/recent' class="nav-link">최근 본 게시물</router-link></li>
        <!-- <li v-if='isLogin === true'><router-link to='/ward' class="nav-link">와드</router-link></li> -->
        <!-- <li><router-link to='/board' class="nav-link">자유게시판</router-link></li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
import contentStore from '../store/content'
import user from '../store/user'

export default {
  name: 'Nav',

  computed: {
    isLogin() {
      return user.getters.isLogin()
    }
  },

  methods: {
    reset(event) {
      contentStore.dispatch('reset')
    }
  }
}
</script>

<style scoped>
nav#header {
  position: fixed;
  background: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1021;
  transition: all 0.5s;
}

/*nav#header.scrollUp {
  trasnform: translateY(-100%);
}*/
</style>
