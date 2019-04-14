import * as actions from './types';
import axios from 'axios';

export default {
  [actions.FETCH]({ commit }, pid) {
    axios.get(`/api/contents/${pid}`)
      .then(res => {
        commit(actions.FETCH, res.data);
      }).catch(err => console.log(err));
  },

  [actions.FETCH_ALL]({ commit }) {
    axios.get(`/api/contents`)
      .then(res => {
        commit(actions.FETCH_ALL, res.data);
      }).catch(err => console.log(err));
  },

  [actions.FETCH_COMMENTS]({ commit }, {contentPid }) {
    axios.get(`/api/contents/${contentPid}/comments`)
      .then(res => {
        commit(actions.FETCH_COMMENTS, { contentPid: contentPid,  items: res.data });
      }).catch(err => console.log(err));
  },

  [actions.WRITE_COMMENT]({ commit }, { contentPid, commentData, parentId }) {
    axios.post(`/api/comment`, { comment: commentData, content_pid: contentPid, parent_id: parentId })
      .then(res => {
        commit(actions.WRITE_COMMENT, res.data);
        alert('succeed!');
      }).catch(err => console.log(err));
  },

  [actions.FETCH_BOARD_ALL]({ commit }) {
    axios.get('/api/board')
      .then(res => {
        commit(actions.FETCH_BOARD_ALL, res.data);
      })
  },

  [actions.WRITE_BOARD]({ commit }, { title, data }) {
    axios.post(`/api/board`, { title: title, data: data })
      .then(res => {
        commit(actions.WRITE_BOARD, res.data);
      }).catch(err => console.log(err));
  },

  [actions.VIEW_CONTENT]({ commit }, { contentPid }) {
    axios.post(`/api/contents/${contentPid}/view`);
  }
}