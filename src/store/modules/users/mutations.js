import * as mutations from './types';

export default {
  [mutations.FETCH](state, user) {
    state.user = user;
  }
}