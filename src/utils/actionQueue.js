const ActionQueue = {
  maxQueue: 3,

  getQueueData() {
    return App.$store.state.actionsQueue;
  },

  setQueue(newQueue) {
    App.$store.commit('setQueue', newQueue); 
  },

  queueIsNotFull() {
    return Object.keys(this.getQueueData()).length < this.maxQueue;
  },

  pushAnAction(actionName, dataForAction) {
    const queue = this.getQueueData();
    
    if (this.queueIsNotFull()) {
      queue[actionName] = dataForAction;
    }
    
    this.setQueue(queue);
  },

  deleteLastAction() {
    const queue = this.getQueueData();
    
    const queueKeys = Object.keys(this.getQueueData());
    const queueLength = queueKeys.length;

    if (queueLength > 0) {
      const lastKeyName = queueKeys[queueLength - 1];

      delete queue[lastKeyName];

      this.setQueue(queue);
    }
  },

  deleteAnAction(actionName) {
    const queue = this.getQueueData();
    
    const queueKeys = Object.keys(this.getQueueData());
    const queueLength = queueKeys.length;

    if (queueLength > 0) {
      if (queue.hasOwnProperty(actionName)) {
        delete queue[actionName];

        this.setQueue(queue);
      }
    }
  },

  clearQueue() {
    this.setQueue({});
  }
};

export default ActionQueue;