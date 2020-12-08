import ActionQueue from './actionQueue.js';

const helpers = {
  dispatchWithFallback(vuexContext, actionName, dataForAction) {
    if (vuexContext.state.isLoadingRefreshToken) return;
    
    vuexContext.dispatch(actionName, dataForAction)
    .catch(error => {
      if ( ! error.hasOwnProperty('response')) return;

      if (error.response.status == 401) {
        ActionQueue.pushAnAction(actionName, dataForAction);
      }
    });
  }
}


export default helpers;