import ActionQueue from './actionQueue.js';

const helpers = {
  dispatchWithFallback(actionName, dataForAction) {
    if (App.$store.state.isLoadingRefreshToken) return;
    
    App.$store.dispatch(actionName, dataForAction)
    .catch(error => {
      if ( ! error.hasOwnProperty('response')) return;

      if (error.response.status == 401) {
        ActionQueue.pushAnAction(actionName, dataForAction);
      }
    });
  }
}


export default helpers;