<template>
<div
  class="mt-2 flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer"
>
  <!-- Card -->

  <div class="flex justify-between w-1/2">
    <!-- Left side -->

    <img
      class="h-12 w-12 rounded-full object-cover"
      :src="item.Product.image_url"
      alt=""
    />

    <div
      class="ml-4 flex flex-col capitalize text-gray-600 dark:text-gray-400 w-1/3"
    >
      <span class="overflow-ellipsis overflow-hidden mt-2 text-black dark:text-gray-200"> {{ item.Product.name }} </span>
    </div>

    <div
      class="ml-12 flex flex-row capitalize text-gray-600 dark:text-gray-400 w-1/3"
    >
      <span class="mt-2 text-black dark:text-gray-200"> {{ item.Product.category }} </span>
    </div>
  </div>

  <div class="flex">
    <!-- Rigt side -->

    <div
      class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400"
    >
      <span class="mt-2 text-black dark:text-gray-200"> {{ item.price }} </span>
    </div>

    <div
      class="mr-8 flex flex-row capitalize text-gray-600 dark:text-gray-400"
    >
      <div class="flex flex-wrap">
        <div class="flex w-8/12">
          <input type="text" :value="item.quantity" disabled
          class="bg-white text-sm text-gray-900 text-center focus:outline-none border border-gray-800 focus:border-gray-600 rounded-l-md w-full">
          </div>
        <div class="flex flex-col w-4/12">
          <button @click="increment(1)"
          class="text-white text-center text-md font-semibold rounded-tr-md px-1 bg-gray-800 focus:bg-gray-600 focus:outline-none border border-gray-800 focus:border-gray-600">
          +
          </button>
          <button @click="increment(-1)"
          class="text-white text-center text-md font-semibold rounded-br-md px-1 bg-gray-800 focus:bg-gray-600 focus:outline-none border border-gray-800 focus:border-gray-600 h-full">
          -
          </button>
        </div>
      </div>
    </div>

    <div
      class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400"
    >
      <span class="mt-2 text-green-400 dark:text-green-200">
        {{ item.total }}
      </span>
      <button @click="remove(item.id)" class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-red-100 bg-red-700 border border-red-700 ">
        <div class="text-xs font-normal leading-none max-w-full flex-initial">remove</div>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['item'],
  methods: {
    increment (value) {
      this.$store.dispatch('patchCartId', {
        id: this.item.id,
        value
      })
    },
    remove (id) {
      this.$store.dispatch('deleteCartId', { id })
    }
  }
}
</script>

<style>
</style>
