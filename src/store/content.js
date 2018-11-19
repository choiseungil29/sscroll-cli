import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const contentStore = new Vuex.Store({
  state: {
    contents: []
  },

  getters: {

    /*
     * pid로 object를 찾아줌.
     */
    byId: (state) => (pid) => {
      let content = state.contents.find(c => c.permanent_id == pid)
      return content
    },

    /*
     * pid에 해당하는 object의 index 반환.
     */
    index: (state) => (pid) => {
      let content = state.contents.find(c => c.permanent_id == pid)
      return state.contents.indexOf(content)
    }
  },

  mutations: {
    fetchArray (state, data) {
      state.contents = state.contents.concat(data)
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
        state.contents.splice(state.contents.indexOf(content), 1)
      }
    }
  },

  actions: {
    fetchRandom (context) {
      axios.get(`/api/fill`)
        .then((res) => {
          context.commit('fetchArray', res.data)
        }).catch((err) => {
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
          console.log(err)
        })
    },

    viewContent (context, pid) {
      axios.get('/api/view', { params: { pid: pid }})
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }
  }
})

export default contentStore
