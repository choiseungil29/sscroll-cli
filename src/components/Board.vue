<template>
  <div>
    <div class="main">
      <div class="data" v-if="board">
        <p>작성일 : {{ board.created_at }}</p>
        <hr>
        <div class="row">
          <div class="col" v-html="board.data">
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import boardStore from '../store/board'

export default {
  name: 'Board',

  created() {
    boardStore.dispatch('fetchById', this.$route.params.bid)
  },

  data() {
    return {
      id: this.$route.params.bid
    }
  },

  computed: {
    board() {
      return boardStore.getters.byId(this.id)
    }
  },

  methods: {
  }
}
</script>

<style scoped>

div.main {
  text-align: center;
  margin-top: 20px;
}

div.data {
  display: inline-block;
  width: 100%;
  max-width: 1080px;
}
</style>
