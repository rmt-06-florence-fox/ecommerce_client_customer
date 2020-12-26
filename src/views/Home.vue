<template>
<div class="bg-white">
  <main class="mb-36">
    <ErrorCard v-if="addCartErr" />
    <div class="container flex flex-col py-6 items-center">
      <!-- <div class="grid grid-cols-12"> -->
        <div class="w-10/12 flex content-center">
          <Banner />
        </div>
      <!-- </div> -->
      <div class="w-10/12 flex mt-8">
        <div class="flex flex-col w-3/12 bg-white mr-6 content-start">
          <span class="flex flex-col bg-black text-center text-white py-1 font-bold tracking-wide select-none">Categories</span>
          <ul class="flex flex-col">
            <li>
              <button @click="catSelected = null" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 focus:border-transparent focus:outline-none">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
                <span class="text-sm font-medium">All</span>
              </button>
            </li>
            <li v-for="cat in categories" :key="cat.id" :cat="cat" @click="setCat(cat)">
              <button  class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 focus:border-transparent focus:outline-none">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
                <span class="text-sm font-medium">{{cat.name}}</span>
              </button>
            </li>
          </ul>
        </div>
        <div class="flex w-9/12 gap-3 ml-6  flex-wrap">
          <productCard v-for="product in filterProduct" :key="product.id" :product="product"/>
        </div>
      </div>
    </div>
    <!-- <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
          <productCard v-for="product in products" :key="product.id" />
      </div>
    </div> -->
  </main>
  <!-- <Footer /> -->
  <router-view />
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import productCard from '../components/ProductCard'
import { mapState } from 'vuex'
import Banner from '../components/Banner'
import ErrorCard from '../components/ErrorCard'

export default {
  components: {
    productCard,
    Banner,
    ErrorCard
  },
  data () {
    return {
      catSelected: ''
    }
  },
  methods: {
    setCat (cat) {
      this.catSelected = cat.id
    }
  },
  computed: {
    ...mapState({
      products: 'products',
      categories: 'categories',
      addCartErr: 'addCartErr'
    }),
    filterProduct () {
      return this.$store.getters.filterProduct(this.catSelected)
    }
  }
}
</script>
