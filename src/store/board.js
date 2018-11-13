import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const boardStore = new Vuex.Store({
  state: {
    boards: []
  },

  getters: {
    byId: (state) => (id) => {
      let board = state.boards.find(b => b.id == id)
      return board
    }
  },

  mutations: {
    loadOne (state, data) {
      if (state.boards.find(b => b.id == data.id)) {
        return
      }
      state.boards.push(data)
    },

    sort (state) {
      state.boards = state.boards.sort((a, b) => {
        if (a.created_at > b.created_at) {
          return 1
        } else if (a.created_at < b.created_at) {
          return -1
        }
        return 0
      })
    }
  },

  actions: {
    fetchAll (context) {
      axios.get('/api/board')
        .then((res) => {
          for (let b of res.data) {
            context.commit('loadOne', b)
          }
          context.commit('sort')
        }).catch((err) => {
          console.log('err')
          console.log(err)
        })
    },

    fetchById (context, id) {
      axios.get('/api/board', { params: { id: id } })
        .then((res) => {
          context.commit('loadOne', res.data[0])
          context.commit('sort')
        }).catch((err) => {
          console.log('err')
          console.log(err)
        })
    }
  }
})

export default boardStore
