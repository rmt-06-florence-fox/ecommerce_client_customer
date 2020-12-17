<template>
  <section>
    <div class="card bg-dark text-white">
      <img src="https://cdn.squaremile.com/gallery/5c9e412ae88e0.jpeg" class="img-fluid">
      <div class="card-img-overlay">
        <h5 class="card-title" style="margin-top: 18%">Karya Anak Desa</h5>
        <p class="card-text">An invaluable pride, <span style="color: #E2B91B;">Br<i class="fas fa-shoe-prints"></i>.Shoes</span> are made with full struggle hunting or hunting slogans, therefore this work is successfully realized by risking lives</p>
        <p class="card-text">because every touch of the leather of the shoes that wraps the feet is obtained from the fight against wild animals</p>
        <p class="card-text">such as kingkong, king cobra, crocodile, wild buffalo, rhino and other wild animals that exist on planet Namex</p>
      </div>
    </div>
    <CardProduct
      :products = 'products'
    ></CardProduct>
    <!-- @ -->
  </section>
</template>

<script>
// @ is an alias to /src
import CardProduct from '../components/CardProduct'

export default {
  name: 'Home',
  components: {
    CardProduct
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>

</style>
