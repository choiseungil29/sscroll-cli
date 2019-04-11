<template>
  <div class="box">
    <div>
      <p>작성자: {{ comment.user.nickname }}</p>
      <p>{{ comment.data }} {{ comment.date }}</p>
      <el-button v-on:click="visibilityComment">댓댓 달기</el-button>
      <el-input ref="commentBox" type="text" placeholder="댓글" v-model="commentData" class="input-with-select" :class="{ visible: !visibility }">
        <el-button slot="append" icon="el-icon-circle-plus-outline" v-on:click="addComment"></el-button>
      </el-input>
    </div>
    <Comment v-for="child in comment.children" :comment="child" :key="child.id" />
  </div>
</template>

<script>
import contentStore from '../store/modules/contents';
import * as actions from '../store/modules/contents/types';

export default {
  name: 'Comment',

  props: {
    comment: {
      type: Object
    }
  },

  created() {
  },

  data() {
    return {
      visibility: false,
      commentData: ''
    }
  },

  methods: {
    ...contentStore.mapActions([actions.WRITE_COMMENT]),

    visibilityComment(e) {
      this.visibility = !this.visibility;
      if (this.visibility) {
        this.commentData = '@' + this.comment.user.nickname + ' ';
      } else {
        this.commentData = '';
      }
    },

    addComment(e) {
      if (this.commentData.length <= 0) {
        alert('댓글 내용을 작성해주세요!');
      }

      this[actions.WRITE_COMMENT]({ contentPid: this.comment.content_pid, commentData: this.commentData, parentId: this.comment.parent_id || this.comment.id });
      this.commentData = '';
    }
  }
}
</script>

<style scoped>

.box {
  border: 1px solid blue;
  padding-left: 10px;
}

.visible {
  display: none;
}

</style>
