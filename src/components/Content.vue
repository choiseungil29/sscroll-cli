<template> 
<carousel :per-page="1" :pagination-size="0" :center-mode="true" :min-swipe-distance="80" @pageChange="pageChange" :mouseDrag="mouseDrag" ref="carousel">
    <!-- <slide>
      <div class="data container section" :class="{ gray: index%2 == 0 }">
	와드(예정)
      </div>
    </slide> -->
  <slide>
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
            <!-- <tr v-for="comment in content.comments">
              <th scope="row" style="text-align: left;">{{ comment.data }}</th>
            </tr> -->
            <tr v-for="comment in comments">
              <th scope="row" style="text-align: left;">{{ comment.data }}</th>
            </tr>
            <tr>
              <td style="padding: 0 0 0 0;"><button type="button" class="btn btn-primary" style="width: 100%; height: 100%; min-height: 3rem; padding: 0 0 0 0; margin: 0 0 0 0; border-top-left-radius: 0; border-top-right-radius: 0;" @click="loadComment">댓글 더 보기</button></td>
              </tr>
          </tbody>
        </table>
        <div id="ad" style="display: flex; justify-content: center;">
        </div>
      </div>

      <!-- <div class="comments">
	<div class="input-group">
	  <input id="comment" type="text" class="form-control" placeholder="댓글">
	  <span class="input-group-btn">
	    <button id="addComment" class="btn btn-primary btn-block" style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;" type="button">작성</button>
	  </span>
	</div>
      </div> -->
    </div>
    </slide>
    <slide>
      <div class="data container section">
	게시물 넘기기
      </div>
    </slide>
  </carousel>
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
        $(`div#${this.pid} #ad`).appendChild('<iframe width="320" height="100" allowtransparency="true" src="http://mtab.clickmon.co.kr/pop/wp_m_320_100.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1049535%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL" frameborder="0" scrolling="no"></iframe>')
        console.log('mobile');
      } else {
        $(`div#${this.pid} #ad`).append('<iframe width="728" height="90" allowtransparency="true" src="http://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1049535%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL" frameborder="0" scrolling="no"></iframe>')
        console.log('desktop');
      } 
    }
  },

  mounted() {
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
      comment_length: 5
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
