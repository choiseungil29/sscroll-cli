<template> 
  <div>
    <div class="main-box container">
      <div :id="content.permanent_id" class="data container" :class="{ expand: isExpand }" :style="expandStyle" v-if="content">
        <div ref="contentBox">
          <p class="title">{{ content.title }}</p>
          <span class="writer">{{ content.user.nickname }}</span>
          <span class="created-at">{{ content.date }}</span>
          <div class="row content">
            <div class="col" v-html="content.data">
            </div>
          </div>
          <div style="display: flex; justify-content: center; margin-bottom:20px;">
            <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
          </div>
          <el-button plain v-on:click="link" class="btn btn-primary">Copy Link</el-button>
          <el-button plain v-on:click="like" class="btn btn-primary">좋아요 {{ this.likesCount }}</el-button>
          <el-button plain v-on:click="unlike" class="btn btn-primary">싫어요 {{ this.unlikesCount }}</el-button>

          <div class="comments">
            <Comment :comment="comment" v-for="comment in comments" :key="comment.id" />
            <el-input placeholder="댓글" v-model="commentData" class="input-with-select">
              <el-button slot="append" icon="el-icon-circle-plus-outline" v-on:click="addComment"></el-button>
            </el-input>
            <el-button icon="el-icon-circle-plus-outline" v-on:click="loadComment">댓글 더 보기</el-button>
            <div style="display: flex; justify-content: center; margin-top: 15px;">
              <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="!isExpand">
        <div plain v-on:click="open" class="btn load-more">
          <div class="btn-load-more"><span>더 보기 <i class="fas fa-xs fa-chevron-down"></i></span></div>
          <div plain v-on:click="link" class="btn btn-primary link"><span><i class="fas fa-md fa-paperclip"></i> Copy Link</span></div>
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
      }
    }
  },

  mounted() {
    console.log(`seconds ${this.getAnimationSeconds()}`);
    this.expandStyle.transition = `all ${this.getAnimationSeconds()}s`;
  },

  computed: {
    ...contentStore.mapGetters([getters.BY_ID]),

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
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
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
  margin-top: 2rem;
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
  padding: 20px;
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
</style>
