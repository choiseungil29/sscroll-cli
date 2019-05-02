<template>
  <div>
    <div class="main">
      <div class="data">
        <v-tabs v-model="active" color="#0b9ef2" dark slider-color="transparent" height="38px">
          <v-tab :key="viewed" ripple>
            최근 본
          </v-tab>
          <v-tab :key="likes" ripple>
            좋아요
          </v-tab>
          <v-tab :key="unlikes" ripple>
            싫어요
          </v-tab>
          <v-tab :key="contents" ripple>
            작성글
          </v-tab>
          <!-- <v-tab :key="comments" ripple>
            댓글
          </v-tab> -->
          <v-tab-item :key="viewed">
            <div v-for="board in user.recent" :key="board.id" style="padding-left: 20px; padding-right: 20px;">
              <router-link :to="{ name: 'board', params: { bid: board.content.permanent_id } }">
                <div style="text-align: left; padding-top: 15px;">
                  <span style="font-size: 16px; color: #161616;">{{ board.content.title }}</span>
                  <span style="margin-left: 6px;"><img src="https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-chat.png" class='icon'> {{ board.content.comments_length }}</span>
                </div>
                <div style="text-align: left; padding-bottom: 16px; border-bottom: 1px solid #bbbbbb;">
                  <span style="color: rgba(21, 21, 21, 0.5);">{{ board.content.date }}</span>
                  <span style="color: rgba(21, 21, 21, 0.5); margin-left: 19px;">조회 {{ board.content.viewed }}</span>
                </div>
              </router-link>
            </div>
            <!-- <v-card-text v-for="c in user.recent" :key="c.id">{{ c.content.title }}</v-card-text> -->
          </v-tab-item>
          <v-tab-item :key="likes">
            <div v-for="c in user.likes" :key="c.id" style="padding-left: 20px; padding-right: 20px;">
              <router-link :to="{ name: 'board', params: { bid: c.permanent_id } }">
                <div style="text-align: left; padding-top: 15px;">
                  <span style="font-size: 16px; color: #161616;">{{ c.title }}</span>
                  <span style="margin-left: 6px;"><img src="https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-chat.png" class='icon'> {{ c.comments_length }}</span>
                </div>
                <div style="text-align: left; padding-bottom: 16px; border-bottom: 1px solid #bbbbbb;">
                  <span style="color: rgba(21, 21, 21, 0.5);">{{ c.date }}</span>
                  <span style="color: rgba(21, 21, 21, 0.5); margin-left: 19px;">조회 {{ c.viewed }}</span>
                </div>
              </router-link>
            </div>
          </v-tab-item>
          <v-tab-item :key="unlikes">
            <div v-for="c in user.unlikes" :key="c.id" style="padding-left: 20px; padding-right: 20px;">
              <router-link :to="{ name: 'board', params: { bid: c.permanent_id } }">
                <div style="text-align: left; padding-top: 15px;">
                  <span style="font-size: 16px; color: #161616;">{{ c.title }}</span>
                  <span style="margin-left: 6px;"><img src="https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-chat.png" class='icon'> {{ c.comments_length }}</span>
                </div>
                <div style="text-align: left; padding-bottom: 16px; border-bottom: 1px solid #bbbbbb;">
                  <span style="color: rgba(21, 21, 21, 0.5);">{{ c.date }}</span>
                  <span style="color: rgba(21, 21, 21, 0.5); margin-left: 19px;">조회 {{ c.viewed }}</span>
                </div>
              </router-link>
            </div>
          </v-tab-item>
          <v-tab-item :key="contents">
            <div v-for="c in user.contents" :key="c.id" style="padding-left: 20px; padding-right: 20px;">
              <router-link :to="{ name: 'board', params: { bid: c.permanent_id } }">
                <div style="text-align: left; padding-top: 15px;">
                  <span style="font-size: 16px; color: #161616;">{{ c.title }}</span>
                  <span style="margin-left: 6px;"><img src="https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-chat.png" class='icon'> {{ c.comments_length }}</span>
                </div>
                <div style="text-align: left; padding-bottom: 16px; border-bottom: 1px solid #bbbbbb;">
                  <span style="color: rgba(21, 21, 21, 0.5);">{{ c.date }}</span>
                  <span style="color: rgba(21, 21, 21, 0.5); margin-left: 19px;">조회 {{ c.viewed }}</span>
                </div>
              </router-link>
            </div>
          </v-tab-item>
          <!-- <v-tab-item :key="comments">
            <v-card-text v-for="c in user.comments" :key="c.id">{{ c.data }}</v-card-text>
          </v-tab-item> -->
        </v-tabs>
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
