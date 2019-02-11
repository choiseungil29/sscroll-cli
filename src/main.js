import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import App from './App'
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
Vue.use(VueHead)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `./components/${view}.vue`)
}

const routes = [
  { path: '/', name: 'main', component: loadView('Contents') }, /*, beforeEnter: (to, from, next) => { contentStore.dispatch('reset'); next(); }  */
  { path: '/board', component: loadView('Boards') },
  { path: '/login', name: 'login', component: loadView('Login') },
  { path: '/signup', name: 'signup', component: loadView('Signup') },
  { path: '/recent', component: loadView('Recent') },
  { path: '/one', name: 'one', component: loadView('Content') },
  { path: '/board/:bid', name: 'board', component: loadView('Board') },
  { path: '/:pid', name: 'content', component: loadView('Contents') },
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
