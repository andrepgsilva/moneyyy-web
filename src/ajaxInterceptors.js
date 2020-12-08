import axios from 'axios';
import ActionQueue from './utils/actionQueue';
import apiRoutes from './apiRoutes';
import vuexStore from './store/index';
import router from './router/index';

const interceptorsResponse = (response) => {
  return response;
};

const interceptorsError = (error) => {
  const originalRequest = error.config;
  const isUnauthorizedError = error.response.status === 401;
  const isNotRetryingTheRefreshTokenRequest = originalRequest.url != apiRoutes.auth.refreshToken;
  const isUserLoggedIn = vuexStore.state.authentication.user != null;

  if (isUnauthorizedError && isNotRetryingTheRefreshTokenRequest && isUserLoggedIn) {
    vuexStore.commit('toggleRefreshTokenLoading');

    axios.post(apiRoutes.auth.refreshToken)
      .then(() => {
        vuexStore.commit('toggleRefreshTokenLoading');

        const actionsQueue = vuexStore.state.actionsQueue;
        
        for (const actionName in actionsQueue) {
          vuexStore.dispatch(actionName, actionsQueue[actionName])
            .then(() => {
              ActionQueue.deleteAnAction(actionName);
            })
        }
      })
      .catch(() => {
        vuexStore.commit('toggleRefreshTokenLoading');
        ActionQueue.clearQueue();
        localStorage.removeItem('user');
        
        vuexStore.commit('authentication/logoutUser');
        router.push({ 'name': 'Login' });
      });
  }
  
  return Promise.reject(error);
}

export {
  interceptorsResponse,
  interceptorsError,
}