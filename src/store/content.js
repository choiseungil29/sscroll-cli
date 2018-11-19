import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const contentStore = new Vuex.Store({
  state: {
    contents: []
  },

  getters: {
    byId: (state) => (pid) => {
      let content = state.contents.find(c => c.permanent_id == pid)
      return content
    },

    index: (state) => (pid) => {
      let content = state.contents.find(c => c.permanent_id == pid)
      return state.contents.indexOf(content)
    }
  },

  mutations: {
    fetchArray (state, data) {
      state.contents = state.contents.concat(data)
      console.log(state.contents)
    },

    fetch (state, data) {
      if (state.contents.find(c => c.permanent_id == data.permanent_id)) {
        return
      }
      state.contents = state.contents.concat(data)
    },

    removeByPid (state, pid) {
      let content = state.contents.find(c => c.permanent_id == pid)
      if (content != null) {
        console.log(content)
        console.log(state.contents.indexOf(content))
        state.contents.splice(state.contents.indexOf(content), 1)
      }
    }
  },

  actions: {
    fetchRandom (context) {
      axios.get(`/api/fill`)
        .then((res) => {
          console.log('fetched')
          context.commit('fetchArray', res.data)
        }).catch((err) => {
          console.log('err')
          console.log(err)
        })
    },

    fetchById (context, pid) {
      if (context.state.contents.find(c => c.permanent_id == pid)) {
        return
      }
      axios.get(`/api/${pid}`)
        .then((res) => {
          context.commit('fetch', res.data)
        }).catch((err) => {
          console.log('err')
          console.log(err)
        })
    }
  }
})

export default contentStore
