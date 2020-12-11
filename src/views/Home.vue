<template>
  <main>
    <div class="mt-12">
      <transition-group 
        class="flex flex-col items-center" 
        name="list-complete" 
        tag="div"
      >
        <div 
          class="list-complete-item w-3/4 sm:w-3/4 md:w-2/4 lg:w-2/4" 
          v-for="bill in bills"
          :key="bill.id"
        >
          <BillCard :bill="bill" />
        </div>
      </transition-group>
    </div>
    <div class="mt-3" v-if="bills && billsLastPage > 1">
      <Paginate
        :page-count="billsLastPage"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :prev-class="'prev-item'"
        :next-class="'next-item'"
      >
      </Paginate>
    </div>
  </main>
</template>

<script>
import helpers from '../utils/helpers.js';
import Paginate from 'vuejs-paginate';
import BillCard from '../components/BillCard';

export default {
  components: { Paginate, BillCard },

  data() {
    return {
      pagination : {
        currentPage: 1,
      }
    }
  },

  created() {
    this.getBills();
  },

  computed: {
    bills() {
      return this.$store.state.bills.bills.data;
    },

    billsLastPage() {
      return this.$store.state.bills.bills.last_page;
    }
  },

  methods: {
    getBills() {
      helpers.dispatchWithFallback(this.$store, 'bills/getBills');
    },

    pageChangeHandler(selectedPage) {
      this.pagination.currentPage = selectedPage;

      helpers.dispatchWithFallback(this.$store, 'bills/getBills', selectedPage);
    },
  }
}
</script>

<style lang="scss">
main {
  height: calc(100vh - 78px);
}

.pagination {
  @apply flex justify-center;
}

.page-item a, .prev-item a, .next-item a{
  @apply text-gray-800;
  outline: none;
}

.page-item, .prev-item, .next-item {
  @apply py-2 px-2 rounded bg-green-200 mr-1;
}

.page-item:hover, .prev-item:hover, .next-item:hover {
  opacity: 0.5;
}

.page-item.active {
  @apply bg-green-300;
}

.list-complete-item {
  transition: all 0.6s;
  margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>