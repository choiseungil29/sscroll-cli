import * as mutations from './types';

export default {
  [mutations.FETCH](state, item) {
    state.contents.push(item)
  },

  [mutations.FETCH_ALL](state, items) {
    state.contents.push(...items)
  },

  [mutations.WRITE_COMMENT](state, comment) {
    console.log(comment);
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
  }
}