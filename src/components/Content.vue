<template> 
  <div>
    <div :id="content.permanent_id" class="data container section" :class="{ expand: !isExpand }" v-if="content" ref="contentBox">
      <h3>글 제목 : {{ content.title }}</h3>
      <h5>작성자 : {{ content.user.nickname }}</h5>
      <h5>작성일자 : {{ content.date }}</h5>
      <el-button plain v-on:click="link">링크 복사</el-button>
      <div class="row content">
        <div class="col" v-html="content.data">
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin-bottom:20px;">
        <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
      </div>
      <el-button plain v-on:click="link" class="btn btn-primary">링크 복사</el-button>

      <div class="comments">
        <Comment :comment="comment" v-for="comment in comments" :key="comment.id" />
        <el-input placeholder="댓글" v-model="commentData" class="input-with-select">
          <el-button slot="append" icon="el-icon-circle-plus-outline" v-on:click="addComment"></el-button>
        </el-input>
        <div style="display: flex; justify-content: center; margin-top: 15px;">
          <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
        </div>
      </div>
    </div>
    
    <el-button plain v-on:click="open" v-if="!isExpand" class="btn btn-primary">더 보기</el-button>
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
    console.log(this.content)
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

  mounted() {

    const v = this;
    $(window).scroll((event) => {
      if (this.viewed) {
        return
      }

      if (this.$refs.contentBox == null) {
        return
      }

      let y = event.currentTarget.scrollY
      let clientRect = this.$refs.contentBox.getBoundingClientRect()
      if (-clientRect.y > clientRect.height) {
        this.viewed = true
      }
    })

    
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
      commentData: ''
    }
  },

  computed: {
    ...contentStore.mapGetters([getters.BY_ID]),

    content() {
      let c = this[getters.BY_ID](this.pid);
      if (c && c.type.name === 'SSCROLL_BOARD') {
        this.isExpand = true;
      }
      return c;
    },

    comments() {
      return _.orderBy(this.content.comments.filter(c => !c.parent_id), 'created_at', 'asc'); // 1차 댓글만 표현함
    },
  },

  methods: {
    ...contentStore.mapActions([actions.FETCH, actions.WRITE_COMMENT]),

    open(event) {
      this.isExpand = true;
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
      }
      if (window.location.href.includes(this.pid)) {
        copyText(window.location.href);
      } else {
        copyText(window.location.href + this.pid)
        console.log(window.location.href);
      }
    },

    loadComment(event) {
      if (this.comments.length < this.comment_length) {
        alert('더이상 불러올 댓글이 없습니다!')
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
    }
  }
}
</script>

<style lang="scss" scoped>
button#ward {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

div.data {
  width: 100vw;
  max-width: 800px;
  height: 100%;
  background-color: white;
  padding-bottom: 2rem;
}

div.expand {
  height: 300px;
  overflow: auto;
  overflow-y: hidden;
}

div.content {
  padding-top: 2rem;
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

.gray {
  background-color: white;
}
</style>
