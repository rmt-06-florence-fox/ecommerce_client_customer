<template>
  <div class="home">
    <Navbar></Navbar>
    <!-- HomePage -->
     <section class="section-home-page mt-1">
      <div class="">
        <div class="row">
          <div class="col-10 col-sm-12">
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="https://i.pinimg.com/564x/58/c6/75/58c67547f0370c108f6b7c8a464920e5.jpg" class="img-carousel img-fluid d-block" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="https://i.pinimg.com/564x/b4/7a/01/b47a01979a741a40efa51f1409608130.jpg" class="img-carousel img-fluid d-block" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="https://i.pinimg.com/564x/e4/08/b1/e408b1b3dd4cba7f31e07ea3e6fd035b.jpg" class="img-carousel img-fluid d-block" alt="...">
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </a>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <ProductCard class="mt-5 col-md-3 col-sm-6 g-4"
              v-for="product in products"
              :key="product.id"
              :product="product">
            </ProductCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    ProductCard
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchData')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.container-img{
  padding-left: 80px;
}
.img-carousel{
  width: 100%;
  height: 500px;
  object-fit: fill;
}

</style>
