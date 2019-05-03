<template>
  <div id="header" class="navbar">
    <router-link to='/' class="navbar-brand" @click.native='reset'><span class="title">쓰끄롤</span></router-link>
    <div style='display: inline-block;'>
      <router-link to='/boards' class='nav-link' @click.native='boards'><span :style="{ color: boardsColor }">익명 게시판</span></router-link>
    </div>
    <div style="display: inline-block; float: right;">
      <router-link to='/logs' class='nav-link logs' @click.native='logs'><img id='logs' style="width: 15px;" :src="logIcon"></router-link>
    </div>
  </div>
</template>

<script>
import contentStore from '../store/modules/contents';
import * as actions from '../store/modules/contents/types';

export default {
  name: 'Nav',

  computed: {
  },

  methods: {
    ...contentStore.mapActions([actions.RESET]),

    reset(e) {
      this.default()
      this[actions.RESET]();
      window.scroll(0, 0);
    },

    logs(e) {
      this.default();
      this.logIcon = this.logSelected;     
    },

    boards(e) {
      this.default();
      this.boardsColor = this.boardsSelected;
    },

    default() {
      this.logIcon = this.logDefault;
      this.boardsColor = this.boardsDefault;
    }
  },

  data() {
    return {
      location: window.location,
      logIcon: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-main-history@2x.png',
      logDefault: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-main-history@2x.png',
      logSelected: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-main-history-s%402x.png',

      boardsColor: '#242424',
      boardsDefault: '#242424',
      boardsSelected: '#0b9ef2',
    }
  }
}
</script>

<style scoped>
div#header {
  display: inline-block;
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

.nav-link span {
  color: #242424;
}

.boards span {
  color: #0b9ef2;
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

.nav-link {
  display: inline-block;
}

ul {
  justify-content: flex-start;
}
</style>
