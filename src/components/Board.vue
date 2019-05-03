<template>
  <div class="main">
    <Content :pid="this.id" />
  </div>
</template>

<script>
import Content from './Content';

export default {
  name: 'Board',

  components: {
    Content
  },

  created() {
  },

  data() {
    return {
      id: this.$route.params.bid
    }
  },

  computed: {
    board() {
    }
  },

  methods: {
  }
}
</script>

<style scoped>

div.main {
  margin-top: 50px;
  background-color: rgb(207, 207, 207);
  height: 100%;
}
</style>
