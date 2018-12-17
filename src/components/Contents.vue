<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-distance="1920" class="main">
    <div v-for="content in contents" :key="content.permanent_id">
      <div style="height: 100%;">
        <Content :pid="content.permanent_id" />
      </div>
    </div> 
  </div>
</template>

<script>
import contentStore from '../store/content'
import Content from './Content'

export default {
  name: 'Contents',

  components: {
    Content
  },

  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function () {
      return {
        inner: '메인'
      }
    },
    meta: [
      { name: 'description', content: '쓰크롤 메인', id: 'desc' }
    ]
  },

  data() {
    return {
      minHeight: window.innerHeight
    }
  },

  computed: {
    contents() {
      return contentStore.state.contents
    }
  },

  created() {
    if (this.$route.params.pid) {
      contentStore.dispatch('fetchById', this.$route.params.pid)
    }
  },

  methods: {
    loadMore() {
      contentStore.dispatch('fetchRandom')
      this.minHeight = window.innerHeight - $('nav#header').height()
    }
  },
};
</script>

<style scoped>
hr {
  height: 6px;
  /* background: url(http://ibrahimjabbari.com/english/images/hr-11.png) repeat-x 0 0; */
  border: 0;
  margin: 0;
}
</style>
