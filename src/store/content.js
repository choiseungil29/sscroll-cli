import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import user from './user'

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
    },

    recent: (state) => () => {
      let contents = JSON.parse(localStorage.getItem('views') || JSON.stringify({ 'views': [] })).views.reverse()
      return contents
    }
  },

  mutations: {
    fetchArray (state, data) {
      for (let content of data) {
        if (state.contents.find(c => c.permanent_id == content.permanent_id)) {
          continue
        }
        console.log(content)
        state.contents.push(content)
      }
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
    },

    reset (state) {
      state.contents = []
    }
  },

  actions: {
    fetchRandom (context) {
      let views = JSON.parse(localStorage.getItem('views') || JSON.stringify({ 'views': [] }))
      console.log(views)
      let convertViews = { 'views': [] }
      for (let item of views.views) {
        convertViews.views.push(item.permanent_id)
      }
      convertViews = JSON.stringify(convertViews)
      axios.get(`/api/fill`, { params: { 'views': convertViews } })
        .then((res) => {
          console.log('fill array')
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
      console.log(user.getters.isLogin())
      if (!user.getters.isLogin()) {
        let item = context.getters.byId(pid)
        let views = JSON.parse(localStorage.getItem('views') || JSON.stringify({ 'views': [] }))
        views.views.push(item)
        localStorage.setItem('views', JSON.stringify(views))
        return
      }

      axios.get('/api/view', { params: { pid: pid } })
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },

    reset (context) {
      context.commit('reset')
      context.dispatch('fetchRandom')
    },

    removeByPid (context, pid) {
      context.dispatch('viewContent', pid)
      context.commit('removeByPid', pid)
      console.log(context.state.contents.length)
      if (context.state.contents.length < 3) {
        context.dispatch('fetchRandom')
      }
    }
  }
})

export default contentStore
