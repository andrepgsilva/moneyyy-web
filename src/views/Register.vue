<template>
  <main class="flex justify-center items-center">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold text-left mb-2"
          for="name"
        >
          Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
          v-model="form.name"
          autofocus
        />

        <div 
          class="text-sm text-red-500 text-left mt-1" 
          v-if="! $v.form.name.required && $v.form.name.$anyDirty"
        >
          Name is required
        </div>
      </div>
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
          v-model.lazy="form.email"
          @blur="$v.form.email.$touch()"
        />

        <div 
          class="text-sm text-red-500 text-left mt-1" 
          v-if="! $v.form.email.required && $v.form.email.$anyDirty"
        >
          Email is required
        </div>
        <div 
          class="text-sm text-red-500 text-left mt-1" 
          v-if="! $v.form.email.email && $v.form.email.$anyDirty"
        >
          Your email is invalid
        </div>
        <div 
          class="text-sm text-red-500 text-left mt-1" 
          v-if="! $v.form.email.isUnique && !$v.form.email.$pending"
        >
          This email is already in use
        </div>
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
          v-model="form.password"
        />
        <div 
          class="text-sm text-left text-red-500 mt-1" 
          v-show="! $v.form.password.required && $v.form.password.$anyDirty"
        >
          Password is required
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          @click="register"
          :disabled="registerButtonDisabled"
          :class="[
            registerButtonDisabled ? 'bg-blue-300' : 'bg-blue-500',
            registerButtonDisabled ? 'hover:bg-blue-300' : 'hover:bg-blue-700',
          ]"
        >
          Register
        </button>
        <!-- <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a> -->
      </div>
      <div class="mt-3">
        <p
          class="text-sm text-red-500 text-left mt-1"
          v-for="(error, index) in registerFormErrorsFormatted"
          :key="index"
          v-text="error"
        />
      </div>
    </form>
  </main>
</template>


<script>
import { required, email } from 'vuelidate/lib/validators'
import helpers from '../utils/helpers.js';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
    }
  },

  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
        async isUnique (value) {
          if (value === '') return true;

          const isEmailFilled = ! this.$v.form.email.required && this.$v.form.email.$anyDirty;
          
          const isEmailValid = ! this.$v.form.email.email && this.$v.form.email.$anyDirty;
          
          if (! isEmailFilled && ! isEmailValid) {
            return ! await this.$store.dispatch('verifyEmailExistence', value);
          }
        }
      },
      password: {
        required,
      }
    }
  },

  computed: {
    registerFormErrors() {
      return this.$store.state.authentication.registerFormErrors;
    },

    registerButtonDisabled() {
      return this.$v.$invalid;
    },
    
    registerFormErrorsFormatted() {
      return Object.values(this.$store.state.authentication.registerFormErrors).map((errors) =>
        errors.join(", ")
      );
    },
  },

  methods: {
    register() {
      const credentials = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password,
      }

      // Verify form errors
      this.$v.$touch();

      helpers.dispatchWithFallback('authentication/register', credentials)
    },
  }
}
</script>

<style lang="scss">
main {
  height: calc(100vh - 78px);
}
</style>