<template>
  <div class="box" :class='{ child: isChild }'>
    <div class='text' :class='{ child: isChild }'>
      <p class='title'><img v-if="isChild" style="width: auto; margin-right: 10px;" src="https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-reply.png">{{ comment.user.nickname }}</p>
      <p class='description' :style="{ marginLeft: childMargin }">{{ comment.data }}</p>
      <div :style="{ marginLeft: childMargin }" style="padding-bottom: 16px;">
        <span class='date'>{{ comment.date }}</span>
        <span v-if="!isChild" style="float: right; font-size: 12px;" @click="visibilityComment">답글 달기</span>
      </div>
      <!-- <el-button v-on:click="visibilityComment">댓댓 달기</el-button> -->
      
    </div>
    <Comment v-for="child in comment.children" :isChild="true" :comment="child" :key="child.id" />
    <div class="input-place" :class="{ visible: !visibility }">
      <el-input placeholder="답글을 입력해주세요" v-model="commentData" class="input-with-select add-comment" >
        <el-button slot="append" v-on:click="addComment">등록</el-button>
      </el-input>
    </div>
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

  mounted() {
  },

  data() {
    return {
      visibility: false,
      commentData: '',
    }
  },

  computed: {
    childMargin() {
      if (this.isChild) {
        return '14px';
      }
      return '0px;'
    }
  },

  methods: {
    ...contentStore.mapActions([actions.WRITE_COMMENT]),

    visibilityComment(e) {
      this.visibility = !this.visibility;
      if (this.visibility) {
        // this.commentData = '@' + this.comment.user.nickname + ' ';
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

<style lang="scss" scoped>

.box {
  border-top: 1px solid #bbbbbb80;

}

.box .text {
  margin-left: 20px;
  margin-right: 20px;
}

.box .child {
  background-color: #f5f5f5;
  padding-left: 5px;
  margin-left: 0;
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

span.date {
  font-size: 12px;
  color: black;
  opacity: 0.5;
  margin-bottom: 0;
}

.visible {
  display: none;
}

.add-comment {
  // width: 100%;
  /*padding-left: 10px;
  padding-right: 10px; */
  // padding-bottom: 15px;
  // display: inline;
}

.add-comment /deep/ input {
  border: 1px solid #15151580;
}

.add-comment /deep/ div {
  border: 1px solid transparent;
  border-left: none;
  background-color: #15151580;
  color: white;
}

div.input-place {
  border-top: 1px solid #bbbbbb80;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #f0f0f0;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
