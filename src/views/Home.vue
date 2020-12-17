<template>
<div>
  <b-container fluid class="px-5">
    <Carousel/>
  </b-container>
  <b-container fluid class="mt-3 p-5">
    <b-row>
    <ProductItem
    v-for="product in products"
    :key="product.id"
    :product="product"/>
    </b-row>
  </b-container>
</div>
</template>

<script>

import Carousel from '@/components/Carousel.vue'
import ProductItem from '@/components/ProductItem.vue'
export default {
  name: 'Home',
  components: {
    Carousel,
    ProductItem
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>
