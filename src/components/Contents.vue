<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-distance="1920">
    <div v-for="content in contents">
      <Content :pid="content.permanent_id" />
      <hr>
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
  },

  methods: {
    loadMore() {
      contentStore.dispatch('fetchRandom')
      this.minHeight = window.innerHeight - $('nav#header').height()
    }
  },

  mounted() {
    $(window).scroll((event) => {
      console.log('scroll')
    })

  }

};
</script>

<style scoped>
hr {
  height: 6px;
  background: url(http://ibrahimjabbari.com/english/images/hr-11.png) repeat-x 0 0;
  border: 0;
}
</style>
