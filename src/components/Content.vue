<template> 
  <div>
    <div class="main-box container">
      <div :id="content.permanent_id" class="data container" :class="{ expand: isExpand }" :style="expandStyle" v-if="content">
        <div ref="contentBox" class='content-box'>
          <p class="title">{{ content.title }}</p>
          <span class="writer">{{ content.user.nickname }}</span>
          <span class="created-at">{{ content.date }}</span>
          <div class="row content">
            <div class="col" v-html="content.data">
            </div>
          </div>
        </div>
        <!-- <div style="display: flex; justify-content: center; margin-bottom:20px;">
          <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
        </div> -->

        <div class='buttons'>
          <div v-on:click="like" class="btn btn-primary direction" :class="{ like: isLike }"><img :src='this.isLike ? this.likeActive : this.likeDeactive' class='icon'/> <span> {{ this.likesCount }}</span></div>
          <div v-on:click="unlike" class="btn btn-primary direction" :class="{ dislike: isDislike }" style="margin-left: 4px;"> <img :src="this.isDislike ? this.dislikeActive : this.dislikeDeactive" class='icon'> <span> {{ this.unlikesCount }}</span></div>
          <div style="width: 100%;">
            <div plain v-on:click="link" class="btn btn-primary copy-link" style='float: right;'><span><i class="fas fa-md fa-paperclip"></i> Copy Link</span></div>
          </div>
        </div>

        <div class="comments">
          <el-input placeholder="댓글을 입력해주세요" v-model="commentData" class="input-with-select add-comment">
            <el-button slot="append" v-on:click="addComment">등록</el-button>
          </el-input>
          <Comment :comment="comment" v-for="comment in comments" :key="comment.id" ></Comment>
          
          <el-button class='load-comment' v-on:click="loadComment">댓글 더 보기</el-button>
          <!-- <div style="display: flex; justify-content: center; margin-top: 15<px;">
            <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
          </div> -->
        </div>
      </div>
      
      <div v-if="!isExpand">
        <div plain v-on:click="open" class="btn load-more">
          <div class="btn-load-more"><span>더 보기 <i class="fas fa-xs fa-chevron-down"></i></span></div>
          <div plain v-on:click="link" class="btn btn-primary link"><span><i class="fas fa-md fa-paperclip"></i> Copy link</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto';
import Comment from './Comment';
import contentStore from '../store/modules/contents';
import * as getters from '../store/modules/contents/getters';
import * as actions from '../store/modules/contents/types';
import userStore from '../store/modules/users';
import * as userGetters from '../store/modules/users/getters';
import * as userActions from '../store/modules/users/types';

import _ from 'lodash';

export default {
  name: 'Content',

  props: {
    pid: {
      type: String
    }
  },

  components: {
    Comment
  },

  created() {
    if (!this.content) {
      this[actions.FETCH](this.pid);
    }

    var filter = "win16|win32|win64|mac|macintel";
    if ( navigator.platform ) {
      if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
        this.width = 320;
        this.height = 100;
        this.adfit_source = 'DAN-1jy4xgkqsrxh4'
        this.source = 'https://mtab.clickmon.co.kr/pop/wp_m_320_100.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1049535%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL'
      } else {
        this.width = 728;
        this.height = 90;
        this.adfit_source = 'DAN-vf6ea3gh500z'
        this.source = 'https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1049535%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL'
      }
    }
  },

  data() {
    return {
      isExpand: false,
      viewed: false,
      comment_length: 5,
      source: '',
      adfit_source: '',
      width: 0,
      height: 0,
      commentData: '',
      expandStyle: {
        maxHeight: '180px',
        transition: 'all 1s',
      },

      likeActive: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-good-s.png',
      likeDeactive: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-good-n.png',
      dislikeActive: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-bad-s.png',
      dislikeDeactive: 'https://s3-ap-northeast-1.amazonaws.com/img.sscroll.net/upload/resources/ic-bad-n.png',
    }
  },

  mounted() {
    this.expandStyle.transition = `all ${this.getAnimationSeconds()}s`;
  },

  computed: {
    ...contentStore.mapGetters([getters.BY_ID, getters.IS_LIKE, getters.IS_DISLIKE]),
    ...userStore.mapGetters([userGetters.USER]),

    content() {
      let c = this[getters.BY_ID](this.pid);
      if (c && c.type.name === 'SSCROLL_BOARD') {
        // this.isExpand = true;
        this.open()
      }
      return c;
    },

    comments() {
      let items = this.full_comments;
      return items.slice(0, this.comment_length);
    },


    likesCount() {
      let item = this[getters.BY_ID](this.pid);
      return item.up + item.ups.length;
    },

    unlikesCount() {
      let item = this[getters.BY_ID](this.pid);
      return item.down + item.downs.length;
    },

    full_comments() {
      return _.orderBy(this.content.comments.filter(c => !c.parent_id), 'created_at', 'asc'); // 1차 댓글만 표현함
    },

    isLike() {
      return this[getters.IS_LIKE](this.pid, this[userGetters.USER].nickname);
    },

    isDislike() {
      return this[getters.IS_DISLIKE](this.pid, this[userGetters.USER].nickname);
    }
  },

  methods: {
    ...contentStore.mapActions([actions.FETCH, actions.FETCH_COMMENTS, actions.WRITE_COMMENT, actions.VIEW_CONTENT, actions.LIKE_CONTENT, actions.UNLIKE_CONTENT]),

    open(event) {
      this.isExpand = true;
      this[actions.FETCH_COMMENTS]({ contentPid: this.pid });
      this[actions.VIEW_CONTENT]({ contentPid: this.pid });
      if (event) {
        let maxHeight = this.$refs.contentBox.getBoundingClientRect().height * 2;
        this.expandStyle.maxHeight = `${maxHeight}px`;
        let expandStyle = this.expandStyle;
        setTimeout((e) => {
          expandStyle.maxHeight = '100%';
        }, this.getAnimationSeconds() * 1000)
      } else {
        this.expandStyle.maxHeight = '100%';
      }
    },

    like(event) {
      this[actions.LIKE_CONTENT]({ contentPid: this.pid })
    },

    unlike(event) {
      this[actions.UNLIKE_CONTENT]({ contentPid: this.pid })
    },

    ward(event) {

    },

    link(event) {
      var copyText = function(x) {
        const el = document.createElement('textarea');
        el.value = x;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          var range = document.createRange();
          range.selectNodeContents(el);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          el.setSelectionRange(0, 999999);
        } else {
          el.select();
        }
        document.execCommand('copy');
        document.body.removeChild(el);

        event.stopPropagation();
      }

      copyText(window.location.host + '/' + this.pid);
    },

    loadComment(event) {
      if (this.full_comments.length < this.comment_length) {
        alert('더이상 불러올 댓글이 없습니다!');
      } else {
        this.comment_length += 5
      }
    },

    addComment(event) {
      if (this.commentData.length <= 0) {
        alert('댓글 내용을 작성해주세요!');
        return;
      }

      this[actions.WRITE_COMMENT]({ contentPid: this.pid, commentData: this.commentData });
      this.commentData = '';
    },

    getAnimationSeconds() {
      let maxHeight = this.$refs.contentBox.getBoundingClientRect().height;
      let seconds = parseInt(maxHeight / 2000) + 1;
      return seconds;
    }
  }
}
</script>

<style lang="scss" scoped>
div.main-box {
  width: 100vw;
  max-width: 800px;
  background-color: white;
  padding-bottom: 2rem;
  padding: 0;
  // box-shadow: 1px 1px 1px #bbbbbb80;
  border-top: 1px #bbbbbb80;
  margin-top: 1px;
}

div.data {
  overflow: auto;
  overflow-y: hidden;
	// transition: all 2s;
}

div.expand {
  max-height: 100%;
}

div.content {
  padding-top: 20px;
}

div.comments {
  margin-top: 15px;
}

* /deep/ img {
  max-width: 100%;
  width: 100%;
  height: auto;
}

* /deep/ .content iframe {
  max-width: 100%;
  width: 100%;
}

button.btn-primary#addComment {
  margin-left: 0px;
}

div.load-more {
  position: relative;
  padding: 0;
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 0;
  // border-top: 1px solid #bbbbbb80;
}

div.btn-load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

div.link {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  bottom: 0;
  top: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  border-radius: 4px;
  border-color: transparent !important;
  background-color: #0b9ef2;
  color: white;
}

div.data {
  padding: 0;
}

div.content-box {
  padding: 20px;
}

div.buttons {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  border-top: 1px solid #bbbbbb80;
  padding-top: 15px;
}

p.title {
  font-size: 24px;
  margin-bottom: 11px;
}

span.writer {
  font-size: 16px;
}

span.created-at {
  font-size: 16px;
  float: right;
}

img.icon {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  max-width: none;
}

div.buttons div.copy-link {
  width: auto;
  height: 30px;
  line-height: 0;
  display: flex;
  align-items: center;
  background-color: #0b9ef2;
  border: none;
}

.add-comment {
  // width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
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

div.buttons .direction {
  display: flex;
  align-items: center;
  line-height: 0;
  min-width: 80px;
  width: auto;
  height: 30px;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: white;
  color: #15151580;
  border: 1px solid #15151580;
  border-radius: 4px;
}

div.buttons .like {
  border: 1px solid #42e00b;
}

div.buttons .dislike {
  border: 1px solid #e11b29;
}

.load-comment {
  width: 100%;
  border-radius: 0;
  border: 1px solid #bbbbbb80;
  border-right: none;
  border-left: none;
  border-bottom: none;
  font-size: 16px;
  padding-top: 17px;
  padding-bottom: 17px;
  color: #0b9ef2;
}
</style>
