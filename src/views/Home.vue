<template>
  <div class="home">
    <!-- <p>{{ cart }} ini cart</p> -->
    <div class="container mb-5" style="margin-top:90px">
      <BannerCarousel></BannerCarousel>
    </div>
    <!-- <p>{{ products }}</p> -->
    <div class="container">
      <div class="row">
    <ProductCard class="mt-2" v-for="product in products" :key="product.id" :product="product" :cart="cart"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import BannerCarousel from '../components/BannerCarousel'

export default {
  name: 'Home',
  components: {
    ProductCard,
    BannerCarousel
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
        .then(data => {
          console.log('berhasil fetchCart')
          this.$store.commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    products () {
      return this.$store.state.products.data
    },
    cart () {
      return this.$store.state.cart.data
    }
  },
  created () {
    this.fetchProducts()
    this.fetchCart()
    if (localStorage.access_token) {
      this.$store.commit('setIsLogin', true)
    } else {
      this.$store.commit('setIsLogin', false)
    }
  }
}
</script>
