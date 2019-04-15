<template>
  <div>
    <div class="main">
      <el-input placeHolder="게시물 제목" v-model="title" class="input" />
      <editor :options="editorOptions" mode="wysiwyg" ref="tuiEditor" />
      <el-button v-on:click="addBoard">게시</el-button>
    </div>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import Editor from '@toast-ui/vue-editor/src/Editor.vue';

import contentStore from '../store/modules/contents';
import * as actions from '../store/modules/contents/types';

export default {
  name: 'BoardCreate',

  components: {
    'editor': Editor
  },

  created() {
    console.log('what')
  },

  data() {
    return {
      title: '',
      editorOptions: {
        hideModeSwitch: true,
        useDefaultHTMLSanitizer: false,
        usageStatistics: false
      },
    }
  },

  computed: {
  },

  methods: {
    ...contentStore.mapActions([actions.WRITE_BOARD]),

    addBoard() {
      console.log(this.title);
      console.log(this.getHtml());

      this[actions.WRITE_BOARD]({ title: this.title, data: this.getHtml() });
      alert('작성이 완료되었습니다.');
      this.$router.push('/boards');
    },

    getHtml() {
      let html = this.$refs.tuiEditor.invoke('getHtml');
      return html;
    }
  }
}
</script>

<style scoped>

div.main {
  text-align: center;
  margin-top: 50px;
}

div.data {
  display: inline-block;
  width: 100%;
  max-width: 1080px;
}
</style>
