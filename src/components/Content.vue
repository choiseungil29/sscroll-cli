<template> 
    <!-- <slide>
      <div class="data container section" :class="{ gray: index%2 == 0 }">
	와드(예정)
      </div>
    </slide> -->
  <div :id="content.permanent_id" class="data container section" v-if="content" ref="contentBox">
    <h3>{{ content.title }}</h3>
    <!-- <button class="btn btn-primary">와드</button> -->
    <button v-on:click="link" class="btn btn-primary">링크 복사</button>
    <button v-on:click="next" :data-pid="content.permanent_id" class="btn btn-primary">거르기</button>
    <div class="row content">
      <div class="col" v-html="content.data">
      </div>
    </div>
    <!-- <button class="btn btn-primary">와드</button> -->
    <div style="display: flex; justify-content: center; margin-bottom:20px;">
      <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
    </div>
    <button v-on:click="link" class="btn btn-primary">링크 복사</button>
    <button v-on:click="next" :data-pid="content.permanent_id" class="btn btn-primary">거르기</button>

    <div class="comments">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" style="text-align: left;">댓글</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments">
            <th scope="row" style="text-align: left;" v-if="comment.data != ''">{{ comment.data }}</th>
          </tr>
          <tr>
            <td style="padding: 0 0 0 0;"><button type="button" class="btn btn-primary" style="width: 100%; height: 100%; min-height: 3rem; padding: 0 0 0 0; margin: 0 0 0 0; border-top-left-radius: 0; border-top-right-radius: 0;" @click="loadComment">댓글 더 보기</button></td>
          </tr>
        </tbody>
      </table>
      <div style="display: flex; justify-content: center;">
        <iframe class="ad" :width="this.width" :height="this.height" allowtransparency="true" :src="this.source" frameborder="0" scrolling="no"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import contentStore from '../store/content'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Content',

  props: {
    pid: {
      type: String
    }
  },

  components: {
    Carousel,
    Slide
  },

  created() {
    contentStore.dispatch('fetchById', this.pid)

    var filter = "win16|win32|win64|mac|macintel";
    if ( navigator.platform ) {
      if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
        this.width = 320;
        this.height = 100;
	this.adfit_source = 'DAN-1jy4xgkqsrxh4'
        this.source = 'https://mtab.clickmon.co.kr/pop/wp_m_320_100.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1049535%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL'
        console.log('mobile');
      } else {
        this.width = 728;
        this.height = 90;
	this.adfit_source = 'DAN-vf6ea3gh500z'
        this.source = 'https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1049535%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL'
        console.log('desktop');
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
        contentStore.dispatch('viewContent', this.pid)
      }
    })

    $(window).bind('touchstart', event => {
      console.log('touch start')
      this.mouseDrag = false
    })

    $(window).bind('touchend', event => {
      console.log('touch end')
      this.mouseDrag = true
    })
  },

  data() {
    return {
      viewed: false,
      mouseDrag: true,
      comment_length: 5,
      source: '',
      adfit_source: '',
      width: 0,
      height: 0
    }
  },

  computed: {
    content() {
      return contentStore.getters.byId(this.pid)
    },

    index() {
      return contentStore.getters.index(this.pid)
    },

    comments() {
      return this.content.comments.slice(0, this.comment_length)
    }
  },

  methods: {
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

      copyText(window.location.href + this.pid)
    },

    next(event) {
      VueScrollTo.scrollTo('#' + CSS.escape(this.pid), 0, { offset: -56 })
      this.viewed = true
      contentStore.dispatch('removeByPid', this.pid)
    },

    loadComment(event) {
      if (this.comments.length < this.comment_length) {
        alert('더이상 불러올 댓글이 없습니다!')
      } else {
        this.comment_length += 5
      }
    },

    pageChange(currentPage) {
      if (currentPage == 1) {
        setTimeout(this.next, 500)
      }
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
  padding-top: 2rem;
  background-color: white;
  padding-bottom: 2rem;
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

button.btn-primary {
  margin-left: 15px;
}

button.btn-primary#addComment {
  margin-left: 0px;
}

.gray {
  background-color: white;
}
</style>
