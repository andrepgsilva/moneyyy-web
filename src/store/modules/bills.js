import axios from 'axios';
import apiRoutes from '../../apiRoutes';

export default {
  namespaced: true,

  state: () => ({
    bills: [],
  }),

  getters: {},

  mutations: {
    setBills(state, bills) {
      state.bills = bills;
    }
  },

  actions: {
    getBills(context, page) {
      let urlForRequest = apiRoutes.bills.index;

      if (page > 0) {
        urlForRequest += `?page=${page}`;
      }

      return new Promise((resolve, reject) => {
        axios.get(urlForRequest)
          .then(response => {
            context.commit('setBills', response.data);
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      })
    },

    getBill(context, billId) {
      return new Promise((resolve, reject) => {
        axios.get(apiRoutes.bills.show + billId)
          .then(response => {
            console.log(response.data);
            resolve(true);
          })
          .catch(error => {
            reject(error);
          })  
      });
    }
  }
}