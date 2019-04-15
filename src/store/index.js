import Vue from 'vue';
import Vuex from 'vuex';
import contents from './modules/contents';
import users from './modules/users';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    contents,
    users
  },
  strict: debug
});
