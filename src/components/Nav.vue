<template>
  <div id="header" class="navbar">
    <router-link to='/' class="navbar-brand" @click.native='reset'><span class="title">쓰끄롤</span></router-link>
    <div style='display: flex; justify-content: flext-start;'>
      <router-link to='/boards' class='nav-link'><span>익명 게시판</span></router-link>
      <router-link to='/logs' class='nav-link'><span>내 사용기록</span></router-link>
    </div>
  </div>
</template>

<script>
import contentStore from '../store/modules/contents'

export default {
  name: 'Nav',

  computed: {
  },

  methods: {
  }
}
</script>

<style scoped>
div#header {
  position: fixed;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 1021;
  transition: all 0.5s;
  justify-content: flex-start;
}

span.title {
  color: #242424;
}

a span {
  color: rgba(36, 36, 36, 0.7);
}

a.nav-link {
  padding-left: 7px;
  padding-right: 7px;
}

ul {
  justify-content: flex-start;
}
</style>
