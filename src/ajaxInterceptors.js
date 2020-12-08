import axios from 'axios';
import ActionQueue from './utils/actionQueue';
import apiRoutes from './apiRoutes';

const interceptorsResponse = (response) => {
  return response;
};

const interceptorsError = (error) => {
  const originalRequest = error.config;
  const isUnauthorizedError = error.response.status === 401;
  const isNotRetryingTheRefreshTokenRequest = originalRequest.url != apiRoutes.auth.refreshToken;
  const isUserLoggedIn = App.$store.state.authentication.user != null;

  if (isUnauthorizedError && isNotRetryingTheRefreshTokenRequest && isUserLoggedIn) {
    App.$store.commit('toggleRefreshTokenLoading');

    axios.post(apiRoutes.auth.refreshToken)
      .then(() => {
        App.$store.commit('toggleRefreshTokenLoading');

        const actionsQueue = App.$store.state.actionsQueue;
        
        for (const actionName in actionsQueue) {
          App.$store.dispatch(actionName, actionsQueue[actionName])
            .then(() => {
              ActionQueue.deleteAnAction(actionName);
            })
        }
      })
      .catch(() => {
        App.$store.commit('toggleRefreshTokenLoading');
        ActionQueue.clearQueue();
        localStorage.removeItem('user');
        
        App.$store.commit('authentication/logoutUser');
        App.$router.push({ 'name': 'Login' });
      });
  }
  
  return Promise.reject(error);
}

export {
  interceptorsResponse,
  interceptorsError,
}