<template>
  <div class="box" :class='{ child: isChild }'>
    <div class='text'>
      <p class='title'>{{ comment.user.nickname }}</p>
      <p class='description'>{{ comment.data }}</p>
      <p class='date'>{{ comment.date }}</p>
      <!-- <el-button v-on:click="visibilityComment">댓댓 달기</el-button> -->
      <el-input ref="commentBox" type="text" placeholder="댓글" v-model="commentData" class="input-with-select" :class="{ visible: !visibility }">
        <el-button slot="append" icon="el-icon-circle-plus-outline" v-on:click="addComment"></el-button>
      </el-input>
    </div>
    <Comment v-for="child in comment.children" :isChild='true' :comment="child" :key="child.id" />
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
    },

    isChild: {
      type: Boolean,
      default: false
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
  border-top: 1px solid #bbbbbb80;

}

.box .text {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 16px;
}

.box .child {
  background-color: #f5f5f5;
}

p.title {
  font-size: 14px !important;
  margin-top: 14px;
  color: #0b9ef2;
}

p.description {
  font-size: 12px;
  margin-top: 14px;
  color: #151515;
}

p.date {
  font-size: 12px;
  color: black;
  opacity: 0.5;
  margin-bottom: 0;
}

.visible {
  display: none;
}

</style>
