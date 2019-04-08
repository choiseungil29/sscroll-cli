import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko';
import store from './store';

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:8000'
}
axios.defaults.withCredentials = true
console.log(process.env.NODE_ENV)

Vue.use(infiniteScroll)
Vue.use(VueRouter)
Vue.use(VueHead)
Vue.use(Vuetify)
Vue.use(Element, { locale });

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `./components/${view}.vue`)
}

const routes = [
  { path: '/', name: 'main', component: loadView('Contents') },
  { path: '/recent', component: loadView('Recent') },
  { path: '/one', name: 'one', component: loadView('Content') },
  { path: '/:pid', name: 'content', component: loadView('Contents') },
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
  render: h => h(App),
  store
}).$mount('#app')
