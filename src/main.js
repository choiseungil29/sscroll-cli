import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Content from './components/Content'
import Contents from './components/Contents'
import Boards from './components/Boards'
import Board from './components/Board'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://sscroll.site'

Vue.use(infiniteScroll)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Contents },
  { path: '/board', component: Boards },
  { path: '/board/:bid', name: 'board', component: Board },
  { path: '/:pid', name: 'content', component: Content, props: true }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
