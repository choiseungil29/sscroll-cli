<template>
  <div style="height: 100%;">
    <div class="main">
      <div class="data">
	<h3>자유게시판</h3>
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" style="width: 17%;">번호</th>
              <th scope="col" style="text-align: left;">제목</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="board in boards">
              <th scope="row">{{ board.id }}</th>
              <th scope="row" style="text-align: left;"><router-link :to="{ name: 'board', params: { bid: board.id } }">{{ board.title }}</router-link></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import boardStore from '../store/board'

export default {
  name: 'Boards',

  created() {
    boardStore.dispatch('fetchAll')
  },

  data() {
    return {
      boards: boardStore.state.boards
    }
  },

  methods: {
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
