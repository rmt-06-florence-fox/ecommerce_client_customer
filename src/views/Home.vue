<template>
  <div class="home-page">
    <Banner></Banner>
    <div class="container">
      <div class="home-left">
        <div class="category-list">
          <category @lemparCategoryName="lemparCategoryName"></category>
        </div>
      </div>
      <div class="home-right">
        <div class="container-product">
          <product v-for="product in getProduct" :key="product.id" :product="product"></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import product from '../components/product.vue'
import category from '../components/category.vue'
import Banner from '../components/banner.vue'

export default {
  name: 'Home',
  components: {
    product,
    category,
    Banner
  },
  data () {
    return {
      filterCategory: '',
      toggle: false
    }
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    },
    lemparCategoryName (name) {
      this.filterCategory = name
    },
    changeToggle () {
      this.toggle = !this.toggle
    }
  },
  created () {
    this.fetchProduct()
    this.$store.dispatch('fetchBanner')
  },
  computed: {
    getProduct () {
      return this.$store.getters.filteredProduct(this.filterCategory)
    },
    getBanner () {
      return this.$store.state.banners
    },
    getLoginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  margin-top: 0;
}
.home-left {
  background: #24001e;
  width: 20%;
}
.container-product {
  display: flex;
  justify-content:space-evenly;
  margin-left: 1rem;
  flex-wrap: wrap;
}
.banner {
  height: 25vw
}
.banner img {
  height: 25vw;
}

</style>
