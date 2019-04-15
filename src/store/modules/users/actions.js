import * as actions from './types';
import axios from 'axios';

export default {
  [actions.FETCH]({ commit }) {
    axios.get(`/api/users`)
      .then(res => {
        commit(actions.FETCH, res.data);
      })
  }
}