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
    contentStore.dispatch('fetchById', this.pid)
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
    }
  }
}
</script>

<style scoped>
button#ward {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

div.data {
  width: 100%;
  max-width: 1080px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

* >>> img {
  max-width: 100%;
  width: 100%;
  height: auto;
}

button.btn-primary {
  margin-left: 15px;

}
</style>
