import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import { interceptorsResponse, interceptorsError } from './ajaxInterceptors';
import router from './router'
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

router.beforeEach((to, from, next) => {
  if (to.name == 'Register' && store.getters['authentication/isAuthenticated']) next({ name: 'Home' });

  if (to.name !== 'Login' && to.name !== 'Register' && ! store.getters['authentication/isAuthenticated']) next({ name: 'Login' });

  if (to.name == 'Login' && store.getters['authentication/isAuthenticated']) next({ name: 'Home' });

  else next()
});