import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import authentication from './modules/authentication';
import bills from  './modules/bills';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoadingRefreshToken: false,
    refreshTokenFail: false,
    actionsQueue: {},
  },

  getters: {},

  mutations: {
    setQueue(state, newQueue) {
      state.actionsQueue = newQueue;
    },
    toggleRefreshTokenLoading(state) {
      state.isLoadingRefreshToken = ! state.isLoadingRefreshToken;
    },
  },

  actions: {
    verifyEmailExistence(context, email) {
      return new Promise((resolve, reject) => {
        axios.post('/email-exists', { email })
          .then(response => {
            resolve(Boolean(response.data)); 
          })
      });
    },

    async me(context) {
      const user = await axios.post('/auth/me');
      
      console.log(user.data);
    },
  },
  
  modules: {
    authentication,
    bills,
  }
})
