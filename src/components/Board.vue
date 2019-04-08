<template>
  <Content :pid="this.id" />
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
  text-align: center;
  margin-top: 20px;
}

div.data {
  display: inline-block;
  width: 100%;
  max-width: 1080px;
}
</style>
