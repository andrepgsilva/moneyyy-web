import axios from 'axios';
import apiRoutes from '../../apiRoutes';

export default {
  namespaced: true,

  state: () => ({ 
    loginFormErrors: [],
    registerFormErrors: [],
    user: null || localStorage.getItem('user'),
  }),

  getters: {
    isAuthenticated(state) {
      return state.user != null;
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    addErrorsToLoginForm(state, errors) {
      state.loginFormErrors = errors;
    },

    clearLoginFormErrors(state) {
      state.loginFormErrors = [];
    },

    addErrorsToRegisterForm(state, errors) {
      state.registerFormErrors = errors;
    },

    clearRegisternFormErrors(state) {
      state.registerFormErrors = [];
    },

    logoutUser(state) {
      state.user = null;
    },
  },

  actions: {
    async login(context, credentials) {
      try {
        const response = await axios.post(apiRoutes.auth.login, credentials);
        const user = response.data;

        context.commit('setUser', user);
        localStorage.setItem('user', JSON.stringify(user));

        context.commit('clearLoginFormErrors');
        App.$router.push({ 'name': 'About' });
      } catch(error) {
        let errors = error.response.data.errors || [[error.response.data.error]];
        
        context.commit('addErrorsToLoginForm', errors);
      }
    },

    async logout(context) {
      axios.post(apiRoutes.auth.logout);

      context.commit('logoutUser');
      localStorage.removeItem('user');
      
      App.$router.push({ 'name': 'Login' });
    },

    async register(context, credentials) {
      try {
        await axios.post(apiRoutes.auth.register, credentials);

        App.$router.push({ 'name': 'Login' });
      } catch(error) {
        context.commit('addErrorsToRegisterForm', error.response.data.errors);
      }
    },
  },
}