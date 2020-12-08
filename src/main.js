import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import { interceptorsResponse, interceptorsError } from './ajaxInterceptors';
import router from './router'
import middlewares from './middlewares';

import './assets/tailwind.css';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://moneyyy.test/api";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(interceptorsResponse, interceptorsError);

window.App = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');