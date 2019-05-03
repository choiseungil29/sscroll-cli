<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-distance="480" class="main" style="background-color: #CFCFCF;">
    <div v-for="content in contents" :key="content.permanent_id">
      <div style="height: 100%;">
        <Content :pid="content.permanent_id" />
      </div>
    </div>
  </div>
</template>

<script>
import contentStore from '../store/modules/contents'
import * as actions from '../store/modules/contents/types';
import * as getters from '../store/modules/contents/getters';

import userStore from '../store/modules/users';
import * as userActions from '../store/modules/users/types';
import * as userGetters from '../store/modules/users/getters';

import Content from './Content'

export default {
  name: 'Contents',

  components: {
    Content
  },


  data() {
    return {
      minHeight: window.innerHeight,
      init: false
    }
  },

  computed: {
    ...contentStore.mapGetters({ contents: getters.ALL_CONTENTS })
    // ...contentStore.mapState({ contents: state => state.contents }),
  },

  methods: {
    ...contentStore.mapActions([actions.FETCH, actions.FETCH_ALL]),
    ...userStore.mapActions([userActions.FETCH]),

    loadMore() {
      console.log('load More');
      this[actions.FETCH_ALL]();
    }
  },

  created() {
    this[userActions.FETCH]();
    if (this.$route.params.pid) {
      this[actions.FETCH](this.$route.params.pid);
    }
    this[actions.FETCH_ALL]();
  },
};
</script>

<style scoped>

div.main {
  margin-top: 50px;
}

hr {
  height: 6px;
  border: 0;
  margin: 0;
}
</style>
