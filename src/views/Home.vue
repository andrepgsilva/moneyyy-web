<template>
  <div>
    <button @click="login">Login</button> | 
    <button @click="logout">Logout</button> |
    <div v-if="user">
      <h1>{{ user.name }}</h1>
    </div>
  </div>
</template>

<script>
import helpers from '../utils/helpers.js';

export default {
  computed: {
    user() {
      return this.$store.state.authentication.user;
    }
  },

  methods: {
    login() {
      const credentials = {
        email: 'andre@example.com',
        password: '123456',
      };

      helpers.dispatchWithFallback('authentication/login', credentials);
    },

    logout() {
      this.$store.dispatch('authentication/logout');
    },
  }
}
</script>