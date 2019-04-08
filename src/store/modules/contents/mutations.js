import * as mutations from './types';

export default {
  [mutations.FETCH](state, item) {
    state.contents.push(item)
  },

  [mutations.FETCH_ALL](state, items) {
    state.contents.push(...items)
  }
}