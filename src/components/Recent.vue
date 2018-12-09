<template>
  <div>
    <div class="main">
      <div class="data">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" style="text-align: left;">제목</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in contents" :key="content.pid">
              <th scope="row" style="text-align: left;">
                <router-link :to="{ name: 'content', params: { pid: content.permanent_id } }">{{ content.title }}</router-link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import contentStore from "../store/content"

export default {
  name: 'Recent',

  created() {
    this.contents = contentStore.getters.recent()
  },

  computed: {
  },

  data() {
    return {
      contents: []
    }
  }
}
</script>

<style scoped>
table {
  background-color: white

}

div.main {
  text-align: center;
}

div.data {
  display: inline-block;
  width: 100%;
  max-width: 1080px;
}
</style>
