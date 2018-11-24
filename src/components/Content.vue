<template>
  <carousel :per-page="1" :pagination-size="0" :center-mode="true" :min-swipe-distance="150" @pageChange="pageChange" ref="carousel">
    <!-- <slide>
      <div class="data container section" :class="{ gray: index%2 == 0 }">
	와드(예정)
      </div>
    </slide> -->
    <slide>
    <div :id="content.permanent_id" class="data container section" v-if="content" :class="{ gray: index%2 == 0 }" :ref="content.permanent_id">
      <h3>{{ content.title }}</h3>
      <button id='ward' class="btn btn-primary">와드</button>
      <button id='link' v-on:click="link" :data-pid="content.permanent_id" class="btn btn-primary">링크 복사</button>
      <button id='next' v-on:click="next" :data-pid="content.permanent_id" class="btn btn-primary">거르기</button>
      <div class="row">
	<div class="col" v-html="content.data">
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
      <div class="data container section" :class="{ gray: index%2 == 0 }">
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
  },

  mounted() {
    $(window).scroll((event) => {
      if (this.viewed) {
        return
      }
      let y = event.currentTarget.scrollY
      let clientRect = this.$refs[this.pid].getBoundingClientRect()
      if (-clientRect.y > clientRect.height) {
        this.viewed = true
        contentStore.dispatch('viewContent', this.pid)
        // this.pid를
      }
    })

    $(window).touchstart(event => {
      this.$refs.carousel.mouseDrag = false
    }

    $(window).touchend(event => {
      this.$refs.carousel.mouseDrag = true   
    })
  },

  data() {
    return {
      viewed: false
    }
  },

  computed: {
    content() {
      return contentStore.getters.byId(this.pid)
    },

    index() {
      return contentStore.getters.index(this.pid)
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
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }

      copyText(window.location.href + event.currentTarget.getAttribute('data-pid'))
    },

    next(event) {
      VueScrollTo.scrollTo('#' + CSS.escape(this.pid), 0)
      this.viewed = true
      contentStore.dispatch('removeByPid', this.pid)
    },

    pageChange(currentPage) {
      if (currentPage == 1) {
	setTimeout(this.next, 500)
      }
      /* if (currentPage == 0) {
	this.ward(null)
      } else if (currentPage == 1) {
	// window.navigator.vibrate(200);
	setTimeout(this.next, 500)
	// 여기에 vibrate API 적용할수 있으면 손맛좋을듯
      } */
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
  max-width: 1080px;
  height: 100%;
  padding-top: 2rem;
  background-color: white;
}

* /deep/ img {
  max-width: 100%;
  width: 100%;
  height: auto;
}

* /deep/ iframe {
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
