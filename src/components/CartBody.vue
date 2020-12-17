<template>
<!-- component -->
<div class="h-screen w-full flex overflow-hidden">
  <nav
    class="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6"
  >
    <!-- SideNavBar -->

    <div class="flex flex-row border-b items-center justify-between pb-2">
      <!-- Hearder -->
      <span class="text-lg font-semibold capitalize dark:text-gray-300">
        my cart
      </span>
    </div>
    <ul class="mt-2 text-gray-600">
      <li class="mt-8">
        <router-link to="/" class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
          <span
            class="ml-2 capitalize font-medium text-black dark:text-gray-300"
          >
            HOME
          </span>
        </router-link>
      </li>
      <li class="mt-8">
        <router-link to="/history" class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
          <span
            class="ml-2 capitalize font-medium text-black dark:text-gray-300"
          >
            HISTORY
          </span>
        </router-link>
      </li>
      </ul>
    <button @click="checkout"
      class="mt-8 flex items-center justify-between py-3 px-2 text-white dark:text-gray-200 bg-green-400 dark:bg-green-500 rounded-lg shadow"
    >
      <!-- Action -->
      <span>CHECKOUT</span>
    </button>

    <button @click="logout" class="mt-auto flex items-center text-red-700 dark:text-red-400">
      <!-- important action -->
      <a class="flex items-center">
        <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
          2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
          0 012-2h9z"
          ></path>
        </svg>
        <span class="ml-2 capitalize font-medium">log out</span>
      </a>
    </button>
  </nav>
  <main
    class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition duration-500 ease-in-out overflow-y-auto"
  >
    <div class="mx-10 my-2">
      <h2 class="my-4 text-4xl font-semibold dark:text-gray-400">
        My Cart
      </h2>
      <div class="mt-6 flex justify-between text-gray-600 dark:text-gray-400">
        <!-- List sorting -->

        <div class="ml-10 pl-2 flex capitalize">
          <!-- Left side -->
          <span class="ml-20 flex items-center">
            name
          </span>
          <span class="ml-44 flex items-center">
            category
          </span>
        </div>

        <div class="mr-12 flex capitalize">
          <!-- Right side -->

          <span class="mr-40 pr-1 flex items-center">
            price
          </span>

          <span class="mr-16 pr-2 flex items-center">
            quantity
            <svg class="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
              19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
              ></path>
            </svg>
          </span>

          <span class="mr-12 flex items-center">
            total
            <svg class="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
              19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <CartCard v-for="item in carts" :key="item.id" :item="item"/>
    </div>
</main>
</div>
</template>

<script>
import CartCard from './CartCard'
export default {
  name: 'CartBody',
  components: {
    CartCard
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    checkout () {
      this.$store.dispatch('postCheckout')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  }
}
</script>

<style>
</style>
