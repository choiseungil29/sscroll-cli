import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'
import App from './App'
import Contents from './components/Contents'
import Boards from './components/Boards'
import Board from './components/Board'
import Login from './components/Login'
import Recent from './components/Recent'
import Signup from './components/Signup'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
} else {
  axios.defaults.baseURL = 'http://0.0.0.0:8000'
}
axios.defaults.withCredentials = true
console.log(process.env.NODE_ENV)

Vue.use(infiniteScroll)
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'main', component: Contents }, /*, beforeEnter: (to, from, next) => { contentStore.dispatch('reset'); next(); }  */
  { path: '/board', component: Boards },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/recent', component: Recent },
  { path: '/board/:bid', name: 'board', component: Board },
  { path: '/:pid', name: 'content', component: Contents }
  // { path: '/:pid', name: 'content', component: Content, props: true }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

Vue.use(VueAnalytics, {
  id: 'UA-120460450-1',
  router
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
