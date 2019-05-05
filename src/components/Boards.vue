<template>
  <div style="height: 100%; padding-top: 50px;">
    <div class="main">
      <div style="display: flex; align-items: center; text-align: left; height: 38px; padding-left: 21px; background-color: #0b9ef2;">
        <div>
          <span class="title">전체게시판</span>
        </div>
      </div>
      <div class="data">
        
        <!-- <el-button v-on:click="createBoard">글 작성하기</el-button> -->
        <div v-for="board in boards" :key="board.id">
          <router-link :to="{ name: 'board', params: { bid: board.permanent_id } }">
            <div style="text-align: left; padding-top: 15px;">
              <span style="font-size: 16px; color: #161616;">{{ board.title }}</span>
              <span style="margin-left: 6px;"><img src="https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-chat.png" class='icon'> {{ board.comments_length }}</span>
            </div>
            <div style="text-align: left; padding-bottom: 16px; border-bottom: 1px solid #bbbbbb;">
              <span style="color: rgba(21, 21, 21, 0.5);">{{ board.date }}</span>
              <span style="color: rgba(21, 21, 21, 0.5); margin-left: 19px;">조회 {{ board.viewed }}</span>
            </div>
          </router-link>
        </div>
        <div>
          <el-button class='write-content' v-on:click="createBoard">글쓰기</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import contentStore from '../store/modules/contents';
import * as getters from '../store/modules/contents/getters';
import * as actions from '../store/modules/contents/types';

export default {
  name: 'Boards',

  created() {
    // this[actions.FETCH_ALL]();
    this[actions.FETCH_BOARD_ALL]();
  },

  data() {
    return {
    }
  },

  computed: {
    ...contentStore.mapGetters([ getters.BOARDS ]),

    boards() {
      return _.orderBy(this[getters.BOARDS], 'created_at', 'desc');
    },
  },

  methods: {
    ...contentStore.mapActions([actions.FETCH_BOARD_ALL]),

    createBoard() {
      this.$router.push('/boards/create');
    }
  }
}
</script>

<style scoped>
div.main {
  text-align: center;
}

div.data {
  /* background-color: white; */
  display: inline-block;
  width: 100%;
  max-width: 1080px;
  padding-left: 21px;
  padding-right: 21px;
}

h3 {
  color: #25282b;
  text-align: left;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

span.title {
  font-size: 16px !important;
  line-height: 0 !important;
  color: white;
}

.write-content {
  margin-top: 38px;
  font-size: 14px;
  color: rgba(21, 21, 21, 0.5);
  border: solid 1px rgba(21, 21, 21, 0.5);
}
</style>
