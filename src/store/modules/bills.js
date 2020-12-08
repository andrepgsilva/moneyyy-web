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
    getBills(context) {
      return new Promise((resolve, reject) => {
        axios.get(apiRoutes.bills.index)
          .then(response => {
            context.commit('setBills', response.data.data);
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