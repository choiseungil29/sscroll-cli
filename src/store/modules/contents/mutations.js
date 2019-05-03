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

  [mutations.RESET](state, items) {
    state.contents = [];
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

  [mutations.LIKE_CONTENT](state, { contentPid, replaceContent, user }) {
    let content = state.contents.find(c => c.permanent_id === contentPid);
    if (user) {
      content.ups.push(user);
    } else if (replaceContent) {
      content.ups = replaceContent.ups;
      content.downs = replaceContent.downs;
    }
    
  },

  [mutations.UNLIKE_CONTENT](state, { contentPid, replaceContent, user }) {
    let content = state.contents.find(c => c.permanent_id === contentPid);
    if (user) {
      content.downs.push(user);
    } else if (replaceContent) {
      content.ups = replaceContent.ups;
      content.downs = replaceContent.downs;
    }
    
  }
}