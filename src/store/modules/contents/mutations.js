import * as mutations from './types';

export default {
  [mutations.FETCH](state, item) {
    state.contents.push(item)
  },

  [mutations.FETCH_ALL](state, items) {
    for (let item of items) {
      if (!state.contents.find(c => c.id === item.id)) {
        state.contents.push(item);
      }
    }
  },

  [mutations.FETCH_COMMENTS](state, { contentPid, items }) {
    let content = state.contents.find(c => c.permanent_id === contentPid)
    content.comments = [];
    content.comments.push(...items);
  },

  [mutations.FETCH_BOARD_ALL](state, items) {
    for (let item of items) {
      let content = state.contents.find(c => c.id === item.id);
      if (!content) {
        state.contents.push(item);
      } else {
        content = item;
      }
    }
  },

  [mutations.WRITE_COMMENT](state, comment) {
    let content = state.contents.find(c => c.permanent_id === comment.content_pid);
    
    if (comment.parent_id) {
      let parentComment = content.comments.find(c => c.id === comment.parent_id);
      parentComment.children.push(comment);
    } else {
      content.comments.push(comment);
    }
  },

  [mutations.WRITE_BOARD](state, board) {
    state.contents.push(board);
  },

  [mutations.LIKE_CONTENT](state, { contentPid, replaceContent }) {
    let content = state.contents.find(c => c.permanent_id === contentPid);
    content.ups = replaceContent.ups;
  },

  [mutations.UNLIKE_CONTENT](state, { contentPid, replaceContent }) {
    let content = state.contents.find(c => c.permanent_id === contentPid);
    content.downs = replaceContent.downs;
  }
}