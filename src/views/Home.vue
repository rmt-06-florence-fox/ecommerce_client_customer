<template>
  <section>
    <div class="card bg-dark text-white">
      <img src="https://cdn.squaremile.com/gallery/5c9e412ae88e0.jpeg" class="img-fluid">
      <div class="card-img-overlay">
        <h1 style="margin-top: 5%; margin-left: 50%">Br<i class="fas fa-shoe-prints"></i>.Shoes</h1>
        <h1 style="margin-left: 59.2%;">FOOTCAT FORUM INIT</h1>
        <h5 style="margin-left: 54.5%;">AN INITIATION WITH EMPTBRAIN</h5>
        <h5 class="card-title" style="margin-top: 10%">-- Karya Anak Desa --</h5><hr style="width: 50%; margin-left: 25%">
        <p class="card-text">An invaluable pride, <span style="color: #E2B91B;">Br<i class="fas fa-shoe-prints"></i>.Shoes</span> are made with full struggle hunting or hunting slogans, therefore this work is successfully realized by risking lives</p>
        <p class="card-text">because every touch of the leather of the shoes that wraps the feet is obtained from the fight against wild animals</p>
        <p class="card-text">such as kingkong, king cobra, crocodile, wild buffalo, rhino and other wild animals that exist on planet Namex</p>
      </div>
    </div>
    <CardProduct
      :products = 'products'
    ></CardProduct>
    <Footer />
    <!-- @ -->
  </section>
</template>

<script>
// @ is an alias to /src
import CardProduct from '../components/CardProduct'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
    CardProduct,
    Footer
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
