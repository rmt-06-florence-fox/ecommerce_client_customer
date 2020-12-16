<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <SideBar
          class="col-2"
        />
        <div class="col-10">
          <Banner
            v-if="filteredBanners"
          />
            <div class="row">
              <br>
              <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                class="ml-3"
              />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '../components/SideBar'
import ProductCard from '../components/ProductCard'
import Banner from '../components/Banners'

export default {
  name: 'Home',
  components: {
    SideBar,
    ProductCard,
    Banner
  },
  created () {
    this.$store.dispatch('fetchProducts')
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGIN', true)
    }
  },
  computed: {
    filteredProducts () {
      return this.$store.getters.filteredProduct
    },
    filteredBanners () {
      return this.$store.getters.filteredBanners
    }
  }
}
</script>
