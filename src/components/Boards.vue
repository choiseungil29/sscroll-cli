<template>
  <div style="height: 100%;">
    <div class="main">
      <div class="data">
        <h3>자유게시판</h3>
        <el-button v-on:click="createBoard">글 작성하기</el-button>
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" style="width: 17%;">번호</th>
              <th scope="col" style="text-align: left;">제목</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="board in boards" :key="board.id">
              <th scope="row">{{ board.id }}</th>
              <th scope="row" style="text-align: left;"><router-link :to="{ name: 'board', params: { bid: board.permanent_id } }">{{ board.title }}</router-link></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
    ...contentStore.mapGetters({ 'boards': getters.BOARDS }),
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
  background-color: white;
  display: inline-block;
  width: 100%;
  max-width: 1080px;
  padding-left: 2rem;
  padding-right: 2rem;
}

h3 {
  color: #25282b;
  text-align: left;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

div {
  height: 100%;
}

</style>
