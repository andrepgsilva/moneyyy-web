<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUser">User</button>
  </div>
</template>

<script>
import helpers from '../utils/helpers.js';

export default {
  methods: {
    getUser() {
      helpers.dispatchWithFallback(this.$store, 'me');      
    }
  }
}
</script>
