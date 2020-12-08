<template>
  <div>
    <div v-for="bill in bills" :key="bill.id">
      {{ bill.name }}
    </div>
  </div>
</template>

<script>
import helpers from '../utils/helpers.js';

export default {
  data() {
    return {}
  },

  created() {
    this.getBills();
  },

  computed: {
    bills() {
      return this.$store.state.authentication.bills;
    }
  },

  methods: {
    getBills() {
      helpers.dispatchWithFallback(this.$store, 'bills/getBills');
    },
  }
}
</script>
