<template>
<div>
  <br><h1 class="welcome">Our Products</h1>
  <div class="px-2 d-flex flex-wrap justify-content-start bg-ligth">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ProductList class="mt-5 mx-auto" v-for="product in products" :key="product.id" :product="product"></ProductList>
  </div>
  <img width="500" height="440" src="../assets/nike-swoosh-transparent-background-17.png">
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ProductList from '../components/ProductList'
export default {
  name: 'Home',
  components: {
    ProductList
  },
  created () {
    this.$store.dispatch('fetchProduct')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
.welcome {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>
