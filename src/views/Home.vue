<template>
<div class="bg-white">
  <main class="mb-36">
    <div class="w-full h-full py-6">
      <div class="grid grid-cols-12">
        <div class="col-span-3 bg-white ml-24 mr-6 content-start">
           <ul class="flex flex-col py-4">
            <li v-for="cat in categories" :key="cat.id" :cat="cat">
              <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
                <span class="text-sm font-medium">{{cat.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-span-9 grid grid-cols-4 gap-3 pr-24 pl-6 content-start">
          <productCard v-for="product in products" :key="product.id" :product="product"/>
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

export default {
  components: {
    productCard
  },
  computed: {
    ...mapState({
      products: 'products',
      categories: 'categories'
    })
  }
}
</script>
