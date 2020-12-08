<template>
  <main class="flex justify-center items-center">
    <form 
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      v-on:keyup.enter="login"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold text-left mb-2"
          for="email"
        >
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          v-model="$v.form.email.$model"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold text-left mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="$v.form.password.$model"
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          @click="login"
          :disabled="loginButtonDisabled"
          :class="[
            loginButtonDisabled ? 'bg-blue-300' : 'bg-blue-500',
            loginButtonDisabled ? 'hover:bg-blue-300' : 'hover:bg-blue-700',
          ]"
        >
          Sign In
        </button>
        <!-- <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a> -->
      </div>
      <div class="mt-2">
        <p
          class="text-sm text-red-500 text-left mt-1"
          v-for="(error, index) in loginFormErrorsFormatted"
          :key="index"
          v-text="error"
        />
      </div>
    </form>
  </main>
</template>


<script>
import { required, email } from "vuelidate/lib/validators";
import helpers from '../utils/helpers.js';

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  validations: {
    form: {
      email: {
        required,
      },
      password: {
        required,
      },
    },
  },

  computed: {
    user() {
      return this.$store.state.authentication.user;
    },
    loginButtonDisabled() {
      return this.$v.$invalid;
    },
    loginFormErrorsFormatted() {
      return Object.values(this.$store.state.authentication.loginFormErrors).map((errors) =>
        errors.join(", ")
      );
    },
  },

  methods: {
    login() {
      const credentials = {
        email: this.form.email,
        password: this.form.password,
      };

      // Verify form errors
      this.$v.$touch();

      this.$store.dispatch('authentication/login', credentials)
    },
  },
};
</script>

<style lang="scss">
main {
  height: calc(100vh - 78px);
}
</style>