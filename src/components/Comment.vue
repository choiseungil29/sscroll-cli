<template>
  <div class="box">
    <p>{{ comment.user.nickname }}</p>
    <p>{{ comment.data }} {{ comment.date }}</p>
    <Comment v-for="child in comment.children" :comment="child" :key="child.id" />
  </div>
</template>

<script>

export default {
  name: 'Comment',

  props: {
    comment: {
      type: Object
    }
  },

  created() {
  }
}
</script>

<style scoped>

.box {
  border: 1px solid blue;
  margin-left: 10px;
}

</style>
