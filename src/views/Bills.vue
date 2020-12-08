<template>
  <div>  
    
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
      helpers.dispatchWithFallback(this.$store, 'bills/getBills');
    },

    getBill(billId) {
      helpers.dispatchWithFallback(this.$store, 'bills/getBill', billId);
    }
  }
}
</script>