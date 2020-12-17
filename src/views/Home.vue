<template>
  <div>
    <br><br><br>
    <h1 class="title">Product List</h1>
    <div class="filter-category">
      <p class="direct-register">Filter based:</p>
      <select class="form-control form-control-sm" v-model="filteredBy">
        <option :value="null" selected>All</option>
        <option
          v-for="(category, i) in categories"
          :key="i"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <br>
    <div class="container">
      <div class="row">
        <ProductCard v-for="(product, i) in filteredProduct" :key="i" :product="product"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    },
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    categories () {
      return this.$store.state.categories
    },
    filteredBy: {
      get () {
        return this.$store.state.filteredBy
      },
      set (value) {
        this.$store.commit('filterCategory', Number(value))
      }
    },
    filteredProduct () {
      return this.$store.getters.filteredProduct
    }
  },
  created () {
    this.fetchProduct()
    this.fetchCategory()
  }
}
</script>
