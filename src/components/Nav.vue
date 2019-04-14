<template>
  <!-- <nav id="header" class="navbar bg-primary navbar-dark sticky-top navbar-expand-lg">
    <router-link to='/' class="navbar-brand" @click.native="reset"><span >쓰끄롤</span></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="nav navbar-nav ml-auto">
        <li><router-link to='/recent' class="nav-link">최근 본 게시물</router-link></li>
      </ul>
    </div>
  </nav> -->
  <el-menu
    :default-active="1"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
    >
    <el-menu-item class="el-menu-item" index="1"><router-link to='/'><p style="font-size: 24px;">쓰끄롤</p></router-link></el-menu-item>
    <!-- <el-menu-item index="2"><router-link to='/recent'>최근 본 게시물</router-link></el-menu-item> -->
    <el-menu-item class="el-menu-item" index="3"><router-link to='/boards'>익명 게시판</router-link></el-menu-item>
    <!-- <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item> -->
  </el-menu>
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

.el-menu {
  position: fixed;
  width: 100%;
}

.el-menu-item {
  border-bottom: none !important;
}
</style>
