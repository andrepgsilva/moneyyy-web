<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> |
      <a v-on:click.prevent="logout">Logout</a> |
      <router-link :to="{ name: 'Register' }">Register</router-link> |
      <router-link :to="{ name: 'Bills' }">Bills</router-link>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('authentication/logout');
    },
  }
}
</script>

<style>
body {
  min-height: 100vh;

  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
