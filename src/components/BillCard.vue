<template>
  <div class="relative flex justify-between border-2 mb-5 h-32 border-green-200">
    <div class="flex flex-col md:ml-10 lg:ml-10 justify-around w-1/4 mt-1">
      <p class="text-gray-900 text-left">{{ bill.categories[0].name }}</p>
      <p class="text-gray-800 text-left">{{ bill.name }}</p>
    </div>

    <div class="flex flex-col justify-around md:mr-10 lg:mr-10">
      <p class="text-right">{{ bill.created_at }}</p>
      <p class="text-right">{{ convertMoneyToHuman(bill.value) }}</p>
    </div>

    <div class="card-option absolute">
      <button class="text-2xl" @click="toggleOptionDialog">...</button>

      <div v-if="isDialogOptionOpened" class="absolute flex flex-col w-48 bg-white shadow-2xl p-2 rounded-md cursor-pointer" style="left: -60px;">
        <ul>
          <li class="text-left mb-1 hover:bg-gray-100 py-3 px-4">Edit</li>
          <li 
            class="text-left text-red-600 hover:bg-gray-100 py-3 px-4"
            @click="deleteBill"
          >
            Delete
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import currency from 'currency.js';
import helpers from '../utils/helpers.js';

export default {
  data() { 
    return {
      isDialogOptionOpened: false,
    }
  },

  props: { 
    bill: Object,
  },

  methods: {
    toggleOptionDialog() {
      this.isDialogOptionOpened = ! this.isDialogOptionOpened;
    },

    convertMoneyToHuman(value) {
      const moneyConfiguration = value => currency(value, { symbol: "€", separator: ".", decimal: ",", fromCents: true, precision: 2});

      return moneyConfiguration(value).format();
    },

    deleteBill() {
      this.toggleOptionDialog();
      helpers.dispatchWithFallback(this.$store, 'bills/deleteBill', this.bill.id);
    }
  }
};
</script>

<style lang="scss">

.card-option {
  top: -10px;
  right: 6px;

  & > button {
    outline: none !important;
  }
}

</style>