import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Content from './components/Content'
import Contents from './components/Contents'
import Boards from './components/Boards'
import Board from './components/Board'
import Login from './components/Login'
import Signup from './components/Signup'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
} else {
  axios.defaults.baseURL = 'http://sscroll.site'
}
console.log(process.env.NODE_ENV)

Vue.use(infiniteScroll)
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'main', component: Contents },
  { path: '/board', component: Boards },
  { path: '/board/:bid', name: 'board', component: Board },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
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
