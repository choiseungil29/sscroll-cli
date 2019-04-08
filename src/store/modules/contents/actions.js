import * as actions from './types';
import axios from 'axios';

export default {
  [actions.FETCH]({ commit }, payload) {
    commit(actions.FETCH, payload)
  },

  [actions.FETCH_ALL]({ commit }) {
    axios.get(`/api/fill`)
      .then(res => {
        commit(actions.FETCH_ALL, res.data)
      }).catch(err => console.log(err))
  },
}