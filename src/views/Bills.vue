<template>
  <div>  
    <button @click="getBills">Get bills</button> 
    <button @click="getBill(1)">Get bill</button>
  </div>
</template>

<script>
import helpers from '../utils/helpers.js';
import axios from 'axios';

export default {
  data() {
    return {
      bill: null,
    }
  },

  computed: {},

  methods: {
    getBills() {
      helpers.dispatchWithFallback('bills/getBills');
    },

    getBill(billId) {
      helpers.dispatchWithFallback('bills/getBill', billId);
    }
  }
}
</script>