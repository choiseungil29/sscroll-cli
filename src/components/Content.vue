<template>
  <div class="data container section" v-if="content">
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
</template>

<script>
import contentStore from '../store/content'

export default {
  name: 'Content',

  props: {
    pid: {
      type: String
    }
  },

  created() {
    console.log('created content vue')
    contentStore.dispatch('fetchById', this.pid)
  },

  mounted() {
    $(window).scroll((event) => {
      console.log(event.currentTarget.scrollY)
    })
  },

  data() {
    return {
    }
  },

  computed: {
    content() {
      return contentStore.getters.byId(this.pid)
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
      let pid = event.currentTarget.getAttribute('data-pid')
      contentStore.commit('removeByPid', pid)
    },

    viewed(event) {

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
  width: 100%;
  max-width: 1080px;
  padding-top: 2rem;
  margin-bottom: 2rem;
}

* /deep/ img {
  max-width: 100%;
  width: 100%;
  height: auto;
}

* /deep/ iframe {
  max-width: 100%;
  width: 100%;
  height: auto;
}

button.btn-primary {
  margin-left: 15px;
}

button.btn-primary#addComment {
  margin-left: 0px;
}

</style>
