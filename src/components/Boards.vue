<template>
  <div>
    <div class="main">
      <div class="data">
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
    track() {
      this.$ga.page('/boards')
    }
  }
}
</script>

<style scoped>

div.main {
  text-align: center;
}

div.data {
  display: inline-block;
  width: 100%;
  max-width: 1080px;
}
</style>
