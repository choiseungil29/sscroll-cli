<template>
  <div>
    <div class="main">
      <div class="data">
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
          <v-tab :key="viewed" ripple>
            최근 본 게시물
          </v-tab>
          <v-tab :key="likes" ripple>
            내가 좋아한 게시물
          </v-tab>
          <v-tab :key="unlikes" ripple>
            내가 싫어한 게시물
          </v-tab>
          <v-tab :key="comments" ripple>
            내가 작성한 댓글
          </v-tab>
          <v-tab :key="contents" ripple>
            내가 작성한 글
          </v-tab>
          <v-tab-item :key="viewed">
            <v-card-text v-for="c in user.recent" :key="c.id">{{ c.content.title }}</v-card-text>
          </v-tab-item>
          <v-tab-item :key="likes">
            <v-card-text v-for="c in user.likes" :key="c.id">{{ c.title }}</v-card-text>
          </v-tab-item>
          <v-tab-item :key="unlikes">
            <v-card-text v-for="c in user.unlikes" :key="c.id">{{ c.title }}</v-card-text>
          </v-tab-item>
          <v-tab-item :key="comments">
            <v-card-text v-for="c in user.comments" :key="c.id">{{ c.data }}</v-card-text>
          </v-tab-item>
          <v-tab-item :key="contents">
            <v-card-text v-for="c in user.contents" :key="c.id">{{ c.title }}</v-card-text>
          </v-tab-item>
        </v-tabs>
          <!-- <v-tab v-for="n in 3" :key="n" ripple>
            Item {{ n }}
          </v-tab>
          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <v-card-text>모야모야 {{ n }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs> -->
      </div>
    </div>
  </div>
</template>

<script>
import userStore from '../store/modules/users';
import * as actions from '../store/modules/users/types';
import * as getters from '../store/modules/users/getters';


export default {
  name: 'Log',

  created() {
    if (!this[getters.USER]) {
      this[actions.FETCH]();
    }
  },

  computed: {
    ...userStore.mapGetters([getters.USER]),

    user() {
      return this[getters.USER];
    }
  },

  methods: {
    ...userStore.mapActions([actions.FETCH]),
  },

  data() {
    return {
      contents: []
    }
  }
}
</script>

<style scoped>
table {
  background-color: white

}

div.main {
  text-align: center;
  margin-top: 50px;
}

div.data {
  display: inline-block;
  width: 100%;
  max-width: 1080px;
}
</style>
