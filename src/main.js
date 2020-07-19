import Vue from 'vue'
import App from './App'
import router from './router'
import "normalize.css";
import 'bootstrap'
import $ from 'jquery'
import axios from 'axios'

Vue.prototype.$axios=axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
