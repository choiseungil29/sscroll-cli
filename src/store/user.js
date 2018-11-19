import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const user = new Vuex.Store({
  state: {
    email: null,
    signup_type: null,
    nickname: null
  },

  mutations: {
    login (state, data) {
      state.email = data.email
      state.signup_type = data.signup_type
      state.nickname = data.nickname
    },

    nickname (state, nickname) {
      state.nickname = nickname
    }
  },

  actions: {
    login (context, token) {
      return new Promise((resolve, reject) => {
        axios.post('/api/login', { accessToken: token, loginType: 'NAVER' })
          .then((res) => {
            console.log(res.data)
            context.commit('login', res.data)
            resolve(context.state)
          }).catch((err) => {
            reject(err)
          })
      })
    },

    modifyNickname (context, newNickname) {
      return new Promise((resolve, reject) => {
        axios.post('/api/signup', { nickname: newNickname })
          .then(res => {
            context.commit('nickname', newNickname)
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
})

export default user
